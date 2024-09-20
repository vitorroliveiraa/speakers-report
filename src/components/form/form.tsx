import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form.tsx";
import { Button } from "../ui/button.tsx";
import AutoCompleteInput from "../input/autoCompleteInput.tsx";
import DatePicker from "../datePicker.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

const formSchema = z.object({
  firstSpeaker: z.any(),
  secondSpeaker: z.any(),
  thirdSpeaker: z.any(),
  sacramentMeetingDate: z.date().transform((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }),
});

type Item = {
  id: number;
  name: string;
};

const ProfileForm = () => {
  const [members, setMembers] = useState<Item[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/church_members")
      .then((res) => setMembers(res.data));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstSpeaker: "",
      secondSpeaker: "",
      thirdSpeaker: "",
      sacramentMeetingDate: new Date().toISOString().split("T")[0],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // axios
    //   .post("http://localhost:3333/speakers/insert", values)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="sacramentMeetingDate"
            render={({ field }) => (
              <DatePicker label="Data da reunião" field={field} />
            )}
          />

          <FormField
            control={form.control}
            name="firstSpeaker"
            render={({ field, fieldState }) => (
              <AutoCompleteInput
                label="1° Discursante"
                field={field}
                error={fieldState.error}
                data={members}
              />
            )}
          />

          <FormField
            control={form.control}
            name="secondSpeaker"
            render={({ field, fieldState }) => (
              <AutoCompleteInput
                label="2° Discursante"
                field={field}
                error={fieldState.error}
                data={members}
              />
            )}
          />

          <FormField
            control={form.control}
            name="thirdSpeaker"
            render={({ field, fieldState }) => (
              <AutoCompleteInput
                label="3° Discursante"
                field={field}
                error={fieldState.error}
                data={members}
              />
            )}
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="submit"
            className="max-sm:h-12 bg-slate-500 hover:bg-slate-600"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
