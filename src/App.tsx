import { IdeaWidget } from './components/IdeaWidget'
import type { Idea } from './components/IdeaWidget'

// In-memory mock — replace with real Firebase calls when integrating
let mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'Dark mode',
    description: 'Add a dark/light toggle to the header',
    votesUp: 8,
    votesDown: 1,
    status: 'planned',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Export to CSV',
    votesUp: 5,
    votesDown: 0,
    status: 'open',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Mobile app',
    description: 'Native iOS/Android client',
    votesUp: 3,
    votesDown: 2,
    status: 'open',
    createdAt: new Date(),
  },
]

const mockVotes: Record<string, 'up' | 'down'> = {}
let nextId = 4

export default function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>IdeaWidget Demo</h1>
      <p>Click the 💡 button in the bottom-right corner.</p>
      <IdeaWidget
        userId="demo-user-1"
        isAdmin
        onFetchIdeas={async () => [...mockIdeas]}
        onSubmitIdea={async ({ title, description }) => {
          const idea: Idea = {
            id: String(nextId++),
            title,
            description,
            votesUp: 0,
            votesDown: 0,
            status: 'open',
            createdAt: new Date(),
          }
          mockIdeas = [idea, ...mockIdeas]
        }}
        onVote={async (ideaId, direction) => {
          mockIdeas = mockIdeas.map(i =>
            i.id === ideaId
              ? {
                  ...i,
                  votesUp: direction === 'up' ? i.votesUp + 1 : i.votesUp,
                  votesDown: direction === 'down' ? i.votesDown + 1 : i.votesDown,
                }
              : i
          )
          mockVotes[ideaId] = direction
        }}
        onFetchUserVotes={async () => ({ ...mockVotes })}
        onChangeStatus={async (ideaId, status) => {
          mockIdeas = mockIdeas.map(i => i.id === ideaId ? { ...i, status } : i)
        }}
        onDeleteIdea={async (ideaId) => {
          mockIdeas = mockIdeas.filter(i => i.id !== ideaId)
        }}
      />
    </div>
  )
}
