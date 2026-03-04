import { useState, useEffect } from 'react'
import type { Idea } from './types'
import { getNetScore, statusLabel } from './utils'

interface IdeaItemProps {
  idea: Idea
  userVote: 'up' | 'down' | null
  canVote: boolean
  isAdmin: boolean
  onVote: (direction: 'up' | 'down') => Promise<void>
  onChangeStatus?: (status: Idea['status']) => Promise<void>
  onDelete?: () => Promise<void>
}

export function IdeaItem({ idea, userVote, canVote, isAdmin, onVote, onChangeStatus, onDelete }: IdeaItemProps) {
  const [voteLoading, setVoteLoading] = useState(false)
  const [voteError, setVoteError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  const alreadyVoted = userVote !== null

  // Auto-cancel delete confirm after 3s
  useEffect(() => {
    if (!confirmDelete) return
    const t = setTimeout(() => setConfirmDelete(false), 3000)
    return () => clearTimeout(t)
  }, [confirmDelete])

  async function handleVote(direction: 'up' | 'down') {
    if (!canVote || alreadyVoted || voteLoading) return
    setVoteLoading(true)
    setVoteError(null)
    try {
      await onVote(direction)
    } catch {
      setVoteError('Vote failed. Try again.')
    } finally {
      setVoteLoading(false)
    }
  }

  async function handleStatusChange(status: Idea['status']) {
    if (!onChangeStatus) return
    setStatusLoading(true)
    try {
      await onChangeStatus(status)
    } finally {
      setStatusLoading(false)
    }
  }

  async function handleDelete() {
    if (!onDelete) return
    setDeleteLoading(true)
    try {
      await onDelete()
    } finally {
      setDeleteLoading(false)
      setConfirmDelete(false)
    }
  }

  return (
    <div className="iw-item">
      <div className="iw-item-votes">
        <button
          className={`iw-vote-btn${userVote === 'up' ? ' iw-vote-btn--voted' : ''}`}
          onClick={() => handleVote('up')}
          disabled={!canVote || alreadyVoted || voteLoading}
          aria-label="Vote up"
        >
          ▲ {idea.votesUp}
        </button>
        <span className="iw-net-score">{getNetScore(idea)}</span>
        <button
          className={`iw-vote-btn${userVote === 'down' ? ' iw-vote-btn--voted' : ''}`}
          onClick={() => handleVote('down')}
          disabled={!canVote || alreadyVoted || voteLoading}
          aria-label="Vote down"
        >
          ▼ {idea.votesDown}
        </button>
      </div>
      <div className="iw-item-content">
        <p className="iw-item-title">{idea.title}</p>
        {idea.description && <p className="iw-item-desc">{idea.description}</p>}
        {voteError && <p className="iw-vote-error">{voteError}</p>}
      </div>
      {isAdmin ? (
        <div className="iw-admin-controls">
          <select
            className={`iw-status-select iw-status-select--${idea.status}`}
            value={idea.status}
            onChange={e => handleStatusChange(e.target.value as Idea['status'])}
            disabled={statusLoading}
            aria-label="Change status"
          >
            <option value="open">Open</option>
            <option value="planned">Planned</option>
            <option value="done">Done</option>
          </select>
          {confirmDelete ? (
            <button className="iw-delete-confirm-btn" onClick={handleDelete} disabled={deleteLoading}>
              Sure?
            </button>
          ) : (
            <button className="iw-delete-btn" onClick={() => setConfirmDelete(true)} aria-label="Delete idea">
              🗑
            </button>
          )}
        </div>
      ) : (
        <span className={`iw-status-badge iw-status-badge--${idea.status}`}>
          {statusLabel(idea.status)}
        </span>
      )}
    </div>
  )
}
