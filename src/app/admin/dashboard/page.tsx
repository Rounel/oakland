"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  CheckCircle,
  XCircle,
  Filter,
  MessageSquare,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

// Types
interface RegistrationRequest {
  id: string
  name: string
  company: string
  category: string
  location: string
  date: string
  status: "pending" | "approved" | "rejected"
  image: string
}

interface ContactRequest {
  id: string
  clientName: string
  clientEmail: string
  providerName: string
  providerSlug: string
  message: string
  date: string
  status: "pending" | "approved" | "rejected"
  image?: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [registrations, setRegistrations] = useState<RegistrationRequest[]>([])
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      // Fetch registration requests
      // Note: In a real app, this would be fetched from Supabase
      // For demo purposes, we're using mock data
      setRegistrations([
        {
          id: "1",
          name: "Jean Dupont",
          company: "Dupont Électricité",
          category: "Électricien",
          location: "Paris",
          date: "2023-05-15",
          status: "pending",
          image: "/diverse-group.png",
        },
        {
          id: "2",
          name: "Marie Martin",
          company: "Martin Plomberie",
          category: "Plombier",
          location: "Lyon",
          date: "2023-05-14",
          status: "pending",
          image: "/diverse-group.png",
        },
        {
          id: "3",
          name: "Pierre Durand",
          company: "Durand Peinture",
          category: "Peintre",
          location: "Marseille",
          date: "2023-05-13",
          status: "pending",
          image: "/diverse-group.png",
        },
        {
          id: "4",
          name: "Sophie Lefebvre",
          company: "Lefebvre Jardinage",
          category: "Jardinier",
          location: "Toulouse",
          date: "2023-05-12",
          status: "pending",
          image: "/diverse-group.png",
        },
        {
          id: "5",
          name: "Thomas Bernard",
          company: "Bernard Menuiserie",
          category: "Menuisier",
          location: "Bordeaux",
          date: "2023-05-11",
          status: "pending",
          image: "/diverse-group.png",
        },
      ])

      // Fetch contact requests
      setContactRequests([
        {
          id: "1",
          clientName: "Lucie Moreau",
          clientEmail: "lucie.moreau@example.com",
          providerName: "Jean Dupont",
          providerSlug: "jean-dupont",
          message: "Bonjour, j'aurais besoin d'une intervention pour refaire l'installation électrique de ma cuisine.",
          date: "2023-05-18",
          status: "pending",
          image: "/diverse-group.png",
        },
        {
          id: "2",
          clientName: "Marc Petit",
          clientEmail: "marc.petit@example.com",
          providerName: "Marie Martin",
          providerSlug: "marie-martin",
          message: "J'ai une fuite sous mon évier, pouvez-vous intervenir rapidement ?",
          date: "2023-05-17",
          status: "pending",
          image: "/diverse-group.png",
        },
        {
          id: "3",
          clientName: "Julie Dubois",
          clientEmail: "julie.dubois@example.com",
          providerName: "Pierre Durand",
          providerSlug: "pierre-durand",
          message: "Je souhaite faire repeindre mon salon, pouvez-vous me faire un devis ?",
          date: "2023-05-16",
          status: "pending",
          image: "/diverse-group.png",
        },
      ])

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/admin")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const handleApproveRegistration = (id: string) => {
    setRegistrations(registrations.map((reg) => (reg.id === id ? { ...reg, status: "approved" } : reg)))
  }

  const handleRejectRegistration = (id: string) => {
    setRegistrations(registrations.map((reg) => (reg.id === id ? { ...reg, status: "rejected" } : reg)))
  }

  const handleApproveContact = (id: string) => {
    setContactRequests(contactRequests.map((req) => (req.id === id ? { ...req, status: "approved" } : req)))
  }

  const handleRejectContact = (id: string) => {
    setContactRequests(contactRequests.map((req) => (req.id === id ? { ...req, status: "rejected" } : req)))
  }

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.location.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && reg.status === statusFilter
  })

  const filteredContactRequests = contactRequests.filter((req) => {
    const matchesSearch =
      req.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.message.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && req.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
          >
            En attente
          </Badge>
        )
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Approuvé
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          >
            Refusé
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl text-gray-900 dark:text-white">Admin</div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r dark:border-gray-700">
          <div className="flex items-center mb-6 px-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              ServiceHub
            </div>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg bg-gray-100 dark:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Prestataires</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <UserPlus className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Demandes d'inscription</span>
                <Badge className="ml-auto bg-yellow-500 text-white">5</Badge>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Prises de contact</span>
                <Badge className="ml-auto bg-yellow-500 text-white">3</Badge>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BarChart className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Statistiques</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Paramètres</span>
              </a>
            </li>
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez les demandes d'inscription, les prises de contact et suivez l'activité de la plateforme
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/admin-interface.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Prestataires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>+12% ce mois</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Demandes en attente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-yellow-500 flex items-center mt-1">
                  <span>Nécessite votre attention</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Prises de contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-yellow-500 flex items-center mt-1">
                  <span>En attente de validation</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Visites aujourd'hui
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">842</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>+18% vs hier</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Demandes d'inscription en attente</h2>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-8 w-[200px]"
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
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="approved">Approuvés</SelectItem>
                    <SelectItem value="rejected">Refusés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Demandes d'inscription en attente</CardTitle>
                <CardDescription>
                  Examinez et validez les nouvelles demandes d'inscription de prestataires.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Prestataire
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Catégorie
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Localisation
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Statut
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredRegistrations.map((registration) => (
                        <tr key={registration.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src={registration.image || "/placeholder.svg"}
                                  alt={registration.name}
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {registration.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{registration.company}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{registration.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{registration.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(registration.date).toLocaleDateString("fr-FR")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(registration.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              {registration.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
                                    onClick={() => handleApproveRegistration(registration.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approuver
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                                    onClick={() => handleRejectRegistration(registration.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Refuser
                                  </Button>
                                </>
                              )}
                              {registration.status !== "pending" && (
                                <Button size="sm" variant="outline">
                                  Voir détails
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredRegistrations.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            Aucune demande trouvée
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
