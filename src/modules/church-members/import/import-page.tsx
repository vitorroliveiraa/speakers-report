import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import passo1 from "@/assets/passo-a-passo/passo1.png";
import passo2 from "@/assets/passo-a-passo/passo2.png";
import passo3 from "@/assets/passo-a-passo/passo3.png";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { getAccessToken } from "@/utils/handle_cookies";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

const ImportChurchMemberPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: any): Promise<any> => {
      return api.post("/users/church-members/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      if (data.status === 200) alert("Salvo com sucesso!");
    },
  });

  const onUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file, file.name);

    mutation.mutate(formData);
  };

  const handleRedirectSpeakers = () => {
    navigate("/speakers");
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="container max-w-3xl py-0">
          <Button
            className="max-sm:h-12 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 mb-6 rounded"
            onClick={handleRedirectSpeakers}
          >
            Voltar
          </Button>
          <Card>
            <CardHeader className="space-y-1 items-center">
              <CardTitle className="text-2xl font-bold ">
                Importação de membros
              </CardTitle>
            </CardHeader>
            <div className="p-5 flex flex-col gap-4">
              <p>
                Siga o passo a passo para realizar a importação dos membros da
                sua ala.
              </p>
              <p>
                1º faça login no site da igreja:{" "}
                <a
                  className="text-blue-900 underline"
                  target="_blank"
                  href="https://id.churchofjesuschrist.org/oauth2/default/v1/authorize?response_type=code&client_id=0oa5b6krts7UNNkID357&redirect_uri=https%3A%2F%2Fwww.churchofjesuschrist.org%2Fservices%2Fplatform%2Fv4%2Flogin&scope=openid+profile&state=https%3A%2F%2Fwww.churchofjesuschrist.org%2Fmy-home%3Flang%3Dpor"
                >
                  clique aqui para fazer o login
                </a>
              </p>

              <img width="300px" src={passo1} />
              <p>
                2º acesse o{" "}
                <a
                  className="text-blue-900 underline"
                  target="_blank"
                  href="https://lcr.churchofjesuschrist.org/records/member-list?lang=por"
                >
                  diretório de membros
                </a>
              </p>
              <p>
                3º <b>desmarque</b> todas as opções e deixe somente o nome
              </p>

              <img width="300px" src={passo2} />
              <p>4ª clique em imprimir todas as pessoas</p>
              <img width="300px" src={passo3} />
              <p>5º salve o arquivo como PDF</p>
              <p>6º importe o arquivo aqui</p>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="uploadFile">PDF</Label>
                <Input
                  ref={fileInputRef}
                  id="uploadFile"
                  onChange={onUpload}
                  type="file"
                />
              </div>
            </div>
            <div></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImportChurchMemberPage;
