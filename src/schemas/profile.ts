import * as z from "zod"

// Form schemas for different sections
export const profileSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    profession: z.string().min(2, { message: "La profession doit contenir au moins 2 caractères" }),
    description: z.string().min(50, { message: "La description doit contenir au moins 50 caractères" }),
  })
  
  
export  type ProfileFormValues = z.infer<typeof profileSchema>
  