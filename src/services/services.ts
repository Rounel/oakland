import { ProviderProps, ProvidersProps } from "@/types/datatypes";

export const BASE_API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8000/api";
export const MEDIA_API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8000/media/";


export async function login(email: string, password: string) {
    console.log("Tentative login:", email, password)

    const res = await fetch(`${BASE_API_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
  
    if (!res.ok) {
      const error = await res.json()
      console.log("FAIL:", error)
      throw new Error(error.detail || "Erreur d'authentification")
    }
  
    const data = await res.json()
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
    

    console.log("Réponse backend:", data)
    return data
}

export async function registerProvider(formData: any) {
    const res = await fetch(`${BASE_API_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    return res.json();
}

export async function fetchProviderApplications(token: string) {
    const res = await fetch(`${BASE_API_URL}/providers/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
}

export async function validateProvider(id: number, status: 'approved' | 'rejected', token: string) {
    const res = await fetch(`${BASE_API_URL}/providers/${id}/validate/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });
    return res.json();
}

export async function logout() {
    const refresh = localStorage.getItem("refresh_token")
    const access = localStorage.getItem("access_token")
    console.log('REFRESH', refresh)
    console.log('ACCESS', access)
    const res = await fetch(`${BASE_API_URL}/auth/logout/`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify({ refresh })
    });
    if (res.ok) {
        localStorage.setItem("access_token", "")
        localStorage.setItem("refresh_token", "")
    }
    return res;
}

export async function requestPasswordReset(email: string) {
    const res = await fetch(`${BASE_API_URL}/auth/password-reset/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    return res.json();
}

export async function confirmPasswordReset(uid: string, token: string, password: string) {
    const res = await fetch(`${BASE_API_URL}/auth/password-reset/confirm/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, password })
    });
    return res.json();
}

interface SearchParams {
    location?: string;
    min_rating?: number;
    availability?: string;
    categories?: string[];
    lat?: number;
    lng?: number;
    radius?: number;
}

export async function searchProviders(params: SearchParams) {
    const query = new URLSearchParams();

    if (params.location) query.append('location', params.location);
    if (params.min_rating !== undefined) query.append('min_rating', params.min_rating.toString());
    if (params.availability) query.append('availability', params.availability);
    if (params.lat !== undefined) query.append('lat', params.lat.toString());
    if (params.lng !== undefined) query.append('lng', params.lng.toString());
    if (params.radius !== undefined) query.append('radius', params.radius.toString());
    if (params.categories) {
        params.categories.forEach(c => query.append('categories', c));
    }

    const res = await fetch(`${BASE_API_URL}/providers/search/?${query.toString()}`);
    return res.json();
}

export async function getCurrentUser() {
    const access = localStorage.getItem("access_token")
    const res = await fetch(`${BASE_API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    if (!res.ok) throw new Error("Échec de la récupération de l'utilisateur");
    return res.json();
}

export async function getProviderDetail(id: number) {
    const res = await fetch(`${BASE_API_URL}/providers/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Impossible de charger le profil du prestataire")
    }

    return res.json() as Promise<ProvidersProps>
}

export async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append("image", file)
  
    const res = await fetch(`${BASE_API_URL}/upload/`, {
      method: "POST",
      body: formData,
    })
  
    if (!res.ok) {
      throw new Error("Erreur lors de l'upload de l'image")
    }
  
    return res.json() // => { filename, path }
}

export async function getProviderReviews(providerId: number) {
    const res = await fetch(`${BASE_API_URL}/providers/${providerId}/reviews/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        throw new Error("Impossible de charger les avis du prestataire")
    }

    return res.json()
}
  