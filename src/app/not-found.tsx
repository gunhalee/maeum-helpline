import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold text-stone-800">404</h1>
      <p className="mt-2 text-stone-500">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link
        href="/ko"
        className="mt-6 rounded-full bg-green-700 px-5 py-2 text-white hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
      >
        홈으로 돌아가기
      </Link>
    </main>
  )
}
