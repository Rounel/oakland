import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

// Types
export type Category = Database["public"]["Tables"]["categories"]["Row"]

export type Provider = Database["public"]["Tables"]["providers"]["Row"] & {
  categories: string[]
}

export type Review = Database["public"]["Tables"]["reviews"]["Row"]

// Categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

// Get categories by main category
export async function getCategoriesByMainCategory(mainCategory: string): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").eq("category", mainCategory).order("name")

  if (error) {
    console.error("Error fetching categories by main category:", error)
    return []
  }

  return data
}

// Get all main categories
export async function getMainCategories(): Promise<string[]> {
  const { data, error } = await supabase.from("categories").select("category").order("category")

  if (error) {
    console.error("Error fetching main categories:", error)
    return []
  }

  // Extract unique main categories
  const uniqueCategories = [...new Set(data.map((item) => item.category))]
  return uniqueCategories
}

// Providers
export async function getProviders(
  options: {
    categorySlug?: string
    mainCategory?: string
    searchQuery?: string
    location?: string
    limit?: number
  } = {},
): Promise<Provider[]> {
  let query = supabase.from("providers").select(`
      *,
      provider_categories!inner (
        category_id,
        categories (
          id,
          slug,
          category
        )
      )
    `)

  // Apply filters
  if (options.categorySlug) {
    query = query.eq("provider_categories.categories.slug", options.categorySlug)
  }

  if (options.mainCategory) {
    query = query.eq("provider_categories.categories.category", options.mainCategory)
  }

  if (options.searchQuery) {
    query = query.or(
      `name.ilike.%${options.searchQuery}%,profession.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`,
    )
  }

  if (options.location) {
    query = query.ilike("location", `%${options.location}%`)
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query.order("rating", { ascending: false })

  if (error) {
    console.error("Error fetching providers:", error)
    return []
  }

  // Process the data to extract categories
  return data.map((item) => {
    const provider = { ...item } as any
    // Extract category slugs
    provider.categories = item.provider_categories.map((pc: any) => pc.categories.slug)
    // Remove the nested provider_categories data
    delete provider.provider_categories
    return provider as Provider
  })
}

export async function getFeaturedProviders(limit = 3): Promise<Provider[]> {
  return getProviders({ limit })
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  const { data, error } = await supabase
    .from("providers")
    .select(`
      *,
      provider_categories (
        categories (
          id,
          slug,
          name,
          category
        )
      )
    `)
    .eq("slug", slug)
    .single()

  if (error || !data) {
    console.error("Error fetching provider:", error)
    return null
  }

  // Process the data to extract categories
  const provider = { ...data } as any
  provider.categories = data.provider_categories.map((pc: any) => pc.categories.slug)
  delete provider.provider_categories

  return provider as Provider
}

// Reviews
export async function getReviewsByProviderId(providerId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("provider_id", providerId)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error)
    return []
  }

  return data
}

// Provider Registration
export async function registerProvider(providerData: any) {
  // First, create the user account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: providerData.email,
    password: providerData.password,
    options: {
      data: {
        full_name: `${providerData.firstName} ${providerData.lastName}`,
      },
    },
  })

  if (authError || !authData.user) {
    console.error("Error creating user:", authError)
    return { error: authError, data: null }
  }

  // Create the provider profile
  const slug = `${providerData.firstName.toLowerCase()}-${providerData.lastName.toLowerCase()}-${Math.floor(Math.random() * 1000)}`

  const { data: newProviderData, error: providerError } = await supabase
    .from("providers")
    .insert({
      name: `${providerData.firstName} ${providerData.lastName}`,
      profession: providerData.profession || providerData.companyName,
      description: providerData.description,
      location: `${providerData.city}, ${providerData.postalCode}`,
      address: providerData.address,
      city: providerData.city,
      postal_code: providerData.postalCode,
      rating: 0,
      slug: slug,
      user_id: authData.user.id,
    })
    .select()
    .single()

  if (providerError) {
    console.error("Error creating provider:", providerError)
    return { error: providerError, data: null }
  }

  // Link provider to category
  if (providerData.category) {
    const { error: categoryError } = await supabase.from("provider_categories").insert({
      provider_id: newProviderData.id,
      category_id: providerData.category,
    })

    if (categoryError) {
      console.error("Error linking category:", categoryError)
    }
  }

  return { error: null, data: newProviderData }
}
