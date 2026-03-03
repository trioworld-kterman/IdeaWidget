# IdeaWidget Integration Guide

## 1. Copy the module

Copy `src/components/IdeaWidget/` into the host project's `components/` directory.

## 2. Add the Firestore collections

In the host project's Firebase console (or via the Admin SDK), create two collections:

### `ideas`
Each document:
```
id          (auto)
title       string
description string   (optional)
votesUp     number   default 0
votesDown   number   default 0
status      string   "open" | "planned" | "done"   default "open"
createdAt   timestamp
```

### `votes`
Document ID: `{ideaId}_{userId}` (this composite key prevents duplicates at the DB level)
Each document:
```
ideaId     string
userId     string
direction  string   "up" | "down"
```

## 3. Implement the four async functions

```typescript
import {
  collection, getDocs, addDoc, doc,
  query, where, serverTimestamp, runTransaction,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import type { Idea } from './IdeaWidget'

export async function getIdeas(): Promise<Idea[]> {
  const snap = await getDocs(collection(db, 'ideas'))
  return snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate() ?? new Date(),
  } as Idea))
}

export async function addIdea(idea: { title: string; description?: string }): Promise<void> {
  await addDoc(collection(db, 'ideas'), {
    ...idea,
    votesUp: 0,
    votesDown: 0,
    status: 'open',
    createdAt: serverTimestamp(),
  })
}

export async function vote(ideaId: string, direction: 'up' | 'down', userId: string): Promise<void> {
  const voteRef = doc(db, 'votes', `${ideaId}_${userId}`)
  const ideaRef = doc(db, 'ideas', ideaId)
  await runTransaction(db, async tx => {
    const voteSnap = await tx.get(voteRef)
    if (voteSnap.exists()) return // already voted — no-op
    const field = direction === 'up' ? 'votesUp' : 'votesDown'
    const ideaSnap = await tx.get(ideaRef)
    const current = (ideaSnap.data()?.[field] ?? 0) as number
    tx.set(voteRef, { ideaId, userId, direction })
    tx.update(ideaRef, { [field]: current + 1 })
  })
}

export async function getUserVotes(userId: string): Promise<Record<string, 'up' | 'down'>> {
  const snap = await getDocs(query(collection(db, 'votes'), where('userId', '==', userId)))
  const result: Record<string, 'up' | 'down'> = {}
  snap.docs.forEach(d => { result[d.data().ideaId] = d.data().direction })
  return result
}
```

## 4. Mount the widget

```tsx
import { IdeaWidget } from './components/IdeaWidget'
import { getIdeas, addIdea, vote, getUserVotes } from './services/ideaService'

// Anywhere in your React tree (typically App.tsx)
<IdeaWidget
  userId={currentUser?.uid}
  onFetchIdeas={getIdeas}
  onSubmitIdea={addIdea}
  onVote={vote}
  onFetchUserVotes={getUserVotes}
/>
```
