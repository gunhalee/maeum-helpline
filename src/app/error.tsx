'use client'

interface Props {
  reset: () => void
}

export default function Error({ reset }: Props) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-stone-800">
        서비스 정보를 불러오는 중 문제가 발생했습니다.
      </h1>
      <p className="mt-2 text-stone-500">잠시 후 다시 시도해주세요.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-green-700 px-5 py-2 text-white hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
      >
        새로고침
      </button>
    </main>
  )
}
