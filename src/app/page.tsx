// import Link from "next/link"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Search, Star, ChevronRight, MessageSquare, Briefcase, Shield, Award, Zap } from "lucide-react"
// import { CategoryShowcase } from "@/components/home/category-showcase"
// import { FeaturedFreelancers } from "@/components/home/featured-providers"
// import { TrendingProjects } from "@/components/home/trending-projects"
// import  HomeHeroSection  from "@/components/home-hero-section"
// import  HowItWorksSection  from "@/components/how-it-works"

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col overflow-x-hidden">
//       {/* Top Banner */}
//       {/* <div className="bg-primary/10 py-2 text-center text-sm">
//         <p>
//           Bienvenue sur Okland |{" "}
//           <span className="font-medium">
//             Inscrivez-vous aujourd'hui et obtenez 20% de réduction sur votre première mission
//           </span>
//         </p>
//       </div> */}

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Hero Section */}
//         {/* <section className="relative overflow-hidden bg-gradient-to-r from-white to-amber-100 py-10 md:py-16 px-4">
//           <div className="container grid gap-8 md:grid-cols-2 md:items-center">
//             <div className="flex flex-col gap-6 text-left">
//               <Badge className="w-fit">Meilleure plateforme de freelance 2023</Badge>
//               <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
//                 Trouvez le professionel le plus proche
//               </h1>
//               <p className="text-lg text-muted-foreground">
//                 Connectez-vous avec des milliers de freelances qualifiés dans le design, le développement, la rédaction
//                 et plus encore.
//               </p>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="text"
//                   placeholder="Rechercher une compétence ou un service..."
//                   className="pl-10 pr-20 py-6 text-base"
//                 />
//                 <Button className="absolute right-1 top-1/2 -translate-y-1/2">Rechercher</Button>
//               </div>
//               <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
//                 <span className="font-medium">Populaire:</span>
//                 <Link href="/categories/design" className="hover:text-primary hover:underline">
//                   Maçonnerie
//                 </Link>
//                 <Link href="/categories/development" className="hover:text-primary hover:underline">
//                   Menuisierie
//                 </Link>
//                 <Link href="/categories/writing" className="hover:text-primary hover:underline">
//                   Plomberie
//                 </Link>
//                 <Link href="/categories/marketing" className="hover:text-primary hover:underline">
//                   Electronique
//                 </Link>
//               </div>
//             </div>
//             <div className="relative hidden md:block">
//               <Image
//                 src="/jobs/menuisier.jpeg"
//                 alt="Freelance collaboration"
//                 width={600}
//                 height={600}
//                 className="rounded-lg object-cover"
//               />
//             </div>
//           </div>
//         </section> */}
//         <HomeHeroSection />

//         {/* How it works section */}
//         <HowItWorksSection />

//         {/* Services Highlights */}
//         {/* <section className="border-y bg-background py-6">
//           <div className="container">
//             <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-3">
//                   <Shield className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Paiements Sécurisés</p>
//                   <p className="text-xs text-muted-foreground">Protection garantie</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-3">
//                   <Award className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Talents Vérifiés</p>
//                   <p className="text-xs text-muted-foreground">Freelances qualifiés</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-3">
//                   <Zap className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Mise en Relation Rapide</p>
//                   <p className="text-xs text-muted-foreground">Trouvez en 24h</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="rounded-full bg-primary/10 p-3">
//                   <MessageSquare className="h-5 w-5 text-primary" />
//                 </div>
//                 <div>
//                   <p className="font-medium">Support 24/7</p>
//                   <p className="text-xs text-muted-foreground">Assistance dédiée</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section> */}

//         {/* Featured Categories */}
//         <section className="py-12 flex justify-center px-2">
//           <div className="container">
//             <div className="mb-8 flex items-center justify-between">
//               <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Catégories Populaires</h2>
//               <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-primary">
//                 Voir toutes les catégories <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//               <CategoryShowcase
//                 title="Plomberie"
//                 count="12 professionels"
//                 imageSrc="/jobs/plombier.jpg"
//                 href="/categories/tech"
//               />
//               <CategoryShowcase
//                 title="Menuiserie"
//                 count="07 professionels"
//                 imageSrc="/jobs/menuisier.jpeg"
//                 href="/categories/design"
//               />
//               <CategoryShowcase
//                 title="Electronique"
//                 count="24 professionels"
//                 imageSrc="/jobs/elect.jpg"
//                 href="/categories/marketing"
//               />
//               <CategoryShowcase
//                 title="Peintre"
//                 count="02 professionels"
//                 imageSrc="/jobs/peintre.jpeg"
//                 href="/categories/writing"
//               />
//               <CategoryShowcase
//                 title="Maconnerie"
//                 count="11 professionels"
//                 imageSrc="/jobs/maçon.jpg"
//                 href="/categories/audio-video"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Featured Deals Section */}
//         <section className="bg-muted/50 py-12 flex justify-center px-2">
//           <div className="container">
//             <div className="mb-8 flex items-center justify-between">
//               <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Professionels trouvés autour de vous</h2>
//               <Link href="/search" className="flex items-center gap-1 text-sm font-medium text-primary">
//                 Explorer tous les professionels <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>

