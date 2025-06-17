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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormItem } from "@/components/ui/form";
import api from "@/api";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
    onSuccess: (data) => {
      if (data.status === 200) {
        // setLegacyCookies({ accessToken: data.data.token, refreshToken: "" });
        localStorage.setItem("accessToken", data.data.token);
        api.defaults.headers["Authorization"] = "Bearer " + data.data.token;

        navigate("/speakers");
      }
    },
  });

  let errorMessage: string | null = null;

  if (mutation.isError) {
    const error = mutation.error as AxiosError<{ message: string }>;
    errorMessage = error.response?.data.message ?? "Erro desconhecido";
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
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
                <a
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Esqueci minha senha
                </a>
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-0">
                    <Input id="password" type="password" {...field} required />
                  </FormItem>
                )}
              />
            </div>
            {mutation.isError && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-red-700">{errorMessage}</label>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              Entrar
            </Button>
            <div className="text-center text-sm">
              Não possui uma conta?{" "}
              <Button variant="link" onClick={() => navigate("/register")}>
                Cadastre-se
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
