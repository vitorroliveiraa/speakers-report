import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../../../../components/ui/form.tsx";
import { Button } from "../../../../components/ui/button.tsx";
import AutoCompleteInput from "../../../../components/input/autoCompleteInput.tsx";
import { useEffect, useState } from "react";
import DatePicker from "../../../../components/input/datePicker.tsx";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../../components/ui/alert.tsx";
import { CircleAlert } from "lucide-react";
import { formSchema } from "../../../../validation/formSchema.tsx";
import api from "@/api.ts";
import { getCurrentUserLocal } from "@/utils/handle_cookies.ts";

type Item = {
  id: string;
  name: string;
  type: string;
};

interface Props {
  onMemberAdded: () => void;
}

const ProfileForm = ({ onMemberAdded }: Props) => {
  const [members, setMembers] = useState<Item[]>([]);
  // const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [viewAlert, setViewAlert] = useState(false);
  const [textViewAlert, setTextViewAlert] = useState("");

  // const handleSpeakerSelect = (speaker?: Item, clearField?: string) => {
  //   if (speaker)
  //     setSelectedSpeakers((prevSelected) => [...prevSelected, speaker?.name]);
  //   if (clearField)
  //     setSelectedSpeakers((prev) => prev.filter((x) => x !== clearField));
  // };

  const addMember = (member: Item) => {
    setMembers((prev) => [...prev, member]);
  };

  useEffect(() => {
    api.get(`/speakers/church-members`).then((res) => {
      setMembers(res.data);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstSpeaker: undefined,
      secondSpeaker: undefined,
      thirdSpeaker: undefined,
      sacramentMeetingDate: undefined,
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (viewAlert) {
      timer = setTimeout(() => {
        setViewAlert(false);
        setTextViewAlert("");
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [viewAlert]);

  const handleFormReset = () => {
    form.reset({
      firstSpeaker: undefined,
      secondSpeaker: undefined,
      thirdSpeaker: undefined,
      sacramentMeetingDate: undefined,
    });
    // setSelectedSpeakers([]);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dados = getCurrentUserLocal();

    const data = {
      sacrament_meeting_date: values.sacramentMeetingDate.toISOString(),
      ward_id: dados?.ward_id,
      speakers: [
        {
          id: values.firstSpeaker.id,
          type: values.firstSpeaker.type,
          speaker_position: 1,
        },
        {
          id: values.secondSpeaker.id,
          type: values.secondSpeaker.type,
          speaker_position: 2,
        },
        {
          id: values.thirdSpeaker.id,
          type: values.thirdSpeaker.type,
          speaker_position: 3,
        },
      ],
    };

    api
      .post(`/speakers/insert`, data)
      .then(() => {
        onMemberAdded();
        handleFormReset();
      })
      .catch(function (err) {
        setViewAlert(true);
        setTextViewAlert(err.response.data.message);
      });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={handleFormReset}
          className="space-y-8"
        >
          <div>
            <FormField
              control={form.control}
              name="sacramentMeetingDate"
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Data da reunião"
                  field={field}
                  error={fieldState.error}
                />
              )}
            />

            <FormField
              control={form.control}
              name="firstSpeaker"
              render={({ field, fieldState }) => (
                <AutoCompleteInput
                  label="1° Discursante"
                  field={field}
                  error={fieldState.error?.message}
                  data={members}
                  onAddMember={addMember}
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
                  error={fieldState.error?.message}
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
                  error={fieldState.error?.message}
                  data={members}
                />
              )}
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              className="max-sm:h-12 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>

      {
        <div
          className={`fixed bottom-4 transition-all duration-300 ease-in-out z-50 ${
            viewAlert ? "right-4 opacity-100" : "-right-full opacity-0"
          }`}
          role="alert"
          aria-live="assertive"
        >
          <Alert className="max-w-max bg-red-50 border-red-400">
            <CircleAlert className="h-4 w-4" color="#f87171" />
            <AlertTitle className="text-red-500">Atenção</AlertTitle>
            <AlertDescription className="text-red-500">
              {textViewAlert}
            </AlertDescription>
          </Alert>
        </div>
      }
    </>
  );
};

export default ProfileForm;
