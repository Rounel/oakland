import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Schedule {
  provider: number
  id: number
  day: string
  opening_time: string
  closing_time: string
  is_closed: boolean
}

const DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche"
]

interface ScheduleFormProps {
  onSchedulesChange: (schedules: Schedule[]) => void
  initialSchedules?: Schedule[]
}

export default function ScheduleForm({ onSchedulesChange, initialSchedules = [] }: ScheduleFormProps) {
  const [schedules, setSchedules] = useState<Schedule[]>(
    initialSchedules.length > 0
      ? initialSchedules
      : DAYS.map((day, index) => ({
          provider: 0,
          id: index,
          day,
          opening_time: "09:00",
          closing_time: "18:00",
          is_closed: false
        }))
  )

  const handleScheduleChange = (index: number, field: keyof Schedule, value: string | boolean) => {
    const newSchedules = [...schedules]
    newSchedules[index] = {
      ...newSchedules[index],
      [field]: value
    }
    setSchedules(newSchedules)
    onSchedulesChange(newSchedules)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horaires d'ouverture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <div key={schedule.day} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="w-24">
                <Label>{schedule.day}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={schedule.is_closed}
                  onCheckedChange={(checked) => handleScheduleChange(index, "is_closed", checked)}
                />
                <Label className={schedule.is_closed ? "text-red-700" : ""}>{schedule.is_closed ? "Fermé" : "Ouvert"}</Label>
              </div>
              {!schedule.is_closed && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label>Ouverture</Label>
                    <Input
                      type="time"
                      value={schedule.opening_time}
                      onChange={(e) => handleScheduleChange(index, "opening_time", e.target.value)}
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label>Fermeture</Label>
                    <Input
                      type="time"
                      value={schedule.closing_time}
                      onChange={(e) => handleScheduleChange(index, "closing_time", e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 