import DashboardContent from '@/components/dashboard/DashboardContent'
import { getUserRoadmaps, getRoadmapStats } from '@/lib/db/roadmaps'
import { hasApiKey } from '@/lib/db/api-keys'
import { getCurrentUser } from '@/lib/db/users'

export default async function DashboardPage() {
  // Load real data from database
  const user = await getCurrentUser()
  const hasOpenAiKey = user ? await hasApiKey('openai') : false
  const roadmaps = user ? await getUserRoadmaps() : []
  const stats = user ? await getRoadmapStats() : {
    total: 0,
    notStarted: 0,
    inProgress: 0,
    completed: 0,
    paused: 0
  }

  return <DashboardContent roadmaps={roadmaps} hasApiKey={hasOpenAiKey} stats={stats} />
}
