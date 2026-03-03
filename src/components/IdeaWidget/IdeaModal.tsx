import { useState, useEffect } from 'react'
import type { IdeaWidgetProps } from './types'
import { IdeaList } from './IdeaList'
import { IdeaForm } from './IdeaForm'

interface IdeaModalProps {
  title: string
  userId?: string
  onFetchIdeas: IdeaWidgetProps['onFetchIdeas']
  onSubmitIdea: IdeaWidgetProps['onSubmitIdea']
  onVote: IdeaWidgetProps['onVote']
  onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes']
  onClose: () => void
}

export function IdeaModal({
  title,
  userId,
  onFetchIdeas,
  onSubmitIdea,
  onVote,
  onFetchUserVotes,
  onClose,
}: IdeaModalProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'submit'>('list')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div className="iw-overlay" onClick={onClose} />
      <div className="iw-modal" role="dialog" aria-modal="true" aria-labelledby="iw-modal-title">
        <div className="iw-modal-header">
          <h2 id="iw-modal-title">{title}</h2>
          <button className="iw-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="iw-tabs">
          <button
            className={`iw-tab${activeTab === 'list' ? ' iw-tab--active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Ideas
          </button>
          <button
            className={`iw-tab${activeTab === 'submit' ? ' iw-tab--active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            + Submit
          </button>
        </div>
        <div className="iw-modal-body">
          {activeTab === 'list' ? (
            <IdeaList
              userId={userId}
              onFetchIdeas={onFetchIdeas}
              onVote={onVote}
              onFetchUserVotes={onFetchUserVotes}
            />
          ) : (
            <IdeaForm
              onSubmit={onSubmitIdea}
              onSuccess={() => setActiveTab('list')}
            />
          )}
        </div>
      </div>
    </>
  )
}
