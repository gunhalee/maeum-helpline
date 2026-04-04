import ChatbotBanner from '@/components/chatbot/ChatbotBanner'
import ChatbotFlow from '@/components/chatbot/ChatbotFlow'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="sticky top-0 z-30">
        <ChatbotBanner />
      </div>
      <div className="flex flex-1 items-start justify-center">
        <ChatbotFlow />
      </div>
    </div>
  )
}
