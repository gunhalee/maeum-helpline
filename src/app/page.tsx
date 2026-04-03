import ServiceGrid from '@/components/ServiceGrid'
import { getServices } from '@/lib/notion'

export const revalidate = 3600

export default async function Home() {
  const services = await getServices()
  const crisisServices = services.filter((service) =>
    service.category.includes('crisis')
  )

  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 pt-8">
      <header className="text-center">
        <h1 className="text-3xl font-semibold md:text-4xl">위기·긴급 상담</h1>
      </header>

      <ServiceGrid services={crisisServices} groupByCategory={false} />
    </section>
  )
}
