import { z } from "zod";

export const formSchema = z
  .object({
    firstSpeaker: z.number({
      required_error: "1° Discursante é obrigatório",
      invalid_type_error: "1° Discursante é obrigatório",
    }),
    secondSpeaker: z.number({
      required_error: "2° Discursante é obrigatório",
      invalid_type_error: "1° Discursante é obrigatório",
    }),
    thirdSpeaker: z.number({
      required_error: "3° Discursante é obrigatório",
      invalid_type_error: "1° Discursante é obrigatório",
    }),
    sacramentMeetingDate: z.date({
      required_error: "A Data é obrigatória",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.firstSpeaker === data.secondSpeaker) {
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
    if (data.firstSpeaker === data.thirdSpeaker) {
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
    if (data.secondSpeaker === data.thirdSpeaker) {
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
