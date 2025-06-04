"use client"

import { useState } from "react"
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
import { Menu, Globe, Search, LogOut, Dot } from "lucide-react"
import { cn, getInitials } from "@/lib/utils"
import { categories } from "@/constants/categories"
import { useAuth } from "@/contexts/authContext"
import { Loader } from "./loader"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { logout, MEDIA_API_URL } from "@/services/services"
import { usePathname, useRouter } from "next/navigation"


export default function Navbar() {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')
  const isAdminPage = pathname?.startsWith('/admin')
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, loading, setUser } = useAuth()

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
                  <span className="font-bold sm:inline-block text-3xl">Okland</span>
                </Link>
    
                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList>
                    {/* <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.home")}</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem> */}
                    <NavigationMenuItem>
                      <Link href="/search" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.explore")}</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    {/* <NavigationMenuItem>
                      <Link href="/post-project" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.post")}</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem> */}
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
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("nav.about")}</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
    
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
                              <AvatarImage src={MEDIA_API_URL + user.photo_profile} alt="@shadcn" />
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
                            <DropdownMenuItem>Prise de contacts</DropdownMenuItem>
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
    </>
  )
}

