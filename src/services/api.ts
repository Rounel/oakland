const API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8000/api";

const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// Service d'authentification
export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email: email, password: password }),
    });

    if (!response.ok) {
      throw new Error('Erreur de connexion');
    }

    const data = await response.json();
    if (data.access) {
      localStorage.setItem('token', data.access);
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/users/me/`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données utilisateur');
    }

    return response.json();
  },
};

// Service des prestataires
export const providerService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/providers/`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des prestataires');
    }

    return response.json();
  },

  getPending: async () => {
    const response = await fetch(`${API_URL}/admin/providers/`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des prestataires en attente');
    }

    return response.json();
  },

  validate: async (id: number, status: 'approved' | 'rejected') => {
    const response = await fetch(`${API_URL}/admin/providers/${id}/validate/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la validation du prestataire');
    }

    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/providers/${id}/delete/`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du prestataire');
    }

    return response.json();
  },

  getStats: async () => {
    const response = await fetch(`${API_URL}/admin/providers/stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des statistiques")
    }

    return response.json()
  },
};

// Service des demandes de contact
export const contactRequestService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/admin/contact-requests/`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des demandes de contact');
    }

    return response.json();
  },

  updateStatus: async (id: number, status: string) => {
    const response = await fetch(`${API_URL}/admin/contact-requests/${id}/update-status/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du statut');
    }

    return response.json();
  },
};

export const requestService = {
  getRequests: async () => {
    const response = await fetch(`${API_URL}/admin/requests/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des demandes")
    }

    return response.json()
  },

  getRequestStats: async () => {
    const response = await fetch(`${API_URL}/admin/requests/stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des statistiques")
    }

    return response.json()
  },

  validateRequest: async (id: number, status: "approved" | "rejected") => {
    const response = await fetch(`${API_URL}/admin/requests/${id}/validate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la validation de la demande")
    }

    return response.json()
  },

  deleteRequest: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/requests/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la demande")
    }
  },
}

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  description: string;
  preferred_date?: string;
  budget?: number;
}

interface ContactStatus {
  status: 'pending' | 'accepted' | 'rejected';
  can_view_contact: boolean;
}

interface VisitorContact {
  id: number;
  provider: {
    id: number;
    company_name: string;
    user: {
      email: string;
      phone: string;
    };
  };
  name: string;
  email: string;
  phone: string;
  message: string;
  visitor_ip: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface ContactsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: VisitorContact[];
}

interface ContactStats {
  total_contacts: number;
  pending_contacts: number;
  accepted_contacts: number;
  rejected_contacts: number;
  monthly_growth: number;
  acceptance_rate: number;
}

export const contactService = {
  sendMessage: async (providerId: number, data: ContactMessage) => {
    const response = await fetch(`${API_URL}/visitor-contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider: providerId,
        ...data
      }),
    })
    return response.json()
  },

  checkStatus: async (providerId: number): Promise<ContactStatus> => {
    const response = await fetch(`${API_URL}/visitor-contacts/check_provider_status/${providerId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Failed to check status')
    }
    return response.json()
  },

  requestQuote: async (providerId: number, data: QuoteRequest) => {
    const response = await fetch(`${API_URL}/visitor-contacts/${providerId}/quote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to request quote')
    }
    return response.json()
  },

  // Admin methods
  getContacts: async (): Promise<ContactsResponse> => {
    const response = await fetch(`${API_URL}/admin/visitor-contacts/`, {
      headers: getHeaders(),
    })
    if (!response.ok) {
      throw new Error('Failed to fetch contacts')
    }
    return response.json()
  },

  getContactStats: async (): Promise<ContactStats> => {
    const response = await fetch(`${API_URL}/admin/visitor-contacts/stats/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch contact stats')
    }
    return response.json()
  },

  acceptContact: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/visitor-contacts/${id}/accept/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to accept contact')
    }
    return response.json()
  },

  rejectContact: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/visitor-contacts/${id}/reject/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to reject contact')
    }
    return response.json()
  },

  deleteContact: async (id: number) => {
    const response = await fetch(`${API_URL}/admin/visitor-contacts/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to delete contact')
    }
  },
} 