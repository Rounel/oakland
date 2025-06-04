import * as z from "zod"

export const serviceSchema = z.object({
    name: z.string().min(2, { message: "Le nom du service doit contenir au moins 2 caractères" }),
    description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
    price: z.string().min(1, { message: "Le prix est requis" }),
    duration: z.string().min(1, { message: "La durée est requise" }),
})
  
export  type ServiceFormValues = z.infer<typeof serviceSchema>
  