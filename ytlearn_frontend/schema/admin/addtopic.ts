import z from "zod";

export const topicSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Topic title must be atleast 1 character !" })
    .max(20, { message: "Topic title must be within 20 characters !" }),

  description: z.string().max(50, {
    message: "Description too long, must be within 50 characters",
  }),
});
