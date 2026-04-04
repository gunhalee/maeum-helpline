import ChatbotBanner from '@/components/chatbot/ChatbotBanner'
import ChatbotFlow from '@/components/chatbot/ChatbotFlow'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="sticky top-0 z-30">
        <ChatbotBanner />
      </div>
      <div className="flex flex-1 justify-center">
        <ChatbotFlow />
      </div>
    </div>
  )
}
