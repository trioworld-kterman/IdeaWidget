import { useState, useEffect, useCallback } from 'react'
import type { Idea, IdeaWidgetProps } from './types'
import { IdeaItem } from './IdeaItem'
import { sortByScore } from './utils'

type StatusFilter = Idea['status'] | 'all'

interface IdeaListPanelProps {
  userId?: string
  isAdmin: boolean
  onFetchIdeas: IdeaWidgetProps['onFetchIdeas']
  onVote: IdeaWidgetProps['onVote']
  onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes']
  onChangeStatus: IdeaWidgetProps['onChangeStatus']
  onDeleteIdea: IdeaWidgetProps['onDeleteIdea']
  refreshToken?: number
}

const statusFilters: Array<{ value: StatusFilter; label: string }> = [
  { value: 'open', label: 'Open' },
  { value: 'planned', label: 'Planned' },
  { value: 'done', label: 'Done' },
  { value: 'all', label: 'All' },
]

export function IdeaListPanel({
  userId,
  isAdmin,
  onFetchIdeas,
  onVote,
  onFetchUserVotes,
  onChangeStatus,
  onDeleteIdea,
  refreshToken = 0,
}: IdeaListPanelProps) {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('open')

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

  useEffect(() => {
    load()
  }, [load, refreshToken])

  async function handleVote(ideaId: string, direction: 'up' | 'down') {
    if (!userId || !onVote) return

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
      setUserVotes(prevVotes)
      setIdeas(prevIdeas)
    }
  }

  async function handleChangeStatus(ideaId: string, status: Idea['status']) {
    if (!onChangeStatus) return
    await onChangeStatus(ideaId, status)
    setIdeas(prev => prev.map(i => (i.id === ideaId ? { ...i, status } : i)))
  }

  async function handleDelete(ideaId: string) {
    if (!onDeleteIdea) return
    await onDeleteIdea(ideaId)
    setIdeas(prev => prev.filter(i => i.id !== ideaId))
  }

  const canVote = !!(userId && onVote)
  const counts = {
    open: ideas.filter(idea => idea.status === 'open').length,
    planned: ideas.filter(idea => idea.status === 'planned').length,
    done: ideas.filter(idea => idea.status === 'done').length,
    all: ideas.length,
  }
  const filteredIdeas = sortByScore(
    activeFilter === 'all'
      ? ideas
      : ideas.filter(idea => idea.status === activeFilter)
  )

  if (loading) return <div className="iw-spinner">Loading ideas...</div>
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
    <>
      <div className="iw-status-filters" aria-label="Filter ideas by status">
        {statusFilters.map(filter => (
          <button
            key={filter.value}
            type="button"
            className={`iw-status-filter${activeFilter === filter.value ? ' iw-status-filter--active' : ''}`}
            onClick={() => setActiveFilter(filter.value)}
            aria-pressed={activeFilter === filter.value}
          >
            {filter.label} ({counts[filter.value]})
          </button>
        ))}
      </div>
      {filteredIdeas.length === 0 ? (
        <p className="iw-empty">
          {activeFilter === 'all' ? 'No ideas to show.' : `No ${activeFilter} ideas.`}
        </p>
      ) : (
        <div className="iw-list">
          {filteredIdeas.map(idea => (
            <IdeaItem
              key={idea.id}
              idea={idea}
              userVote={userVotes[idea.id] ?? null}
              canVote={canVote}
              isAdmin={isAdmin}
              onVote={direction => handleVote(idea.id, direction)}
              onChangeStatus={status => handleChangeStatus(idea.id, status)}
              onDelete={() => handleDelete(idea.id)}
            />
          ))}
        </div>
      )}
    </>
  )
}
