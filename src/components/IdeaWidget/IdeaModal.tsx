import { useState, useEffect } from 'react'
import type { IdeaWidgetProps } from './types'
import { IdeaList } from './IdeaList'
import { IdeaForm } from './IdeaForm'

interface IdeaModalProps {
  title: string
  userId?: string
  isAdmin: boolean
  onFetchIdeas: IdeaWidgetProps['onFetchIdeas']
  onSubmitIdea: IdeaWidgetProps['onSubmitIdea']
  onVote: IdeaWidgetProps['onVote']
  onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes']
  onChangeStatus: IdeaWidgetProps['onChangeStatus']
  onDeleteIdea: IdeaWidgetProps['onDeleteIdea']
  onClose: () => void
}

export function IdeaModal({
  title,
  userId,
  isAdmin,
  onFetchIdeas,
  onSubmitIdea,
  onVote,
  onFetchUserVotes,
  onChangeStatus,
  onDeleteIdea,
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
          <div>
            <h2 id="iw-modal-title">{title}</h2>
            <p className="iw-modal-tagline">Cast your vote · Shape what's next</p>
          </div>
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
              isAdmin={isAdmin}
              onFetchIdeas={onFetchIdeas}
              onVote={onVote}
              onFetchUserVotes={onFetchUserVotes}
              onChangeStatus={onChangeStatus}
              onDeleteIdea={onDeleteIdea}
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
