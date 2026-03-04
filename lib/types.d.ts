export interface Idea {
    id: string;
    title: string;
    description?: string;
    votesUp: number;
    votesDown: number;
    status: 'open' | 'planned' | 'done';
    createdAt: Date;
}
export interface IdeaWidgetProps {
    /** Authenticated user ID. Omit for read-only (voting disabled). */
    userId?: string;
    onFetchIdeas: () => Promise<Idea[]>;
    onSubmitIdea: (idea: {
        title: string;
        description?: string;
    }) => Promise<void>;
    /** Required only when userId is provided. */
    onVote?: (ideaId: string, direction: 'up' | 'down', userId: string) => Promise<void>;
    /** Required only when userId is provided. Returns map of ideaId → vote direction. */
    onFetchUserVotes?: (userId: string) => Promise<Record<string, 'up' | 'down'>>;
    /** Modal title. Default: "Feature Ideas" */
    title?: string;
    /** Floating button label. Default: "Ideas" */
    buttonLabel?: string;
}
