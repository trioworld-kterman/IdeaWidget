# IdeaWidget

A floating 💡 button that lets users submit and vote on feature ideas — drop it into any React project in minutes.

**[Live demo](https://trioworld-kterman.github.io/IdeaWidget)**

## Install

```bash
npm install github:trioworld-kterman/IdeaWidget
```

## Usage

```tsx
import { IdeaWidget } from 'idea-widget'
import 'idea-widget/style.css'

<IdeaWidget
  userId={currentUser?.uid}
  onFetchIdeas={getIdeas}
  onSubmitIdea={addIdea}
  onVote={vote}
  onFetchUserVotes={getUserVotes}
/>
```

`userId` is optional — omit it for read-only mode (voting disabled).

## Props

| Prop | Type | Required | Default |
|---|---|---|---|
| `userId` | `string` | No | — |
| `onFetchIdeas` | `() => Promise<Idea[]>` | Yes | — |
| `onSubmitIdea` | `(idea) => Promise<void>` | Yes | — |
| `onVote` | `(id, dir, userId) => Promise<void>` | No | — |
| `onFetchUserVotes` | `(userId) => Promise<Record<string, 'up'\|'down'>>` | No | — |
| `title` | `string` | No | `"Feature Ideas"` |
| `buttonLabel` | `string` | No | `"Ideas"` |

## Database setup (Firestore)

See [INTEGRATION.md](./INTEGRATION.md) for the full Firestore schema and ready-to-paste service functions.

Two collections required:

- **`ideas`** — `{ title, description?, votesUp, votesDown, status, createdAt }`
- **`votes`** — doc ID: `{ideaId}_{userId}` — prevents duplicate votes at DB level

## Dev

```bash
npm run dev        # demo on http://localhost:3001
npm test           # unit tests
npm run build:lib  # build distributable → lib/
```