//             <Tabs defaultValue="all" className="space-y-6">
//               <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
//                 <TabsTrigger
//                   value="all"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
//                 >
//                   Tous
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="maçon"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
//                 >
//                   Maçon
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="mecano"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
//                 >
//                   Mecanicien
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="menuisier"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
//                 >
//                   Menuisier
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="electricien"
//                   className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
//                 >
//                   Electricien
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="all" className="mt-6">
//                 <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   <FeaturedFreelancers
//                     name="Thomas Dubois"
//                     title="Maçon"
//                     rating={4.9}
//                     reviews={124}
//                     hourlyRate="4500 FCFA"
//                     imageSrc="/fake pp/pp1.jpg"
//                     isFeatured={true}
//                   />
//                   <FeaturedFreelancers
//                     name="Sophie Martin"
//                     title="Electricien"
//                     rating={4.8}
//                     reviews={87}
//                     hourlyRate="5500 FCFA"
//                     imageSrc="/fake pp/pp3.jpeg"
//                   />
//                   <FeaturedFreelancers
//                     name="Marc Leroy"
//                     title="Menuisier"
//                     rating={4.7}
//                     reviews={63}
//                     hourlyRate="4000 FCFA"
//                     imageSrc="/fake pp/pp2.avif"
//                   />
//                   <FeaturedFreelancers
//                     name="Emma Rodriguez"
//                     title="Electricien"
//                     rating={4.9}
//                     reviews={92}
//                     hourlyRate="3500 FCFA"
//                     imageSrc="/fake pp/pp4.jpg"
//                   />
//                 </div>
//               </TabsContent>

//               <TabsContent value="development" className="mt-6">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   <FeaturedFreelancers
//                     name="Thomas Dubois"
//                     title="Développeur Full Stack"
//                     rating={4.9}
//                     reviews={124}
//                     hourlyRate="4500 FCFA"
//                     imageSrc="/placeholder.svg?height=300&width=300"
//                     isFeatured={true}
//                   />
//                   <FeaturedFreelancers
//                     name="Julie Moreau"
//                     title="Développeuse Mobile"
//                     rating={4.8}
//                     reviews={76}
//                     hourlyRate="5000 FCFA"
//                     imageSrc="/placeholder.svg?height=300&width=300"
//                   />
//                   <FeaturedFreelancers
//                     name="Alexandre Petit"
//                     title="Expert WordPress"
//                     rating={4.6}
//                     reviews={58}
//                     hourlyRate="4000 FCFA"
//                     imageSrc="/placeholder.svg?height=300&width=300"
//                   />
//                   <FeaturedFreelancers
//                     name="Camille Durand"
//                     title="Développeuse Frontend"
//                     rating={4.7}
//                     reviews={82}
//                     hourlyRate="4500 FCFA"
//                     imageSrc="/placeholder.svg?height=300&width=300"
//                   />
//                 </div>
//               </TabsContent>

//               {/* Other tabs would have similar content structure */}
//               <TabsContent value="design" className="mt-6">
//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                   <FeaturedFreelancers
//                     name="Sophie Martin"
//                     title="Designer UX/UI"
//                     rating={4.8}
//                     reviews={87}
//                     hourlyRate="5500 FCFA"
//                     imageSrc="/placeholder.svg?height=300&width=300"
//                     isFeatured={true}
//                   />
//                   {/* More designers would be listed here */}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </section>

//         {/* Trending Projects Banners */}
//         {/* <section className="py-12">
//           <div className="container">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
//                 <div className="relative z-10 flex flex-col gap-2">
//                   <Badge className="w-fit bg-white/20 text-white hover:bg-white/30">Tendance 2023</Badge>
//                   <h3 className="text-2xl font-bold">Développement Web & Mobile</h3>
//                   <p className="max-w-xs text-white/80">Trouvez les meilleurs développeurs pour vos projets digitaux</p>
//                   <Button variant="secondary" className="mt-4 w-fit">
//                     Explorer maintenant
//                   </Button>
//                 </div>
//                 <Image
//                   src="/placeholder.svg?height=200&width=200"
//                   alt="Development"
//                   width={200}
//                   height={200}
//                   className="absolute bottom-0 right-0 transition-transform duration-300 group-hover:scale-110"
//                 />
//               </div>
//               <div className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-600 to-amber-400 p-6 text-white">
//                 <div className="relative z-10 flex flex-col gap-2">
//                   <Badge className="w-fit bg-white/20 text-white hover:bg-white/30">Promotion</Badge>
//                   <h3 className="text-2xl font-bold">Design & Création Graphique</h3>
//                   <p className="max-w-xs text-white/80">-20% sur votre première commande de design</p>
//                   <Button variant="secondary" className="mt-4 w-fit">
//                     En profiter
//                   </Button>
//                 </div>
//                 <Image
//                   src="/placeholder.svg?height=200&width=200"
//                   alt="Design"
//                   width={200}
//                   height={200}
//                   className="absolute bottom-0 right-0 transition-transform duration-300 group-hover:scale-110"
//                 />
//               </div>
//             </div>
//           </div>
//         </section> */}

