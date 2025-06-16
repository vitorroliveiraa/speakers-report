"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { IRegisterUser } from "../interfaces/register-interface.ts";
import { useNavigate } from "react-router";
import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useGetWard } from "../hooks/useRegister.ts";
import { InputButton } from "../components/InputButton.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorPass, setErrorPass] = useState<boolean>(false);
  const [errorNumberMember, setErrorNumberMember] = useState<boolean>(false);

  // Form data with default values from the provided JSON
  const [formData, setFormData] = useState<IRegisterUser | undefined>({
    userData: {
      name: "",
      email: "",
      password: "",
      member_number: "",
      role: "",
    },
    wardData: {
      city: "",
      country: "",
      name: "",
      state: "",
      unit_number: "",
      id: null,
    },
  });
  console.log(formData);

  const handleChange = (
    section: "wardData" | "userData",
    field: string,
    value: string
  ) => {
    //@ts-ignore
    setFormData({
      ...formData,
      [section]: {
        ...formData?.[section],
        [field]: value,
      },
    });
    let regex = /[A-Za-z]+\d/i;
    if (field == "password") {
      if (value.length < 6 || !regex.test(value)) {
        setErrorPass(true);
        return;
      } else setErrorPass(false);
    }
    if (field == "member_number" && value.length < 6) {
      setErrorNumberMember(true);
      return;
    } else setErrorNumberMember(false);
  };
  const mutation = useMutation({
    mutationFn: () => {
      return api.post("/users", formData);
    },
    onSuccess: (data, variables, context) => {
      if (data.status === 201) navigate("/Login");
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const {
    data: dataWard,
    refetch: refetchWard,
    isFetched,
  } = useGetWard(formData?.wardData?.unit_number || "");

  useEffect(() => {
    if (!dataWard) {
      //@ts-ignore
      setFormData({
        ...formData,
        ["wardData"]: {
          city: "",
          country: "",
          name: "",
          state: "",
          unit_number: formData?.wardData.unit_number || "",
          id: null,
        },
      });
    } else {
      //@ts-ignore
      setFormData({
        ...formData,
        ["wardData"]: dataWard,
      });
    }
  }, [isFetched]);

  const roles = [
    { id: "Bishop", text: "Bispo" },
    { id: "1st Counselor", text: "1° Conselheiro" },
    { id: "2nd Counselor", text: "2° Conselheiro" },
    { id: "Ward Clerk", text: "Secretário da Ala" },
    { id: "Assistant Ward Clerk", text: "Secretário Adjunto da Ala" },
    { id: "Ward Executive Secretary", text: "Secretário Executivo da Ala" },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="container max-w-3xl py-10">
        <Card>
          <CardHeader className="space-y-1 items-center">
            <CardTitle className="text-2xl font-bold ">Cadastre-se</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Ward Data Section */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">Informações da ala</h3>
                  <Separator className="flex-1 ml-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ward-name">N° da unidade</Label>
                    <InputButton
                      onClickButton={() => refetchWard()}
                      id="unit-number"
                      value={formData?.wardData.unit_number}
                      onChange={(e) =>
                        handleChange("wardData", "unit_number", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward-name">Nome da ala</Label>
                    <Input
                      id="ward-name"
                      value={formData?.wardData.name}
                      disabled={!!formData?.wardData.id}
                      onChange={(e) =>
                        handleChange("wardData", "name", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ward-city">Cidade</Label>
                    <Input
                      id="ward-city"
                      disabled={!!formData?.wardData.id}
                      value={formData?.wardData.city}
                      onChange={(e) =>
                        handleChange("wardData", "city", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ward-state">Estado</Label>
                    <Input
                      id="ward-state"
                      value={formData?.wardData.state}
                      disabled={!!formData?.wardData.id}
                      onChange={(e) =>
                        handleChange("wardData", "state", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ward-country">País</Label>
                    <Input
                      id="ward-country"
                      disabled={!!formData?.wardData.id}
                      value={formData?.wardData.country}
                      onChange={(e) =>
                        handleChange("wardData", "country", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* User Data Section */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">Dados pessoais</h3>
                  <Separator className="flex-1 ml-3" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Nome</Label>
                    <Input
                      id="user-name"
                      value={formData?.userData.name}
                      onChange={(e) =>
                        handleChange("userData", "name", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-role">Chamado</Label>
                    <Select
                      onValueChange={(e) => handleChange("userData", "role", e)}
                      defaultValue={formData?.userData.role}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu chamado" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem value={role.id}>{role.text}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={formData?.userData.email}
                      onChange={(e) =>
                        handleChange("userData", "email", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-password">Senha</Label>
                    <Input
                      id="user-password"
                      type="password"
                      value={formData?.userData.password}
                      onChange={(e) =>
                        handleChange("userData", "password", e.target.value)
                      }
                      required
                    />
                    <label
                      className={errorPass ? "text-sm text-red-700" : "text-sm"}
                    >
                      *A senha deve conter ao menos 6 caracteres, uma letra e um
                      número
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-member-number">Nº de membro</Label>
                    <Input
                      id="user-member-number"
                      value={formData?.userData.member_number}
                      onChange={(e) =>
                        handleChange(
                          "userData",
                          "member_number",
                          e.target.value
                        )
                      }
                      required
                    />
                    <label
                      className={
                        errorNumberMember ? "text-sm text-red-700" : "text-sm"
                      }
                    >
                      *O Nº deve conter ao menos 6 caracteres
                    </label>
                  </div>
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        </Card>
      </div>
    </div>
  );
}
