import api from "@/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from '@tanstack/react-query'

const ForgotPasswordPage = ()=>{
    const navigate = useNavigate()

    const [churchMember,setChurchMember] = useState<string>();
    
    const mutation = useMutation({
        mutationFn: () => {
          return api.post('/auth/forgot-password',{"memberNumber":churchMember})
        },
      })
      
    return (
<div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Recupere sua senha</CardTitle>
          <CardDescription>Informe seu nº de membro para recuperar a senha</CardDescription>
        </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
            <Label htmlFor="church-member">Nº de membro:</Label>
                              <Input
                                id="church-member"
                                value={churchMember}
                                onChange={(e) => setChurchMember(e.target.value)}
                                required
                              />
                              </div>
                              <div>
                              {mutation.isPending ? (
        'Enviando solicitação...'
      ) :
                             mutation.isSuccess ? 
                             <Alert>
  <AlertTitle>E-mail enviado com sucesso!</AlertTitle>
  <AlertDescription>
    Enviamos um email para a troca de senha.
    <br/>
  <u> Verifique o lixo eletrônico e a caixa de entrada.</u>
  </AlertDescription>
</Alert> :
mutation.isError && 
<Alert variant="destructive">
  <AlertTitle>Falha ao solicitar requisição!</AlertTitle>
  <AlertDescription>
    {mutation.error.message}
  </AlertDescription>
</Alert>

}
                              </div>
        </CardContent>
          <CardFooter className="flex flex-col space-y-4">
              <Button variant="secondary" onClick={()=> mutation.mutate()}
              disabled={!churchMember} className="w-full">Confirmar</Button>
            <Button variant="outline" onClick={()=>navigate('/login')} className="w-full">
              Cancelar
            </Button>
          </CardFooter>
      </Card>
    </div>
    )
}
export default ForgotPasswordPage