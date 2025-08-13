"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/constants/categories"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { usePathname } from "next/navigation"
import { ChevronsUpDown } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith('/auth')
  const isAdminPage = pathname?.startsWith('/admin')

  const currentYear = new Date().getFullYear()

  return (
    <>
      {
        !isAuthPage && !isAdminPage && (
          <footer className="bg-background4 w-full mx-auto">
            <div className="py-8 md:py-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-2">
                {/* Navigation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    <Link href="/" className="text-white hover:text-white text-2xl">
                      {t("footer.brand.name")}
                    </Link>
                  </h3>
                </div>

                {/* Quick links */}
                <div className="space-y-4">
                  <h3 className="text-lg text-zinc-300 font-medium">{t("footer.quick.links")}</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link href="/search" className="text-zinc-400 hover:text-white">
                      {t("nav.explore")}
                    </Link>
                    <Link href="/about" className="text-zinc-400 hover:text-white">
                      {t("nav.about")}
                    </Link>
                    <Link href="/how-it-works" className="text-zinc-400 hover:text-white">
                      {t("footer.hiw")}
                    </Link>
                  </nav>
                </div>

                {/* Legal */}
                <div className="space-y-4">
                  <h3 className="text-lg text-zinc-300 font-medium">{t("footer.legal")}</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link href="/legal/terms" className="text-zinc-400 hover:text-white">
                      {t("footer.terms")}
                    </Link>
                    <Link href="/legal/privacy" className="text-zinc-400 hover:text-white">
                      {t("footer.privacy")}
                    </Link>
                    {/* <Link href="/cookies" className="text-zinc-400 hover:text-white">
                      {t("footer.cookies")}
                    </Link> */}
                    <Link href="/faq" className="text-zinc-400 hover:text-white">
                      {t("footer.faq")}
                    </Link>
                  </nav>
                </div>

                {/* Newsletter */}
                <div className="space-y-4">
                  <h3 className="text-lg text-zinc-300 font-medium">{t("footer.newsletter")}</h3>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-zinc-400">
                      {t("footer.newsletter.description")}
                    </p>
                    <div className="flex space-x-2">
                      <Input type="email" placeholder={t("footer.newsletter.placeholder")} className="max-w-[220px]" />
                      <Button type="submit">{t("footer.newsletter.button")}</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4 border-t border-zinc-600 mt-8 pt-8 px-2">
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full">
                    <h3 className="text-lg text-zinc-300 font-medium">{t("nav.categories")}</h3>
                    <ChevronsUpDown className="text-zinc-300" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <nav className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 mt-4">
                      {
                        categories.map(category => (
                          <Link key={category.name} href={category.path} className="text-zinc-400 hover:text-white">
                            {category.name}
                          </Link>
                        ))
                      }
                    </nav>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <div className="mt-8 border-t border-zinc-600 pt-8">
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <p className="text-sm text-zinc-400">
                    &copy; {currentYear} {t("footer.brand.name")}. {t("footer.rights")}
                  </p>
                  {/* <div className="flex space-x-4 text-sm text-zinc-400">
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                    <Link href="/sitemap" className="hover:text-white">
                      Sitemap
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </footer>
        )
      }
    </>
  )
}

