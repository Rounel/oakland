export interface ServiceProps {
    id: number
    name: string
    description: string
    price: number
    duration: string
    provider: number
    created_at: string
    updated_at: string
  }
  
export interface GalleryImageProps {
    id: number
    image: string
    description?: string
    provider: number
    created_at: string
    updated_at: string
}
  
export interface SocialMediaProps {
    id: number
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    provider: number
    created_at: string
    updated_at: string
}
  
export interface ScheduleProps {
    id: number
    day: string
    opening_time: string
    closing_time: string
    is_closed: boolean
    provider: number
    created_at: string
    updated_at: string
}
  
export interface ProviderInfoProps {
    id: number
    company_name: string
    description: string
    category: string
    address: string
    city: string
    postal_code: string
    latitude: number
    longitude: number
    website: string
    status: 'pending' | 'approved' | 'rejected'
    rating: number
}
  
export interface ProviderProps {
    id: number
    email: string
    username: string
    first_name: string
    last_name: string
    phone: string
    profile_photo?: string
    is_provider: boolean
    is_validated: boolean
    created_at: string
    updated_at: string
    gallery: GalleryImageProps[]
    services: ServiceProps[]
    schedules: ScheduleProps[]
    social_media: SocialMediaProps
    provider_info: ProviderInfoProps
    category?: string
    company_name?: string
    description?: string
    address?: string
    city?: string
    postal_code?: string
    latitude?: number
    longitude?: number
    website?: string
    status?: 'pending' | 'approved' | 'rejected'
    rating?: number
    reviews: ReviewProps[] | null
}
  
export interface ProvidersProps {
    id: number
    created_at: string
    updated_at: string
    user: {
        id: number
        created_at: string
        updated_at: string
        email: string
        username: string
        first_name: string
        last_name: string
        phone: string
        profile_photo?: string
        is_provider: boolean
        is_validated: boolean
        gallery: GalleryImageProps[]
        services: ServiceProps[]
        schedules: ScheduleProps[]
        social_media: SocialMediaProps
        provider_info: ProviderInfoProps
    }
    email: string
    username: string
    first_name: string
    last_name: string
    phone: string
    profile_photo?: string
    is_provider: boolean
    is_validated: boolean
    gallery: GalleryImageProps[]
    services: ServiceProps[]
    schedules: ScheduleProps[]
    social_media: SocialMediaProps
    provider_info: ProviderInfoProps
    category?: string
    company_name?: string
    description?: string
    address?: string
    city?: string
    postal_code?: string
    latitude?: number
    longitude?: number
    website?: string
    status?: 'pending' | 'approved' | 'rejected'
    rating?: number
    reviews: ReviewProps[] | null
}
  
export interface ReviewProps {
    id: number
    provider: number
    name: string
    rating: number
    comment: string
    created_at: string
}
  
export interface ProviderDetailProps {
    provider: ProvidersProps | null
    reviews: ReviewProps[] | null
}
