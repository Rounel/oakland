import * as z from "zod"

 export const scheduleSchema = z.object({
    schedules: z.array(z.object({
      provider: z.number(),
      id: z.number(),
      day: z.string(),
      opening_time: z.string(),
      closing_time: z.string(),
      is_closed: z.boolean()
    }))
  })
  
export  type ScheduleFormValues = z.infer<typeof scheduleSchema>
  