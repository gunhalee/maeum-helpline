import ChatbotFlow from '@/components/chatbot/ChatbotFlow'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex flex-1 items-start justify-center">
        <ChatbotFlow />
      </div>
    </div>
  )
}
