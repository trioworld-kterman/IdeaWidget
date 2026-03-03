import { useState } from 'react'
import type { Idea } from './types'
import { getNetScore, statusLabel } from './utils'

interface IdeaItemProps {
  idea: Idea
  userVote: 'up' | 'down' | null
  canVote: boolean
  onVote: (direction: 'up' | 'down') => Promise<void>
}

export function IdeaItem({ idea, userVote, canVote, onVote }: IdeaItemProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const alreadyVoted = userVote !== null

  async function handleVote(direction: 'up' | 'down') {
    if (!canVote || alreadyVoted || loading) return
    setLoading(true)
    setError(null)
    try {
      await onVote(direction)
    } catch {
      setError('Vote failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="iw-item">
      <div className="iw-item-votes">
        <button
          className={`iw-vote-btn${userVote === 'up' ? ' iw-vote-btn--voted' : ''}`}
          onClick={() => handleVote('up')}
          disabled={!canVote || alreadyVoted || loading}
          aria-label="Vote up"
        >
          ▲ {idea.votesUp}
        </button>
        <span className="iw-net-score">{getNetScore(idea)}</span>
        <button
          className={`iw-vote-btn${userVote === 'down' ? ' iw-vote-btn--voted' : ''}`}
          onClick={() => handleVote('down')}
          disabled={!canVote || alreadyVoted || loading}
          aria-label="Vote down"
        >
          ▼ {idea.votesDown}
        </button>
      </div>
      <div className="iw-item-content">
        <p className="iw-item-title">{idea.title}</p>
        {idea.description && <p className="iw-item-desc">{idea.description}</p>}
        {error && <p className="iw-vote-error">{error}</p>}
      </div>
      <span className={`iw-status-badge iw-status-badge--${idea.status}`}>
        {statusLabel(idea.status)}
      </span>
    </div>
  )
}
