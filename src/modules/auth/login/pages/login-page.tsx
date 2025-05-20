import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "../schema/login-schema";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import api from "@/api";
import { setLegacyCookies } from "@/utils/handle_cookies";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof loginSchema>) => {
      return api.post("/auth/login", values);
    },
    onSuccess: (data, variables, context) => {
      if (data.status === 200) {
        setLegacyCookies({ accessToken: data.data.token, refreshToken: "" });
        navigate("/speakers");
      }
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Informe seu email e senha para acessar
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                      required
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Button
                  variant="link"
                  onClick={() => navigate("/forgot-password")}
                >
                  Esqueci minha senha
                </Button>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Input id="password" type="password" {...field} required />
                  </FormItem>
                )}
              />
            </div>
            {mutation.isError && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-red-700">
                    {"response" in (mutation.error ?? {}) &&
                    (mutation.error as any).response?.data?.message
                      ? (mutation.error as any).response.data.message
                      : "Ocorreu um erro ao fazer login."}
                  </label>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Entrar
            </Button>
            <div className="text-center text-sm">
              Não possui uma conta?{" "}
              <Button onClick={() => navigate("/register")}>Cadastre-se</Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
