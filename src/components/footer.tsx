"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/constants/categories"
import { usePathname } from "next/navigation"

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
          <footer className="border-t bg-background mx-auto">
            <div className="py-8 md:py-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 px-2">
                {/* Navigation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    <Link href="/" className="text-muted-foreground hover:text-foreground text-2xl">
                      MonPresta
                    </Link>
                  </h3>
                </div>

                {/* Quick links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Quick links</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link href="/search" className="text-muted-foreground hover:text-foreground">
                      {t("nav.explore")}
                    </Link>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      {t("nav.about")}
                    </Link>
                    <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                      {t("footer.hiw")}
                    </Link>
                  </nav>
                </div>

                {/* Legal */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Legal</h3>
                  <nav className="flex flex-col space-y-2">
                    <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                    <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                    {/* <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                      Cookie Policy
                    </Link> */}
                    <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </nav>
                </div>

                {/* Newsletter */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("footer.newsletter")}</h3>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Stay updated with the latest freelancing trends and opportunities.
                    </p>
                    <div className="flex space-x-2">
                      <Input type="email" placeholder={t("footer.newsletter.placeholder")} className="max-w-[220px]" />
                      <Button type="submit">{t("footer.newsletter.button")}</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4 border-t mt-8 pt-8 px-2">
                <h3 className="text-lg font-medium">{t("nav.categories")}</h3>
                <nav className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                  {
                    categories.map(category => (
                      <Link key={category.name} href={category.path} className="text-muted-foreground hover:text-foreground">
                        {category.name}
                      </Link>
                    ))
                  }
                </nav>
              </div>

              <div className="mt-8 border-t pt-8">
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                  <p className="text-sm text-muted-foreground">
                    &copy; {currentYear} MonPresta. {t("footer.rights")}
                  </p>
                  {/* <div className="flex space-x-4 text-sm text-muted-foreground">
                    <Link href="/contact" className="hover:text-foreground">
                      Contact
                    </Link>
                    <Link href="/sitemap" className="hover:text-foreground">
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

