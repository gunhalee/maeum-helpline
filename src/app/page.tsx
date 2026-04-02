import ServiceGrid from '@/components/ServiceGrid'
import { SITE_DESC, SITE_NAME } from '@/lib/constants'
import { getServices } from '@/lib/notion'

export const revalidate = 3600

export default async function Home() {
  const services = await getServices()

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-12 pt-8">
        <header className="text-center">
          <h1 className="text-3xl font-semibold md:text-4xl">{SITE_NAME}</h1>
          <p className="mx-auto mt-2 max-w-lg text-base text-stone-500">{SITE_DESC}</p>
        </header>

        <ServiceGrid services={services} />
      </section>

      <footer className="border-t border-stone-200 bg-white/70 py-6">
        <div className="mx-auto max-w-5xl px-4 text-sm text-stone-500">
          <p>이 페이지는 공개 정보를 바탕으로 한 비공식 안내 자료입니다.</p>
          <p className="mt-1">
            긴급 위기 시 <span className="font-semibold text-red-600">109</span> 또는 119에
            전화하세요.
          </p>
        </div>
      </footer>
    </>
  )
}