//         {/* Trending Projects */}
//         {/* <section className="py-12">
//           <div className="container">
//             <div className="mb-8 flex items-center justify-between">
//               <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Projets Populaires</h2>
//               <Link href="/projects" className="flex items-center gap-1 text-sm font-medium text-primary">
//                 Voir tous les projets <ChevronRight className="h-4 w-4" />
//               </Link>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <TrendingProjects
//                 title="Création d'un site e-commerce"
//                 category="Développement Web"
//                 budget="150000 FCFA - 300000 FCFA"
//                 proposals={12}
//                 timePosted="Il y a 2 jours"
//                 isUrgent={true}
//               />
//               <TrendingProjects
//                 title="Refonte de l'identité visuelle"
//                 category="Design Graphique"
//                 budget="80000 FCFA - 120000 FCFA"
//                 proposals={8}
//                 timePosted="Il y a 3 jours"
//               />
//               <TrendingProjects
//                 title="Campagne marketing sur les réseaux sociaux"
//                 category="Marketing Digital"
//                 budget="100000 FCFA - 200000 FCFA"
//                 proposals={15}
//                 timePosted="Il y a 1 jour"
//               />
//             </div>
//           </div>
//         </section> */}

//         {/* Testimonials */}
//         {/* <section className="bg-primary/5 py-12">
//           <div className="container">
//             <div className="mb-8 text-center">
//               <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce que disent nos utilisateurs</h2>
//               <p className="mt-2 text-muted-foreground">
//                 Découvrez les témoignages de nos clients et freelances satisfaits
//               </p>
//             </div>

//             <div className="grid gap-6 md:grid-cols-3">
//               <Card className="overflow-visible">
//                 <CardContent className="pt-6">
//                   <div className="relative">
//                     <div className="absolute -top-12 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
//                       <span className="text-xl">"</span>
//                     </div>
//                     <div className="mb-4 flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star key={star} className="h-4 w-4 fill-primary text-primary" />
//                       ))}
//                     </div>
//                     <p className="mb-4 text-sm">
//                       "Okland m'a permis de trouver rapidement des clients de qualité. La plateforme est
//                       intuitive et le système de paiement sécurisé me donne une tranquillité d'esprit."
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <Image
//                         src="/placeholder.svg?height=40&width=40"
//                         alt="User"
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <p className="font-medium">Sophie Martin</p>
//                         <p className="text-xs text-muted-foreground">Designer UX/UI</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="overflow-visible">
//                 <CardContent className="pt-6">
//                   <div className="relative">
//                     <div className="absolute -top-12 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
//                       <span className="text-xl">"</span>
//                     </div>
//                     <div className="mb-4 flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star key={star} className="h-4 w-4 fill-primary text-primary" />
//                       ))}
//                     </div>
//                     <p className="mb-4 text-sm">
//                       "En tant qu'entreprise, nous avons trouvé des freelances exceptionnels pour nos projets. Le
//                       processus de sélection est simple et les talents sont vraiment qualifiés."
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <Image
//                         src="/placeholder.svg?height=40&width=40"
//                         alt="User"
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <p className="font-medium">Jean Dupont</p>
//                         <p className="text-xs text-muted-foreground">Directeur Marketing, TechCorp</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="overflow-visible">
//                 <CardContent className="pt-6">
//                   <div className="relative">
//                     <div className="absolute -top-12 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
//                       <span className="text-xl">"</span>
//                     </div>
//                     <div className="mb-4 flex">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star key={star} className="h-4 w-4 fill-primary text-primary" />
//                       ))}
//                     </div>
//                     <p className="mb-4 text-sm">
//                       "La qualité des projets sur Okland est impressionnante. J'ai pu développer mon portfolio
//                       et augmenter mes revenus de façon significative."
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <Image
//                         src="/placeholder.svg?height=40&width=40"
//                         alt="User"
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <p className="font-medium">Thomas Dubois</p>
//                         <p className="text-xs text-muted-foreground">Développeur Full Stack</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </section> */}

//         {/* CTA Section */}
//         {/* <section className="bg-primary py-12 text-primary-foreground">
//           <div className="container text-center">
//             <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Prêt à commencer votre projet ?</h2>
//             <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
//               Rejoignez des milliers d'entreprises et de freelances qui collaborent chaque jour sur notre plateforme.
//             </p>
//             <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
//               <Button variant="secondary" size="lg" asChild>
//                 <Link href="/post-project">Publier un projet</Link>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
//                 asChild
//               >
//                 <Link href="/search">Trouver un freelance</Link>
//               </Button>
//             </div>
//           </div>
//         </section> */}
//       </div>
//     </div>
//   )
// }

import { Suspense } from "react"
import HomeContent from "@/components/home-content"
import { getFeaturedProviders, getCategories } from "@/services/supabase-service"

export default async function Home() {
  // Fetch data in parallel
  const [categoriesPromise, providersPromise] = await Promise.all([getCategories(), getFeaturedProviders(3)])

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <HomeContent initialCategories={categoriesPromise} initialProviders={providersPromise} />
    </Suspense>
  )
}
