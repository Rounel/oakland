"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Users, BarChart, Settings, LogOut, Menu, X, Search, CheckCircle, XCircle, Clock, Filter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for pending registrations
const pendingRegistrations = [
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
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [registrations, setRegistrations] = useState(pendingRegistrations)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleLogout = () => {
    // In a real app, we would clear the auth state
    router.push("/admin")
  }

  const handleApprove = (id: string) => {
    setRegistrations(registrations.map((reg) => (reg.id === id ? { ...reg, status: "approved" } : reg)))
  }

  const handleReject = (id: string) => {
    setRegistrations(registrations.map((reg) => (reg.id === id ? { ...reg, status: "rejected" } : reg)))
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
    </div>
  )
}
