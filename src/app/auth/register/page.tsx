import { Suspense } from "react"
import ProviderRegistrationForm from "@/components/provider-registration-form"

export default async function ProviderRegistrationPage() {

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ProviderRegistrationForm  />
    </Suspense>
  )
}
