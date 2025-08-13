export interface CategoriesProps {
    id: number;
    name: string;
    category: string;
    path: string;
    img?: string;
}

export interface LocalizedCategoriesProps {
    id: number;
    name: {
        fr: string;
        en: string;
    };
    category: {
        fr: string;
        en: string;
    };
    path: string;
    img?: string;
}

// Base categories with French names (original)
const baseCategories: LocalizedCategoriesProps[] = [
    { id: 1, name: { fr: "Maçon", en: "Mason" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/maçon.jpg" },
    { id: 2, name: { fr: "Plombier", en: "Plumber" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/plombier.jpg" },
    { id: 3, name: { fr: "Électricien", en: "Electrician" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/elect2.jpeg" },
    { id: 4, name: { fr: "Peintre en bâtiment", en: "Building Painter" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/peintre.jpeg" },
    { id: 5, name: { fr: "Carreleur", en: "Tiler" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/carreleur.jpg" },
    { id: 6, name: { fr: "Couvreur", en: "Roofer" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/menuisier.jpeg" },
    { id: 7, name: { fr: "Menuisier", en: "Carpenter" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search", img: "/jobs/menuisier.jpeg" },
    { id: 8, name: { fr: "Serrurier", en: "Locksmith" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search", img: "/jobs/serrurier.jpeg" },
    { id: 9, name: { fr: "Plaquiste", en: "Drywall Installer" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/plaquiste.jpeg" },
    { id: 10, name: { fr: "Charpentier", en: "Carpenter" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search", img: "/jobs/charpentier.jpeg" },
    { id: 11, name: { fr: "Vitrier", en: "Glazier" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 12, name: { fr: "Façadier", en: "Facade Specialist" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 13, name: { fr: "Chauffagiste", en: "Heating Technician" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 14, name: { fr: "Technicien en climatisation", en: "Air Conditioning Technician" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 15, name: { fr: "Parqueteur", en: "Parquet Installer" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 16, name: { fr: "Installateur de panneaux solaires", en: "Solar Panel Installer" }, category: { fr: "Énergie", en: "Energy" }, path: "/search", img: "/jobs/idps.jpeg" },
    { id: 17, name: { fr: "Ébéniste", en: "Cabinetmaker" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search", img: "/jobs/ebeniste.jpeg" },
    { id: 18, name: { fr: "Sculpteur sur bois", en: "Wood Sculptor" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 19, name: { fr: "Tourneur sur bois", en: "Wood Turner" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 20, name: { fr: "Restaurateur de meubles", en: "Furniture Restorer" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 21, name: { fr: "Luthier", en: "Luthier" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 22, name: { fr: "Marqueteur", en: "Marquetry Specialist" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 23, name: { fr: "Tapissier", en: "Upholsterer" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search", img: "/jobs/tapissier.jpeg" },
    { id: 24, name: { fr: "Mécanicien auto/moto", en: "Auto/Motorcycle Mechanic" }, category: { fr: "Automobile", en: "Automotive" }, path: "/search" },
    { id: 25, name: { fr: "Soudeur", en: "Welder" }, category: { fr: "Métallurgie", en: "Metallurgy" }, path: "/search" },
    { id: 26, name: { fr: "Ferronnier", en: "Blacksmith" }, category: { fr: "Métallurgie", en: "Metallurgy" }, path: "/search", img: "/jobs/ferronier.jpeg" },
    { id: 27, name: { fr: "Forgeron", en: "Blacksmith" }, category: { fr: "Métallurgie", en: "Metallurgy" }, path: "/search" },
    { id: 28, name: { fr: "Métallier", en: "Metalworker" }, category: { fr: "Métallurgie", en: "Metallurgy" }, path: "/search" },
    { id: 29, name: { fr: "Chaudronnier", en: "Boilermaker" }, category: { fr: "Métallurgie", en: "Metallurgy" }, path: "/search" },
    { id: 30, name: { fr: "Technicien de maintenance", en: "Maintenance Technician" }, category: { fr: "Technique", en: "Technical" }, path: "/search" },
    { id: 31, name: { fr: "Femme/Homme de ménage", en: "Housekeeper" }, category: { fr: "Services à domicile", en: "Home Services" }, path: "/search", img: "/jobs/menage.jpeg" },
    { id: 32, name: { fr: "Jardinier/Paysagiste", en: "Gardener/Landscaper" }, category: { fr: "Services extérieurs", en: "Outdoor Services" }, path: "/search", img: "/jobs/jardinier.jpeg" },
    { id: 33, name: { fr: "Agent de sécurité", en: "Security Guard" }, category: { fr: "Sécurité", en: "Security" }, path: "/search", img: "/jobs/securite.jpeg" },
    { id: 34, name: { fr: "Garde d'enfant", en: "Childcare Provider" }, category: { fr: "Services à domicile", en: "Home Services" }, path: "/search", img: "/jobs/gardeenfant.jpeg" },
    { id: 35, name: { fr: "Cuisinier à domicile", en: "Home Chef" }, category: { fr: "Services à domicile", en: "Home Services" }, path: "/search", img: "/jobs/chef.jpeg" },
    { id: 36, name: { fr: "Repassage / Blanchisserie", en: "Ironing / Laundry" }, category: { fr: "Services à domicile", en: "Home Services" }, path: "/search" },
    { id: 37, name: { fr: "Déménageur", en: "Mover" }, category: { fr: "Logistique", en: "Logistics" }, path: "/search" },
    { id: 38, name: { fr: "Concierge", en: "Concierge" }, category: { fr: "Services", en: "Services" }, path: "/search" },
    { id: 39, name: { fr: "Conducteur d'engins", en: "Heavy Equipment Operator" }, category: { fr: "Transport / BTP", en: "Transport / Construction" }, path: "/search" },
    { id: 40, name: { fr: "Ouvrier polyvalent", en: "General Laborer" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 41, name: { fr: "Terrassier", en: "Excavator" }, category: { fr: "Bâtiment", en: "Construction" }, path: "/search" },
    { id: 42, name: { fr: "Manutentionnaire", en: "Material Handler" }, category: { fr: "Logistique", en: "Logistics" }, path: "/search" },
    { id: 43, name: { fr: "Monteur échafaudages", en: "Scaffolding Erector" }, category: { fr: "BTP", en: "Construction" }, path: "/search" },
    { id: 44, name: { fr: "Décorateur d'intérieur", en: "Interior Decorator" }, category: { fr: "Design / Art", en: "Design / Art" }, path: "/search" },
    { id: 45, name: { fr: "Staffeur ornemaniste", en: "Ornamental Plasterer" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 46, name: { fr: "Peintre décorateur", en: "Decorative Painter" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 47, name: { fr: "Poseur de papier peint", en: "Wallpaper Installer" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" },
    { id: 48, name: { fr: "Miroitier", en: "Mirror Specialist" }, category: { fr: "Artisanat", en: "Craftsmanship" }, path: "/search" }
];

// Function to get localized categories
export function getLocalizedCategories(language: 'fr' | 'en'): CategoriesProps[] {
    return baseCategories.map(cat => ({
        id: cat.id,
        name: cat.name[language],
        category: cat.category[language],
        path: cat.path,
        img: cat.img
    })).sort((a, b) =>
        a.name.localeCompare(b.name, language === 'fr' ? 'fr' : 'en', { sensitivity: 'base' })
    );
}

// Legacy export for backward compatibility (English by default)
export const categories: CategoriesProps[] = getLocalizedCategories('en');