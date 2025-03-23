import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, ChevronRight, MessageSquare, Briefcase, Shield, Award, Zap } from "lucide-react"
import { CategoryShowcase } from "@/components/home/category-showcase"
import { FeaturedFreelancers } from "@/components/home/featured-freelancers"
import { TrendingProjects } from "@/components/home/trending-projects"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Banner */}
      <div className="bg-primary/10 py-2 text-center text-sm">
        <p>
          Bienvenue sur Oakland |{" "}
          <span className="font-medium">
            Inscrivez-vous aujourd'hui et obtenez 20% de réduction sur votre première mission
          </span>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 py-10 md:py-16 px-4 ">
          <div className="container grid gap-8 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-6 text-left">
              <Badge className="w-fit">Meilleure plateforme de freelance 2023</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Trouvez le talent parfait pour votre projet
              </h1>
              <p className="text-lg text-muted-foreground">
                Connectez-vous avec des milliers de freelances qualifiés dans le design, le développement, la rédaction
                et plus encore.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher une compétence ou un service..."
                  className="pl-10 pr-20 py-6 text-base"
                />
                <Button className="absolute right-1 top-1/2 -translate-y-1/2">Rechercher</Button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="font-medium">Populaire:</span>
                <Link href="/categories/design" className="hover:text-primary hover:underline">
                  Design Web
                </Link>
                <Link href="/categories/development" className="hover:text-primary hover:underline">
                  Développement
                </Link>
                <Link href="/categories/writing" className="hover:text-primary hover:underline">
                  Rédaction
                </Link>
                <Link href="/categories/marketing" className="hover:text-primary hover:underline">
                  Marketing
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <Image
                src="/1.jpg"
                alt="Freelance collaboration"
                width={600}
                height={600}
                className="rounded-lg object-cover"
              />
              <div className="absolute -right-4 -top-4 rounded-lg bg-background p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-background"
                    />
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-background"
                    />
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-background"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">+2500 freelances</p>
                    <p className="text-xs text-muted-foreground">en ligne aujourd'hui</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-background p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-2">
                    <Briefcase className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">+1200 projets</p>
                    <p className="text-xs text-muted-foreground">publiés cette semaine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Highlights */}
        <section className="border-y bg-background py-6">
          <div className="container">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Paiements Sécurisés</p>
                  <p className="text-xs text-muted-foreground">Protection garantie</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Talents Vérifiés</p>
                  <p className="text-xs text-muted-foreground">Freelances qualifiés</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Mise en Relation Rapide</p>
                  <p className="text-xs text-muted-foreground">Trouvez en 24h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Support 24/7</p>
                  <p className="text-xs text-muted-foreground">Assistance dédiée</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Catégories Populaires</h2>
              <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-primary">
                Voir toutes les catégories <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <CategoryShowcase
                title="Tech & Développement"
                count="8,543 freelances"
                imageSrc="/placeholder.svg?height=200&width=200"
                href="/categories/tech"
              />
              <CategoryShowcase
                title="Design & Graphisme"
                count="6,129 freelances"
                imageSrc="/placeholder.svg?height=200&width=200"
                href="/categories/design"
              />
              <CategoryShowcase
                title="Marketing Digital"
                count="4,872 freelances"
                imageSrc="/placeholder.svg?height=200&width=200"
                href="/categories/marketing"
              />
              <CategoryShowcase
                title="Rédaction & Traduction"
                count="5,310 freelances"
                imageSrc="/placeholder.svg?height=200&width=200"
                href="/categories/writing"
              />
              <CategoryShowcase
                title="Audio & Vidéo"
                count="3,254 freelances"
                imageSrc="/placeholder.svg?height=200&width=200"
                href="/categories/audio-video"
              />
            </div>
          </div>
        </section>

        {/* Featured Deals Section */}
        <section className="bg-muted/50 py-12">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Freelances en Vedette</h2>
              <Link href="/explore" className="flex items-center gap-1 text-sm font-medium text-primary">
                Explorer tous les freelances <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger
                  value="development"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Développement
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="marketing"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Marketing
                </TabsTrigger>
                <TabsTrigger
                  value="writing"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Rédaction
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <FeaturedFreelancers
                    name="Thomas Dubois"
                    title="Développeur Full Stack"
                    rating={4.9}
                    reviews={124}
                    hourlyRate="45€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                    isFeatured={true}
                  />
                  <FeaturedFreelancers
                    name="Sophie Martin"
                    title="Designer UX/UI"
                    rating={4.8}
                    reviews={87}
                    hourlyRate="55€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                  />
                  <FeaturedFreelancers
                    name="Marc Leroy"
                    title="Expert Marketing Digital"
                    rating={4.7}
                    reviews={63}
                    hourlyRate="40€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                  />
                  <FeaturedFreelancers
                    name="Emma Rodriguez"
                    title="Rédactrice Web"
                    rating={4.9}
                    reviews={92}
                    hourlyRate="35€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                  />
                </div>
              </TabsContent>

              <TabsContent value="development" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <FeaturedFreelancers
                    name="Thomas Dubois"
                    title="Développeur Full Stack"
                    rating={4.9}
                    reviews={124}
                    hourlyRate="45€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                    isFeatured={true}
                  />
                  <FeaturedFreelancers
                    name="Julie Moreau"
                    title="Développeuse Mobile"
                    rating={4.8}
                    reviews={76}
                    hourlyRate="50€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                  />
                  <FeaturedFreelancers
                    name="Alexandre Petit"
                    title="Expert WordPress"
                    rating={4.6}
                    reviews={58}
                    hourlyRate="40€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                  />
                  <FeaturedFreelancers
                    name="Camille Durand"
                    title="Développeuse Frontend"
                    rating={4.7}
                    reviews={82}
                    hourlyRate="45€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                  />
                </div>
              </TabsContent>

              {/* Other tabs would have similar content structure */}
              <TabsContent value="design" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <FeaturedFreelancers
                    name="Sophie Martin"
                    title="Designer UX/UI"
                    rating={4.8}
                    reviews={87}
                    hourlyRate="55€"
                    imageSrc="/placeholder.svg?height=300&width=300"
                    isFeatured={true}
                  />
                  {/* More designers would be listed here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Trending Projects Banners */}
        <section className="py-12">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
                <div className="relative z-10 flex flex-col gap-2">
                  <Badge className="w-fit bg-white/20 text-white hover:bg-white/30">Tendance 2023</Badge>
                  <h3 className="text-2xl font-bold">Développement Web & Mobile</h3>
                  <p className="max-w-xs text-white/80">Trouvez les meilleurs développeurs pour vos projets digitaux</p>
                  <Button variant="secondary" className="mt-4 w-fit">
                    Explorer maintenant
                  </Button>
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Development"
                  width={200}
                  height={200}
                  className="absolute bottom-0 right-0 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-600 to-amber-400 p-6 text-white">
                <div className="relative z-10 flex flex-col gap-2">
                  <Badge className="w-fit bg-white/20 text-white hover:bg-white/30">Promotion</Badge>
                  <h3 className="text-2xl font-bold">Design & Création Graphique</h3>
                  <p className="max-w-xs text-white/80">-20% sur votre première commande de design</p>
                  <Button variant="secondary" className="mt-4 w-fit">
                    En profiter
                  </Button>
                </div>
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Design"
                  width={200}
                  height={200}
                  className="absolute bottom-0 right-0 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trending Projects */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Projets Populaires</h2>
              <Link href="/projects" className="flex items-center gap-1 text-sm font-medium text-primary">
                Voir tous les projets <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TrendingProjects
                title="Création d'un site e-commerce"
                category="Développement Web"
                budget="1500€ - 3000€"
                proposals={12}
                timePosted="Il y a 2 jours"
                isUrgent={true}
              />
              <TrendingProjects
                title="Refonte de l'identité visuelle"
                category="Design Graphique"
                budget="800€ - 1200€"
                proposals={8}
                timePosted="Il y a 3 jours"
              />
              <TrendingProjects
                title="Campagne marketing sur les réseaux sociaux"
                category="Marketing Digital"
                budget="1000€ - 2000€"
                proposals={15}
                timePosted="Il y a 1 jour"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-primary/5 py-12">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce que disent nos utilisateurs</h2>
              <p className="mt-2 text-muted-foreground">
                Découvrez les témoignages de nos clients et freelances satisfaits
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="overflow-visible">
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="absolute -top-12 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-xl">"</span>
                    </div>
                    <div className="mb-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm">
                      "Oakland m'a permis de trouver rapidement des clients de qualité. La plateforme est
                      intuitive et le système de paiement sécurisé me donne une tranquillité d'esprit."
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Sophie Martin</p>
                        <p className="text-xs text-muted-foreground">Designer UX/UI</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="absolute -top-12 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-xl">"</span>
                    </div>
                    <div className="mb-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm">
                      "En tant qu'entreprise, nous avons trouvé des freelances exceptionnels pour nos projets. Le
                      processus de sélection est simple et les talents sont vraiment qualifiés."
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Jean Dupont</p>
                        <p className="text-xs text-muted-foreground">Directeur Marketing, TechCorp</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-visible">
                <CardContent className="pt-6">
                  <div className="relative">
                    <div className="absolute -top-12 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <span className="text-xl">"</span>
                    </div>
                    <div className="mb-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm">
                      "La qualité des projets sur Oakland est impressionnante. J'ai pu développer mon portfolio
                      et augmenter mes revenus de façon significative."
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">Thomas Dubois</p>
                        <p className="text-xs text-muted-foreground">Développeur Full Stack</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12 text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Prêt à commencer votre projet ?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Rejoignez des milliers d'entreprises et de freelances qui collaborent chaque jour sur notre plateforme.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/post-project">Publier un projet</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/explore">Trouver un freelance</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

