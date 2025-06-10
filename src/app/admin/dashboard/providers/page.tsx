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
import { providerService } from "@/services/api"
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
import { categories } from "@/constants/categories"

interface Provider {
  id: number
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    phone: string
    profile_photo: string
    is_provider: boolean
    is_validated: boolean
  }
  company_name: string
  category: string
  city: string
  status: string
  created_at: string
  description: string
  address: string
  postal_code: string
  rating: string
}

interface ProvidersResponse {
  count: number
  next: string | null
  previous: string | null
  results: Provider[]
}

interface ProviderStats {
  total_providers: number
  pending_providers: number
  today_visits: number
  conversion_rate: number
  monthly_growth: number
  visits_growth: number
  conversion_change: number
}

export default function ProvidersPage() {
  const router = useRouter()
  const [providers, setProviders] = useState<Provider[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [stats, setStats] = useState<ProviderStats | null>(null)
  const [loadingActions, setLoadingActions] = useState<{ [key: number]: string }>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [providerToDelete, setProviderToDelete] = useState<number | null>(null)

  useEffect(() => {
    loadProviders()
    loadStats()
  }, [])

  const loadProviders = async () => {
    try {
      const data: ProvidersResponse = await providerService.getPending()
      setProviders(data.results)
      setTotalCount(data.count)
    } catch (error) {
      toast.error("Erreur lors du chargement des prestataires")
    } finally {
      setIsLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await providerService.getStats()
      setStats(data)
    } catch (error) {
      toast.error("Erreur lors du chargement des statistiques")
    }
  }

  const handleValidate = async (id: number, status: "approved" | "rejected") => {
    try {
      setLoadingActions(prev => ({ ...prev, [id]: status }))
      await providerService.validate(id, status)
      toast.success(`Prestataire ${status === "approved" ? "approuvé" : "rejeté"} avec succès`)
      loadProviders()
      loadStats()
    } catch (error) {
      toast.error("Erreur lors de la validation du prestataire")
    } finally {
      setLoadingActions(prev => {
        const newState = { ...prev }
        delete newState[id]
        return newState
      })
    }
  }

  const handleDelete = async (id: number) => {
    setProviderToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!providerToDelete) return

    try {
      setLoadingActions(prev => ({ ...prev, [providerToDelete]: 'delete' }))
      await providerService.delete(providerToDelete)
      toast.success("Prestataire supprimé avec succès")
      loadProviders()
      loadStats()
    } catch (error) {
      toast.error("Erreur lors de la suppression du prestataire")
    } finally {
      setLoadingActions(prev => {
        const newState = { ...prev }
        delete newState[providerToDelete]
        return newState
      })
      setDeleteDialogOpen(false)
      setProviderToDelete(null)
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
              Total Prestataires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_providers || 0}</div>
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
                  <span>{Math.abs(stats.monthly_growth)}% ce mois</span>
                </>
              ) : (
                <span>Pas de données</span>
              )}
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
            <div className="text-2xl font-bold">{stats?.pending_providers || 0}</div>
            <p className="text-xs text-yellow-500 flex items-center mt-1">
              <span>Nécessite votre attention</span>
            </p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Visites aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.today_visits || 0}</div>
            <p className={`text-xs flex items-center mt-1 ${
              (stats?.visits_growth || 0) >= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {stats?.visits_growth ? (
                <>
                  {stats.visits_growth >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(stats.visits_growth)}% vs hier</span>
                </>
              ) : (
                <span>Pas de données</span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Taux de conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.conversion_rate?.toFixed(1) || 0}%</div>
            <p className={`text-xs flex items-center mt-1 ${
              (stats?.conversion_change || 0) >= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {stats?.conversion_change ? (
                <>
                  {stats.conversion_change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(stats.conversion_change)}% vs semaine dernière</span>
                </>
              ) : (
                <span>Pas de données</span>
              )}
            </p>
          </CardContent>
        </Card> */}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion des prestataires</CardTitle>
          <CardDescription>
            {totalCount} prestataire{totalCount > 1 ? "s" : ""} en attente de validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    {provider.user.first_name} {provider.user.last_name}
                    <br />
                    <span className="text-sm text-gray-500">{provider.user.email}</span>
                  </TableCell>
                  <TableCell>
                    {provider.company_name}
                    <br />
                    <span className="text-sm text-gray-500">{provider.address}, {provider.postal_code}</span>
                  </TableCell>
                  <TableCell>{categories.filter(item => item.id === Number(provider?.category))[0].name}</TableCell>
                  <TableCell>{provider.city}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        provider.status === "approved"
                          ? "default"
                          : provider.status === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(provider.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {provider.status === "pending" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleValidate(provider.id, "approved")}
                                disabled={!!loadingActions[provider.id]}
                              >
                                {loadingActions[provider.id] === "approved" ? (
                                  <Loader2 className="size-4 animate-spin text-green-600" />
                                ) : (
                                  <Check className="size-4 text-green-600" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Approuver</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                                onClick={() => handleValidate(provider.id, "rejected")}
                                disabled={!!loadingActions[provider.id]}
                              >
                                {loadingActions[provider.id] === "rejected" ? (
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
                              onClick={() => handleDelete(provider.id)}
                              disabled={!!loadingActions[provider.id]}
                            >
                              {loadingActions[provider.id] === "delete" ? (
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
              Cette action est irréversible. Cela supprimera définitivement le prestataire.
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