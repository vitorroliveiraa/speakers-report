"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { useNavigate } from "react-router";
import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputButton } from "../components/inputButton.tsx";
import { useGetWard } from "../hooks/useRegister.ts";
import { useEffect } from "react";

// Schema de validação
const formSchema = z.object({
  wardData: z.object({
    id: z.number().optional(),
    unitNumber: z.string().min(1, "Número da ala é obrigatório"),
    name: z.string().min(1, "Nome da ala é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().min(1, "Estado é obrigatório"),
    country: z.string().min(1, "País é obrigatório"),
  }),
  userData: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .regex(/[A-Za-z]/, "Senha deve conter pelo menos uma letra")
      .regex(/\d/, "Senha deve conter pelo menos um número"),
    member_number: z.string().min(1, "Número de membro é obrigatório"),
    role: z.string().min(1, "Chamado é obrigatório"),
  }),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return api.post("/users", data);
    },
    onSuccess: (data) => {
      if (data.status === 200) navigate("/Login");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wardData: {
        unitNumber: "",
        name: "",
        city: "",
        country: "",
        state: "",
      },
      userData: {
        name: "",
        email: "",
        password: "",
        member_number: "",
        role: "",
      },
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };
  const {
    data: dataWard,
    isFetching,
    refetch: refetchWard,
  } = useGetWard(form.getValues("wardData.unitNumber"));

  useEffect(() => {
    console.log("DATA", dataWard);
    if (!dataWard) {
      form.setValue("wardData.name", "");
      form.setValue("wardData.city", "");
      form.setValue("wardData.state", "");
      form.setValue("wardData.country", "");
      form.setValue("wardData.id", undefined);
    } else form.setValue("wardData", dataWard);
  }, [dataWard]);
  const roles = [
    { id: "bishop", text: "Bispo" },
    { id: "first_counselor", text: "1° Conselheiro" },
    { id: "second_counselor", text: "2° Conselheiro" },
    { id: "ward_clerk", text: "Secretário da Ala" },
    { id: "assistant_ward_clerk", text: "Secretário Adjunto da Ala" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="container max-w-3xl py-10">
        <Card>
          <CardHeader className="space-y-1 items-center">
            <CardTitle className="text-2xl font-bold">Cadastre-se</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {/* Ward Data Section */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">
                      Informações da ala
                    </h3>
                    <Separator className="flex-1 ml-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="wardData.unitNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>N° da unidade</FormLabel>
                          <FormControl>
                            <InputButton
                              onClickButton={() => refetchWard()}
                              placeholder="N° da unidade"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wardData.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da ala</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nome da ala"
                              disabled={!isFetching || !dataWard}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wardData.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Cidade"
                              disabled={!isFetching || !dataWard}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wardData.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Estado"
                              {...field}
                              disabled={!isFetching || !dataWard}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wardData.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="País"
                              {...field}
                              disabled={!isFetching || !dataWard}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* User Data Section */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">Dados pessoais</h3>
                    <Separator className="flex-1 ml-3" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="userData.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="userData.role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chamado</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione seu chamado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.text}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="userData.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seu@email.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="userData.password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Sua senha"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="userData.member_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nº de membro</FormLabel>
                          <FormControl>
                            <Input placeholder="Número de membro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <span className="flex items-center">Processando...</span>
                  ) : (
                    <span className="flex items-center">
                      Salvar <Save className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
