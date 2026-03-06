import { useState } from 'react'
import { IdeaButton } from './IdeaButton'
import { IdeaModalV2 } from './IdeaModalV2'
import type { IdeaWidgetProps } from './types'
import './IdeaWidget.css'

export function IdeaWidget({
  userId,
  isAdmin = false,
  onFetchIdeas,
  onSubmitIdea,
  onVote,
  onFetchUserVotes,
  onChangeStatus,
  onDeleteIdea,
  title = 'Feature Ideas',
  buttonLabel = 'Ideas',
}: IdeaWidgetProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IdeaButton label={buttonLabel} onClick={() => setOpen(true)} />
      {open && (
        <IdeaModalV2
          title={title}
          userId={userId}
          isAdmin={isAdmin}
          onFetchIdeas={onFetchIdeas}
          onSubmitIdea={onSubmitIdea}
          onVote={onVote}
          onFetchUserVotes={onFetchUserVotes}
          onChangeStatus={onChangeStatus}
          onDeleteIdea={onDeleteIdea}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
