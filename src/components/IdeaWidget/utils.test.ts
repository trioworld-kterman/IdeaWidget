import { describe, it, expect } from 'vitest'
import { getNetScore, sortByScore, statusLabel } from './utils'
import type { Idea } from './types'

const idea = (partial: Partial<Idea> & { id: string }): Idea => ({
  title: 'Test',
  votesUp: 0,
  votesDown: 0,
  status: 'open',
  createdAt: new Date(),
  ...partial,
})

describe('getNetScore', () => {
  it('subtracts downvotes from upvotes', () => {
    expect(getNetScore(idea({ id: '1', votesUp: 5, votesDown: 2 }))).toBe(3)
  })
  it('returns negative when more downvotes', () => {
    expect(getNetScore(idea({ id: '2', votesUp: 1, votesDown: 4 }))).toBe(-3)
  })
})

describe('sortByScore', () => {
  it('sorts highest net score first', () => {
    const ideas = [
      idea({ id: '1', votesUp: 1 }),
      idea({ id: '2', votesUp: 5 }),
      idea({ id: '3', votesUp: 3 }),
    ]
    expect(sortByScore(ideas).map(i => i.id)).toEqual(['2', '3', '1'])
  })
  it('does not mutate the original array', () => {
    const ideas = [idea({ id: '1' }), idea({ id: '2' })]
    const copy = [...ideas]
    sortByScore(ideas)
    expect(ideas).toEqual(copy)
  })
})

describe('statusLabel', () => {
  it('returns human-readable labels for all statuses', () => {
    expect(statusLabel('open')).toBe('Open')
    expect(statusLabel('planned')).toBe('Planned')
    expect(statusLabel('done')).toBe('Done')
  })
})
