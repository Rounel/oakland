"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Globe, Search, LogOut, Dot, MessageSquare, Loader2 } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { categories } from "@/constants/categories"
import { useAuth } from "@/contexts/authContext"
import { Loader } from "./loader"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { logout, MEDIA_API_URL, BASE_API_URL } from "@/services/services"
import { usePathname, useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` || '',
      ...options.headers,
    },
  })
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }
  return response.json()
}

export default function Navbar() {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')
  const isAdminPage = pathname?.startsWith('/admin')
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, loading, setUser } = useAuth()
  const [contacts, setContacts] = useState<any[]>([])
  const [isLoadingContacts, setIsLoadingContacts] = useState(false)
  const [showContacts, setShowContacts] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setIsLoadingContacts(true)
      const response = await apiCall('/visitor-contacts/')
      setContacts(response?.results)
      // Count unread contacts (status === 'pending')
      setUnreadCount(response?.results.filter((contact: any) => contact.status === 'pending').length)
    } catch (err) {
      console.error("Erreur lors du chargement des contacts:", err)
    } finally {
      setIsLoadingContacts(false)
    }
  }

  // Handle contact status update
  const handleContactStatus = async (contactId: number, status: 'accept' | 'reject') => {
    try {
      await apiCall(`/visitor-contacts/${contactId}/${status}/`, {
        method: 'POST'
      })
      await fetchContacts() // Refresh contacts after update
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut du contact:", err)
    }
  }

  // Fetch contacts when user is loaded
  useEffect(() => {
    if (user) {
      fetchContacts()
    }
  }, [user])

  const handleLogout = async () => {
    const res = await logout()
    console.log("from NAVBAR", res)
    if (res.ok) {
      setUser(null)
      if (pathname.includes("provider/me")) {
        router.push("/auth/login")
      }
    }
  }

  console.log("from NAVBAR")
  console.log(!loading && user)
  

  return (
    <>
      {
        !isAuthPage && !isAdminPage && (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto">
              <div className="ml-2  flex items-center gap-6 md:gap-10">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold sm:inline-block text-3xl">MonPresta</span>
                </Link>
              </div>
  
              {/* Desktop Navigation */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  
                  <NavigationMenuItem>
                    <Link href="/search" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.explore")}</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{t("nav.categories")}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-4 lg:w-[1000px]">
                        {categories.map((category) => (
                          <li key={category.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={category.path}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{category.name}</div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/#pricing" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.pricing")}</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.about")}</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
    
              {/* Right side - Search, Language, Auth */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="hidden md:flex">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
    
                {/* Language Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Switch language</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("en")} className={cn(language === "en" && "font-bold")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("fr")} className={cn(language === "fr" && "font-bold")}>
                      Français
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
    
                {/* Auth Buttons - Desktop */}
                {
                  loading ? (
                    <Loader />
                  ) : !user ? (
                      <div className="hidden md:flex md:items-center md:gap-2">
                        <Button variant="ghost" asChild>
                          <Link href="/auth/login">{t("nav.login")}</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/auth/register">{t("nav.signup")}</Link>
                        </Button>
                      </div>
                  ) : (
                      <div className="hidden md:flex md:items-center md:gap-2">
                        <p>Bienvenue {user.first_name} {user.last_name} !</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Avatar>
                              <AvatarImage src={MEDIA_API_URL + user.profile_photo} alt="@shadcn" />
                              <AvatarFallback className="bg-purple-700 text-white">
                                {getInitials(`${user.first_name} ${user.last_name}`)}
                              </AvatarFallback>
                            </Avatar>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>
                              My Account
                              <div className="flex items-center text-xs gap-2 font-light text-neutral-500">
                                <div className="bg-green-500 size-2 rounded-full"/>
                                Disponible
                              </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href={"/provider/me"}>
                                Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShowContacts(true)}>
                              <div className="flex items-center justify-between w-full">
                                <span>Prise de contacts</span>
                                {unreadCount > 0 && (
                                  <Badge variant="destructive" className="ml-2">
                                    {unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleLogout()}>
                              <LogOut />
                              Déconnexion
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                  )
                }
    
                {/* Mobile Menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <nav className="flex flex-col gap-4">
                      <Link href="/" className="text-lg font-medium">
                        {t("nav.home")}
                      </Link>
                      <Link href="/search" className="text-lg font-medium">
                        {t("nav.explore")}
                      </Link>
                      <Link href="/about" className="text-lg font-medium">
                        {t("nav.about")}
                      </Link>
                      {/* <Link href="/post-project" className="text-lg font-medium">
                        {t("nav.post")}
                      </Link> */}
                      {/* <div className="py-2">
                        <h3 className="mb-2 text-lg font-medium">{t("nav.categories")}</h3>
                        <div className="flex flex-col gap-2 pl-2">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.path}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {t(category.name)}
                            </Link>
                          ))}
                        </div>
                      </div> */}
                      <div className="flex flex-col gap-2 pt-4">
                        <Button asChild variant="outline">
                          <Link href="/login">{t("nav.login")}</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/signup">{t("nav.signup")}</Link>
                        </Button>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
    
            {/* Search Bar - Expandable */}
            {isSearchOpen && (
              <div className="border-t bg-background py-3">
                <div className="container">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={t("hero.search.placeholder")}
                      className="w-full rounded-md border bg-background py-2 pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </header>
        )
      }

      {/* Contacts Modal */}
      <Dialog open={showContacts} onOpenChange={setShowContacts}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Demandes de contact</DialogTitle>
          </DialogHeader>
          
          {isLoadingContacts ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contacts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucune demande de contact</p>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      {contact.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleContactStatus(contact.id, 'accept')}
                          >
                            Accepter
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleContactStatus(contact.id, 'reject')}
                          >
                            Refuser
                          </Button>
                        </>
                      )}
                      {contact.status === 'accepted' && (
                        <span className="text-green-500 text-sm">Accepté</span>
                      )}
                      {contact.status === 'rejected' && (
                        <span className="text-red-500 text-sm">Refusé</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{contact.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Reçu le {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

