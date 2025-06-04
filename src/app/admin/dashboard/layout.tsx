"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Users, BarChart, Settings, LogOut, Menu, X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, we would clear the auth state
    router.push("/admin")
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
              Okland
            </div>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/dashboard/providers"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Prestataires</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/requests"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Demandes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/stats"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BarChart className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Statistiques</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/dashboard/settings"
                className="flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>Paramètres</span>
              </Link>
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
                Gérez les demandes d'inscription et suivez l'activité de la plateforme
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

          {children}
        </div>
      </div>
    </div>
  )
} 