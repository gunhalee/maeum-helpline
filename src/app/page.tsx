import { Suspense } from 'react'
import ChatbotFlow from '@/components/chatbot/ChatbotFlow'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex flex-1 items-start justify-center">
        <Suspense fallback={<div className="mx-auto w-full max-w-[460px] px-4 pt-10 pb-8 md:max-w-[620px] md:px-6 md:pt-14 lg:max-w-[700px] lg:pt-18" />}>
          <ChatbotFlow />
        </Suspense>
      </div>
    </div>
  )
}
