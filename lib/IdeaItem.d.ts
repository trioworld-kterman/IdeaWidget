import { Idea } from './types';
interface IdeaItemProps {
    idea: Idea;
    userVote: 'up' | 'down' | null;
    canVote: boolean;
    isAdmin: boolean;
    onVote: (direction: 'up' | 'down') => Promise<void>;
    onChangeStatus?: (status: Idea['status']) => Promise<void>;
    onDelete?: () => Promise<void>;
}
export declare function IdeaItem({ idea, userVote, canVote, isAdmin, onVote, onChangeStatus, onDelete }: IdeaItemProps): import("react/jsx-runtime").JSX.Element;
export {};
