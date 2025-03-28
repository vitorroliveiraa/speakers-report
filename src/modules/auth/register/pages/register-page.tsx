"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import { IRegisterUser } from "../interfaces/register-hook"
import { useNavigate } from "react-router"
import api from "@/api"

export default function RegisterPage() {
    const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Form data with default values from the provided JSON
  const [formData, setFormData] = useState<IRegisterUser | undefined>({
    userData:{
      name:'',
email:'',
password:'',
member_number:'',
role:'',
  },
  wardData:{
    city:'',
    country:'',
    name:'',
    state:'',
  }
  })
  console.log(formData)

  const handleChange = (section: "wardData" | "userData", field: string, value: string) => {
    //@ts-ignore
    setFormData({
      ...formData,
      [section]: {
        ...formData?.[section],
        [field]: value,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/users',formData)
      .then((response)=>{
        if(response.status===200)
          navigate("/login")
      })
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
                  <Label htmlFor="ward-name">Nome da ala</Label>
                  <Input
                    id="ward-name"
                    value={formData?.wardData.name}
                    onChange={(e) => handleChange("wardData", "name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ward-city">Cidade</Label>
                  <Input
                    id="ward-city"
                    value={formData?.wardData.city}
                    onChange={(e) => handleChange("wardData", "city", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ward-state">Estado</Label>
                  <Input
                    id="ward-state"
                    value={formData?.wardData.state}
                    onChange={(e) => handleChange("wardData", "state", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ward-country">País</Label>
                  <Input
                    id="ward-country"
                    value={formData?.wardData.country}
                    onChange={(e) => handleChange("wardData", "country", e.target.value)}
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
                    onChange={(e) => handleChange("userData", "name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-role">Chamado</Label>
                  <Input
                    id="user-role"
                    value={formData?.userData.role}
                    onChange={(e) => handleChange("userData", "role", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={formData?.userData.email}
                    onChange={(e) => handleChange("userData", "email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-password">Senha</Label>
                  <Input
                    id="user-password"
                    type="password"
                    value={formData?.userData.password}
                    onChange={(e) => handleChange("userData", "password", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-member-number">Nº de membro</Label>
                  <Input
                    id="user-member-number"
                    value={formData?.userData.member_number}
                    onChange={(e) => handleChange("userData", "member_number", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate('/login')}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? (
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
   
  )
}

