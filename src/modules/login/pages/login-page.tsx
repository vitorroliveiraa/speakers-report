import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema } from "../schema/login-schema"
import { Form, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormField, FormItem } from "@/components/ui/form"
import api from "@/api"
import { setLegacyCookies } from "@/utils/handle_cookies"
import { useNavigate } from "react-router"

export default function LoginForm() {
  const navigate= useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    api.post('/auth/login', values).
    then((response)=>{
      if(response.status===200){
        setLegacyCookies({accessToken: response.data.token, refreshToken:""})
        navigate('/speakers')
      }

    }).catch((error)=>{console.log(error)})
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Informe seu email e senha para acessar</CardDescription>
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
                <Button variant="link">Esqueci minha senha</Button>
              </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Input
                id="password"
                type="password"
                {...field}
                required
              />
              </FormItem>
               )}
               />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit"  className="w-full">
              Entrar
            </Button>
            <div className="text-center text-sm">
              Não possui uma conta?{" "}
              
              <Button variant="link">Cadastre-se</Button>
            </div>
          </CardFooter>
          </form>
      </Card>
    </div>
  )
}

