import { useState, useEffect, useCallback } from 'react'
import type { Idea, IdeaWidgetProps } from './types'
import { IdeaItem } from './IdeaItem'
import { sortByScore } from './utils'

interface IdeaListProps {
  userId?: string
  onFetchIdeas: IdeaWidgetProps['onFetchIdeas']
  onVote: IdeaWidgetProps['onVote']
  onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes']
}

export function IdeaList({ userId, onFetchIdeas, onVote, onFetchUserVotes }: IdeaListProps) {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const votesPromise =
        userId && onFetchUserVotes
          ? onFetchUserVotes(userId)
          : Promise.resolve({} as Record<string, 'up' | 'down'>)
      const [fetchedIdeas, fetchedVotes] = await Promise.all([onFetchIdeas(), votesPromise])
      setIdeas(fetchedIdeas)
      setUserVotes(fetchedVotes)
    } catch {
      setError('Failed to load ideas.')
    } finally {
      setLoading(false)
    }
  }, [userId, onFetchIdeas, onFetchUserVotes])

  useEffect(() => { load() }, [load])

  async function handleVote(ideaId: string, direction: 'up' | 'down') {
    if (!userId || !onVote) return

    // Optimistic update — apply immediately, revert on failure
    const prevVotes = userVotes
    const prevIdeas = ideas
    setUserVotes(prev => ({ ...prev, [ideaId]: direction }))
    setIdeas(prev =>
      prev.map(i =>
        i.id === ideaId
          ? {
              ...i,
              votesUp: direction === 'up' ? i.votesUp + 1 : i.votesUp,
              votesDown: direction === 'down' ? i.votesDown + 1 : i.votesDown,
            }
          : i
      )
    )

    try {
      await onVote(ideaId, direction, userId)
    } catch {
      // Revert on failure — IdeaItem will show its own error message
      setUserVotes(prevVotes)
      setIdeas(prevIdeas)
    }
  }

  const canVote = !!(userId && onVote)

  if (loading) return <div className="iw-spinner">Loading ideas…</div>
  if (error) {
    return (
      <div className="iw-fetch-error">
        <span>{error}</span>
        <button className="iw-retry-btn" onClick={load}>Retry</button>
      </div>
    )
  }
  if (ideas.length === 0) return <p className="iw-empty">No ideas yet. Be the first!</p>

  return (
    <div className="iw-list">
      {sortByScore(ideas).map(idea => (
        <IdeaItem
          key={idea.id}
          idea={idea}
          userVote={userVotes[idea.id] ?? null}
          canVote={canVote}
          onVote={direction => handleVote(idea.id, direction)}
        />
      ))}
    </div>
  )
}
