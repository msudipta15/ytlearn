import z from "zod";

export const topicSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Topic title must be atleast 1 character !" })
    .max(100, { message: "Topic title must be within 100 characters !" }),

  description: z
    .string()
    .min(10, {
      message: "Description too short, must be atleast 10 characters !",
    })
    .max(200, {
      message: "Description too long, must be within 200 characters",
    }),
});
