import type { Idea } from './types'

export function getNetScore(idea: Idea): number {
  return idea.votesUp - idea.votesDown
}

export function sortByScore(ideas: Idea[]): Idea[] {
  return [...ideas].sort((a, b) => getNetScore(b) - getNetScore(a))
}

export function statusLabel(status: Idea['status']): string {
  return { open: 'Open', planned: 'Planned', done: 'Done' }[status]
}
