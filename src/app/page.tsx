import ChatbotBanner from '@/components/chatbot/ChatbotBanner'
import ChatbotFlow from '@/components/chatbot/ChatbotFlow'
import { getFixedBannerOrgs } from '@/lib/helpline-notion'

export const revalidate = 3600

export default async function Home() {
  const fixedOrgs = await getFixedBannerOrgs()

  return (
    <div className="flex min-h-[calc(100vh-44px)] flex-col">
      <div className="sticky top-[44px] z-30">
        <ChatbotBanner orgs={fixedOrgs} />
      </div>
      <div className="flex flex-1 justify-center">
        <ChatbotFlow />
      </div>
    </div>
  )
}
