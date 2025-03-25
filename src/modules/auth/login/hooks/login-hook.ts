import api from "@/api"

export interface Login{
    email:string
    password:string
}

/* const mutatationLogin = useMutation({
    mutationFn: (data:Login) => {
      return api.post('/auth/login', data)
    },
  }) */