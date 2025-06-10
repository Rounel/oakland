
import { Suspense } from "react"
import MeDetail from "@/components/me-detail"

export default async function ProviderPage() {

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <MeDetail />
    </Suspense>
  )
}
