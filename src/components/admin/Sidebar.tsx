"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, BarChart, Settings, Mail } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.includes(path)
  }

  const menuItems = [
    {
      href: "/admin/dashboard/providers",
      icon: Users,
      label: "Prestataires",
    },
    {
      href: "/admin/dashboard/requests",
      icon: Mail,
      label: "Demandes",
    },
    // {
    //   href: "/admin/dashboard/stats",
    //   icon: BarChart,
    //   label: "Statistiques",
    // },
    // {
    //   href: "/admin/dashboard/settings",
    //   icon: Settings,
    //   label: "Paramètres",
    // },
  ]

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center p-2 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  isActive(item.href) ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                <item.icon className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
} 