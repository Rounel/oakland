import * as z from "zod"

export const gallerySchema = z.object({
images: z.array(z.any()).min(1, { message: "Au moins une image est requise" }),
})
  

export  type GalleryFormValues = z.infer<typeof gallerySchema>
  