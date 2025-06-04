import * as z from "zod"

export  const pricingSchema = z.object({
    standardPrice: z.string().min(1, { message: "Le prix standard est requis" }),
    premiumPrice: z.string().min(1, { message: "Le prix premium est requis" }),
    dayPrice: z.string().min(1, { message: "Le prix journée est requis" }),
  })
  
  
export  type PricingFormValues = z.infer<typeof pricingSchema>
  