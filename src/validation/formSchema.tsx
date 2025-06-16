import { z } from "zod";

export const formSchema = z
  .object({
    firstSpeaker: z.object(
      {
        id: z
          .string({
            required_error: "1° Discursante é obrigatório",
            invalid_type_error: "1° Discursante é obrigatório",
          })
          .min(1, { message: "1° Discursante é obrigatório" }),
        type: z.string({
          required_error: "2° Discursante é obrigatório",
          invalid_type_error: "2° Discursante é obrigatório",
        }),
      },
      { required_error: "1° Discursante é obrigatório" }
    ),
    secondSpeaker: z.object(
      {
        id: z
          .string({
            required_error: "2° Discursante é obrigatório",
            invalid_type_error: "2° Discursante é obrigatório",
          })
          .min(1, { message: "2° Discursante é obrigatório" }),
        type: z
          .string({
            required_error: "2° Discursante é obrigatório",
            invalid_type_error: "2° Discursante é obrigatório",
          })
          .min(1, { message: "2° Discursante é obrigatório" }),
      },
      { required_error: "2° Discursante é obrigatório" }
    ),
    thirdSpeaker: z.object(
      {
        id: z
          .string({
            required_error: "3° Discursante é obrigatório",
            invalid_type_error: "3° Discursante é obrigatório",
          })
          .min(1, { message: "3° Discursante é obrigatório" }),
        type: z
          .string({
            required_error: "3° Discursante é obrigatório",
            invalid_type_error: "3° Discursante é obrigatório",
          })
          .min(1, { message: "3° Discursante é obrigatório" }),
      },
      { required_error: "3° Discursante é obrigatório" }
    ),
    sacramentMeetingDate: z.date({
      required_error: "A data é obrigatória",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.firstSpeaker.id === data.secondSpeaker.id) {
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["firstSpeaker"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["secondSpeaker"],
      });
    }
    if (data.firstSpeaker.id === data.thirdSpeaker.id) {
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["firstSpeaker"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["thirdSpeaker"],
      });
    }
    if (data.secondSpeaker.id === data.thirdSpeaker.id) {
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["secondSpeaker"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Os discursantes devem ser diferentes.",
        path: ["thirdSpeaker"],
      });
    }
  });
