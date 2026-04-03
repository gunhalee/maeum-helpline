import ServiceGrid from '@/components/ServiceGrid'
import { SITE_DESC, SITE_NAME } from '@/lib/constants'
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
        <h1 className="text-3xl font-semibold md:text-4xl">{SITE_NAME}</h1>
        <p className="mx-auto mt-2 max-w-lg text-base text-stone-500">{SITE_DESC}</p>
      </header>

      <ServiceGrid services={crisisServices} groupByCategory={false} />
    </section>
  )
}
