import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form.tsx";
import { Button } from "../ui/button.tsx";
import AutoCompleteInput from "../input/autoCompleteInput.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "../input/datePicker.tsx";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert.tsx";
import { CircleAlert } from "lucide-react";
import { formSchema } from "../../validation/formSchema.tsx";

const URL_API = import.meta.env.VITE_URL_API;

type Item = {
  id: number;
  name: string;
};

interface Props {
  onMemberAdded: () => void;
}

const ProfileForm = ({ onMemberAdded }: Props) => {
  const [members, setMembers] = useState<Item[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [viewAlert, setViewAlert] = useState(false);
  const [textViewAlert, setTextViewAlert] = useState("");

  const handleSpeakerSelect = (speaker?: Item, clearField?: string) => {
    if (speaker)
      setSelectedSpeakers((prevSelected) => [...prevSelected, speaker?.name]);
    if (clearField)
      setSelectedSpeakers(selectedSpeakers.filter((x) => x != clearField));
  };

  useEffect(() => {
    axios.get(`${URL_API}/church_members`).then((res) => {
      setMembers(res.data);
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      sacrament_meeting_date: values.sacramentMeetingDate,
      speakers: [
        {
          member_id: values.firstSpeaker,
          speaker_position: 1,
        },
        {
          member_id: values.secondSpeaker,
          speaker_position: 2,
        },
        {
          member_id: values.thirdSpeaker,
          speaker_position: 3,
        },
      ],
    };

    axios
      .post(`${URL_API}/speakers/insert`, data)
      .then(() => {
        onMemberAdded();
        form.reset({
          firstSpeaker: 0,
          secondSpeaker: 0,
          thirdSpeaker: 0,
          sacramentMeetingDate: "",
        });
      })
      .catch(function (err) {
        setViewAlert(true);
        setTextViewAlert(err.response.data.error);
      });
  }

  return (
    <>
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
                  data={members.filter(
                    (member) => !selectedSpeakers.includes(member.name)
                  )}
                  onSpeakerSelect={handleSpeakerSelect}
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
                  data={members.filter(
                    (member) => !selectedSpeakers.includes(member.name)
                  )}
                  onSpeakerSelect={handleSpeakerSelect}
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
                  data={members.filter(
                    (member) => !selectedSpeakers.includes(member.name)
                  )}
                  onSpeakerSelect={handleSpeakerSelect}
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
