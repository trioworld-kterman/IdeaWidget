import { useState } from 'react'

interface IdeaFormProps {
  onSubmit: (idea: { title: string; description?: string }) => Promise<void>
  onSuccess: () => void
}

export function IdeaForm({ onSubmit, onSuccess }: IdeaFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    setError(null)
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
      })
      onSuccess()
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="iw-form" onSubmit={handleSubmit}>
      <div className="iw-form-field">
        <label htmlFor="iw-title">Title *</label>
        <input
          id="iw-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Your idea in one line"
          required
          maxLength={120}
        />
      </div>
      <div className="iw-form-field">
        <label htmlFor="iw-desc">Description</label>
        <textarea
          id="iw-desc"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="More details (optional)"
          rows={3}
          maxLength={500}
        />
      </div>
      {error && <p className="iw-form-error">{error}</p>}
      <button className="iw-submit-btn" type="submit" disabled={loading || !title.trim()}>
        {loading ? 'Submitting…' : 'Submit idea'}
      </button>
    </form>
  )
}
