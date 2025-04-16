"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background mx-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Okland</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                {t("nav.home")}
              </Link>
              <Link href="/explore" className="text-muted-foreground hover:text-foreground">
                {t("nav.explore")}
              </Link>
              <Link href="/post-project" className="text-muted-foreground hover:text-foreground">
                {t("nav.post")}
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                {t("nav.about")}
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("nav.categories")}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/categories/tech" className="text-muted-foreground hover:text-foreground">
                {t("category.tech")}
              </Link>
              <Link href="/categories/design" className="text-muted-foreground hover:text-foreground">
                {t("category.design")}
              </Link>
              <Link href="/categories/marketing" className="text-muted-foreground hover:text-foreground">
                {t("category.marketing")}
              </Link>
              <Link href="/categories/writing" className="text-muted-foreground hover:text-foreground">
                {t("category.writing")}
              </Link>
              <Link href="/categories/audio" className="text-muted-foreground hover:text-foreground">
                {t("category.audio")}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
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

            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Okland. {t("footer.rights")}
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
              <Link href="/sitemap" className="hover:text-foreground">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

