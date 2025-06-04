"use client"

import { useState } from "react"
import { Search, Filter, Mail, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for requests
const requests = [
  {
    id: "1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "06 12 34 56 78",
    subject: "Demande de devis",
    message: "Bonjour, je souhaite obtenir un devis pour des travaux de rénovation...",
    date: "2024-03-15T10:30:00",
    status: "new",
  },
  {
    id: "2",
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    phone: "07 23 45 67 89",
    subject: "Question sur les services",
    message: "Je voudrais savoir si vous proposez des services de maintenance...",
    date: "2024-03-14T15:45:00",
    status: "in_progress",
  },
  {
    id: "3",
    name: "Marie Leroy",
    email: "marie.leroy@example.com",
    phone: "06 34 56 78 90",
    subject: "Rendez-vous",
    message: "Je souhaite prendre rendez-vous pour une consultation...",
    date: "2024-03-13T09:15:00",
    status: "completed",
  },
]

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && request.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
          >
            Nouvelle
          </Badge>
        )
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
          >
            En cours
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Terminée
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes de contact</CardTitle>
        <CardDescription>Gérez les demandes de contact et autres requêtes des utilisateurs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher une demande..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>Filtrer</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="new">Nouvelles</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminées</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{request.subject}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    De {request.name} • {new Date(request.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                {getStatusBadge(request.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="h-4 w-4 mr-2" />
                  {request.email}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-2" />
                  {request.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(request.date).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{request.message}</p>

              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline">
                  Répondre
                </Button>
                {request.status === "new" && (
                  <Button size="sm" variant="outline" className="text-green-600 hover:text-green-800">
                    Marquer comme en cours
                  </Button>
                )}
                {request.status === "in_progress" && (
                  <Button size="sm" variant="outline" className="text-blue-600 hover:text-blue-800">
                    Marquer comme terminée
                  </Button>
                )}
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Aucune demande trouvée
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 