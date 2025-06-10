import * as z from "zod"

export const contactSchema = z.object({
    address: z.string().min(5, { message: "L'adresse doit contenir au moins 5 caractères" }),
    city: z.string().min(2, { message: "La ville doit contenir au moins 2 caractères" }),
    postal_code: z.string().min(5, { message: "Code postal invalide" }),
    phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
    email: z.string().email({ message: "Email invalide" }),
})

export type ContactFormValues = z.infer<typeof contactSchema>
  