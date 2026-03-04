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
    /** Enables status dropdown and delete button on each idea. */
    isAdmin?: boolean;
    onFetchIdeas: () => Promise<Idea[]>;
    onSubmitIdea: (idea: {
        title: string;
        description?: string;
    }) => Promise<void>;
    /** Required only when userId is provided. */
    onVote?: (ideaId: string, direction: 'up' | 'down', userId: string) => Promise<void>;
    /** Required only when userId is provided. Returns map of ideaId → vote direction. */
    onFetchUserVotes?: (userId: string) => Promise<Record<string, 'up' | 'down'>>;
    /** Required only when isAdmin is true. */
    onChangeStatus?: (ideaId: string, status: Idea['status']) => Promise<void>;
    /** Required only when isAdmin is true. */
    onDeleteIdea?: (ideaId: string) => Promise<void>;
    /** Modal title. Default: "Feature Ideas" */
    title?: string;
    /** Floating button label. Default: "Ideas" */
    buttonLabel?: string;
}
