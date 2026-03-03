interface IdeaButtonProps {
  label: string
  onClick: () => void
}

export function IdeaButton({ label, onClick }: IdeaButtonProps) {
  return (
    <button className="iw-button" onClick={onClick} aria-label="Open ideas panel">
      💡 {label}
    </button>
  )
}
