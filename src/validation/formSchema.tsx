import { z } from "zod";

export const formSchema = z
  .object({
    firstSpeaker: z.number().nonnegative("1° Discursante é obrigatório"),
    secondSpeaker: z.number().nonnegative("2° Discursante é obrigatório"),
    thirdSpeaker: z.number().nonnegative("3° Discursante é obrigatório"),
    sacramentMeetingDate: z.string().refine(
      (value) => {
        return !isNaN(Date.parse(value));
      },
      { message: "Data inválida." }
    ),
  })
  .superRefine((data, ctx) => {
    if (
      data.firstSpeaker !== data.secondSpeaker &&
      data.firstSpeaker !== data.thirdSpeaker &&
      data.secondSpeaker !== data.thirdSpeaker
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["firstSpeaker", "secondSpeaker", "thirdSpeaker"],
      });
    }
  });
