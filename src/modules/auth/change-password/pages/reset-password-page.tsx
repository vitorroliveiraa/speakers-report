import api from "@/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState<string>();
  const query = new URLSearchParams(window.location.search);

  const mutation = useMutation({
    mutationFn: () => {
      return api.post("/auth/reset-password", {
        newPassword: newPass,
        token: query.get("token"),
      });
    },
    onSuccess: (data) => {
      if (data.status === 200) navigate("/Login");
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset de senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset">Nova senha:</Label>
            <Input
              id="reset"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          <div>{mutation.isPending && "Enviando solicitação..."}</div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            variant="secondary"
            onClick={() => mutation.mutate()}
            disabled={!newPass}
            className="w-full"
          >
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ResetPasswordPage;
