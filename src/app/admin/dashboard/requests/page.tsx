"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, X, Trash2, TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { contactService } from "@/services/api"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface VisitorContact {
  id: number
  provider: number
  provider_details: {
    id: number
    company_name: string
    user: {
      email: string
      phone: string
    }
  }
  name: string
  email: string
  phone: string
  message: string
  visitor_ip: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
}

interface ContactsResponse {
  count: number
  next: string | null
  previous: string | null
  results: VisitorContact[]
}

interface ContactStats {
  total_contacts: number
  pending_contacts: number
  accepted_contacts: number
  rejected_contacts: number
  monthly_growth: number
  acceptance_rate: number
}

export default function RequestsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<VisitorContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [stats, setStats] = useState<ContactStats | null>(null)
  const [loadingActions, setLoadingActions] = useState<{ [key: number]: string }>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contactToDelete, setContactToDelete] = useState<number | null>(null)

  useEffect(() => {
    loadContacts()
    loadStats()
  }, [])

  const loadContacts = async () => {
    try {
      const data: ContactsResponse = await contactService.getContacts()
      setContacts(data.results)
      setTotalCount(data.count)
    } catch (error) {
      toast.error("Erreur lors du chargement des demandes de contact")
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await contactService.getContactStats()
      setStats(data)
    } catch (error) {
      toast.error("Erreur lors du chargement des statistiques")
    }
  }

  const handleAccept = async (id: number) => {
    try {
      setLoadingActions(prev => ({ ...prev, [id]: 'accept' }))
      await contactService.acceptContact(id)
      toast.success("Demande de contact acceptée avec succès")
      loadContacts()
      loadStats()
    } catch (error) {
      toast.error("Erreur lors de l'acceptation de la demande")
    } finally {
      setLoadingActions(prev => {
        const newState = { ...prev }
        delete newState[id]
        return newState
      })
    }
  }

  const handleReject = async (id: number) => {
    try {
      setLoadingActions(prev => ({ ...prev, [id]: 'reject' }))
      await contactService.rejectContact(id)
      toast.success("Demande de contact rejetée avec succès")
      loadContacts()
      loadStats()
    } catch (error) {
      toast.error("Erreur lors du rejet de la demande")
    } finally {
      setLoadingActions(prev => {
        const newState = { ...prev }
        delete newState[id]
        return newState
      })
    }
  }

  const handleDelete = async (id: number) => {
    setContactToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!contactToDelete) return

    try {
      setLoadingActions(prev => ({ ...prev, [contactToDelete]: 'delete' }))
      await contactService.deleteContact(contactToDelete)
      toast.success("Demande de contact supprimée avec succès")
      loadContacts()
      loadStats()
    } catch (error) {
      toast.error("Erreur lors de la suppression de la demande")
    } finally {
      setLoadingActions(prev => {
        const newState = { ...prev }
        delete newState[contactToDelete]
        return newState
      })
      setDeleteDialogOpen(false)
      setContactToDelete(null)
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="container mx-auto py-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Demandes en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pending_contacts || 0}</div>
            <p className="text-xs text-yellow-500 flex items-center mt-1">
              <span>Nécessite votre attention</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Taux d'acceptation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.acceptance_rate?.toFixed(1) || 0}%</div>
            <p className={`text-xs flex items-center mt-1 ${
              (stats?.monthly_growth || 0) >= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {stats?.monthly_growth ? (
                <>
                  {stats.monthly_growth >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(stats.monthly_growth)}% vs mois dernier</span>
                </>
              ) : (
                <span>Pas de données</span>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestion des demandes de contact</CardTitle>
          <CardDescription>
            {totalCount} demande{totalCount > 1 ? "s" : ""} en attente de validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visiteur</TableHead>
                <TableHead>Prestataire</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    {contact.name}
                    <br />
                    <span className="text-sm text-gray-500">{contact.email}</span>
                    <br />
                    <span className="text-sm text-gray-500">{contact.phone}</span>
                  </TableCell>
                  <TableCell>
                    {contact.provider_details.company_name}
                    <br />
                    <span className="text-sm text-gray-500">
                      {contact.provider_details.user.email}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {contact.message}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        contact.status === "accepted"
                          ? "default"
                          : contact.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(contact.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {contact.status === "pending" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleAccept(contact.id)}
                                disabled={!!loadingActions[contact.id]}
                              >
                                {loadingActions[contact.id] === "accept" ? (
                                  <Loader2 className="size-4 animate-spin text-green-600" />
                                ) : (
                                  <Check className="size-4 text-green-600" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Accepter</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleReject(contact.id)}
                                disabled={!!loadingActions[contact.id]}
                              >
                                {loadingActions[contact.id] === "reject" ? (
                                  <Loader2 className="size-4 animate-spin text-red-600" />
                                ) : (
                                  <X className="size-4 text-red-600" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Rejeter</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="rounded-full"
                              onClick={() => handleDelete(contact.id)}
                              disabled={!!loadingActions[contact.id]}
                            >
                              {loadingActions[contact.id] === "delete" ? (
                                <Loader2 className="size-4 animate-spin text-white" />
                              ) : (
                                <Trash2 className="size-4 text-white" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Supprimer</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement la demande de contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 