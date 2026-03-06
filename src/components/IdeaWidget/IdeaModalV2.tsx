import { useEffect, useState } from 'react'
import type { IdeaWidgetProps } from './types'
import { IdeaComposer } from './IdeaComposer'
import { IdeaListPanel } from './IdeaListPanel'

interface IdeaModalV2Props {
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

export function IdeaModalV2({
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
}: IdeaModalV2Props) {
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [refreshToken, setRefreshToken] = useState(0)

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
            <p className="iw-modal-tagline">Cast your vote. Shape what's next.</p>
          </div>
          <button
            className={`iw-header-action${isComposerOpen ? ' iw-header-action--active' : ''}`}
            onClick={() => setIsComposerOpen(prev => !prev)}
            aria-label={isComposerOpen ? 'Close new idea form' : 'Open new idea form'}
          >
            {isComposerOpen ? 'Close' : '+ Idea'}
          </button>
          <button className="iw-close-btn" onClick={onClose} aria-label="Close">
            x
          </button>
        </div>
        <div className="iw-modal-body">
          {isComposerOpen && (
            <IdeaComposer
              onSubmit={onSubmitIdea}
              onSuccess={() => {
                setIsComposerOpen(false)
                setRefreshToken(prev => prev + 1)
              }}
              onCancel={() => setIsComposerOpen(false)}
            />
          )}
          <IdeaListPanel
            userId={userId}
            isAdmin={isAdmin}
            onFetchIdeas={onFetchIdeas}
            onVote={onVote}
            onFetchUserVotes={onFetchUserVotes}
            onChangeStatus={onChangeStatus}
            onDeleteIdea={onDeleteIdea}
            refreshToken={refreshToken}
          />
        </div>
      </div>
    </>
  )
}
