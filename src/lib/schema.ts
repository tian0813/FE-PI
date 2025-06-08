import z from "zod";

export const createNoteSchema = z.object({
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location can't be more than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description can't be more than 500 characters"),
  photo: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "Photo is required",
    })
    .refine((file) => file instanceof FileList && file[0].size < 5_000_000, {
      message: "File size must be less than 5MB",
    }),
});

export type CreateFormType = z.infer<typeof createNoteSchema>;

export const editNoteSchema = z.object({
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Title can't be more than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Content can't be more than 500 characters"),
  status: z.enum(["pending", "complete"]),
  photo: z.any().optional(),
});

export type EditNoteFormType = z.infer<typeof editNoteSchema>;

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
