interface CategoriesProps {
    id:number;
    name:string;
    category:string;
    path:string;
    img?:string;
}

export const categories: CategoriesProps[] = [
    { id: 1, name: "Maçon", category: "Bâtiment", path: "/search", img: "/jobs/maçon.jpg" },
    { id: 2, name: "Plombier", category: "Bâtiment", path: "/search", img: "/jobs/plombier.jpg" },
    { id: 3, name: "Électricien", category: "Bâtiment", path: "/search", img: "/jobs/elect2.jpeg" },
    { id: 4, name: "Peintre en bâtiment", category: "Bâtiment", path: "/search", img: "/jobs/peintre.jpeg" },
    { id: 5, name: "Carreleur", category: "Bâtiment", path: "/search", img: "/jobs/carreleur.jpg" },
    { id: 6, name: "Couvreur", category: "Bâtiment", path: "/search", img: "/jobs/menuisier.jpeg" },
    { id: 7, name: "Menuisier", category: "Artisanat", path: "/search", img: "/jobs/menuisier.jpeg" },
    { id: 8, name: "Serrurier", category: "Artisanat", path: "/search", img: "/jobs/serrurier.jpeg" },
    { id: 9, name: "Plaquiste", category: "Bâtiment", path: "/search", img: "/jobs/plaquiste.jpeg" },
    { id: 10, name: "Charpentier", category: "Bâtiment", path: "/search", img: "/jobs/charpentier.jpeg" },
    { id: 11, name: "Vitrier", category: "Bâtiment", path: "/search" },
    { id: 12, name: "Façadier", category: "Bâtiment", path: "/search" },
    { id: 13, name: "Chauffagiste", category: "Bâtiment", path: "/search" },
    { id: 14, name: "Technicien en climatisation", category: "Bâtiment", path: "/search" },
    { id: 15, name: "Parqueteur", category: "Bâtiment", path: "/search" },
    { id: 16, name: "Installateur de panneaux solaires", category: "Énergie", path: "/search", img: "/jobs/idps.jpeg" },
    { id: 17, name: "Ébéniste", category: "Artisanat", path: "/search", img: "/jobs/ebeniste.jpeg" },
    { id: 18, name: "Sculpteur sur bois", category: "Artisanat", path: "/search" },
    { id: 19, name: "Tourneur sur bois", category: "Artisanat", path: "/search" },
    { id: 20, name: "Restaurateur de meubles", category: "Artisanat", path: "/search" },
    { id: 21, name: "Luthier", category: "Artisanat", path: "/search" },
    { id: 22, name: "Marqueteur", category: "Artisanat", path: "/search" },
    { id: 23, name: "Tapissier", category: "Artisanat", path: "/search", img: "/jobs/tapissier.jpeg" },
    { id: 24, name: "Mécanicien auto/moto", category: "Automobile", path: "/search" },
    { id: 25, name: "Soudeur", category: "Métallurgie", path: "/search" },
    { id: 26, name: "Ferronnier", category: "Métallurgie", path: "/search", img: "/jobs/ferronier.jpeg" },
    { id: 27, name: "Forgeron", category: "Métallurgie", path: "/search" },
    { id: 28, name: "Métallier", category: "Métallurgie", path: "/search" },
    { id: 29, name: "Chaudronnier", category: "Métallurgie", path: "/search" },
    { id: 30, name: "Technicien de maintenance", category: "Technique", path: "/search" },
    { id: 31, name: "Femme/Homme de ménage", category: "Services à domicile", path: "/search", img: "/jobs/menage.jpeg" },
    { id: 32, name: "Jardinier/Paysagiste", category: "Services extérieurs", path: "/search", img: "/jobs/jardinier.jpeg" },
    { id: 33, name: "Agent de sécurité", category: "Sécurité", path: "/search", img: "/jobs/securite.jpeg" },
    { id: 34, name: "Garde d’enfant", category: "Services à domicile", path: "/search", img: "/jobs/gardeenfant.jpeg" },
    { id: 35, name: "Cuisinier à domicile", category: "Services à domicile", path: "/search", img: "/jobs/chef.jpeg" },
    { id: 36, name: "Repassage / Blanchisserie", category: "Services à domicile", path: "/search" },
    { id: 37, name: "Déménageur", category: "Logistique", path: "/search" },
    { id: 38, name: "Concierge", category: "Services", path: "/search" },
    { id: 39, name: "Conducteur d’engins", category: "Transport / BTP", path: "/search" },
    { id: 40, name: "Ouvrier polyvalent", category: "Bâtiment", path: "/search" },
    { id: 41, name: "Terrassier", category: "Bâtiment", path: "/search" },
    { id: 42, name: "Manutentionnaire", category: "Logistique", path: "/search" },
    { id: 43, name: "Monteur échafaudages", category: "BTP", path: "/search" },
    { id: 44, name: "Décorateur d’intérieur", category: "Design / Art", path: "/search" },
    { id: 45, name: "Staffeur ornemaniste", category: "Artisanat", path: "/search" },
    { id: 46, name: "Peintre décorateur", category: "Artisanat", path: "/search" },
    { id: 47, name: "Poseur de papier peint", category: "Artisanat", path: "/search" },
    { id: 48, name: "Miroitier", category: "Artisanat", path: "/search" }
  ].sort((a, b) =>
    a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' })
  );