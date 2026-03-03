import { useState } from 'react'
import { IdeaButton } from './IdeaButton'
import { IdeaModal } from './IdeaModal'
import type { IdeaWidgetProps } from './types'
import './IdeaWidget.css'

export function IdeaWidget({
  userId,
  onFetchIdeas,
  onSubmitIdea,
  onVote,
  onFetchUserVotes,
  title = 'Feature Ideas',
  buttonLabel = 'Ideas',
}: IdeaWidgetProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IdeaButton label={buttonLabel} onClick={() => setOpen(true)} />
      {open && (
        <IdeaModal
          title={title}
          userId={userId}
          onFetchIdeas={onFetchIdeas}
          onSubmitIdea={onSubmitIdea}
          onVote={onVote}
          onFetchUserVotes={onFetchUserVotes}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
