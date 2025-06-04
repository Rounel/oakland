
import { Suspense } from "react"
import ProviderDetail from "@/components/provider-detail"
import { getProviderDetail } from "@/services/services"

export default async function ProviderPage() {

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ProviderDetail provider={null} reviews={null} />
    </Suspense>
  )
}
