import * as z from "zod"

export const socialSchema = z.object({
    facebook: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
    instagram: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
})
  
export  type SocialFormValues = z.infer<typeof socialSchema>
  