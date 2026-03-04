import { Idea } from './types';
interface IdeaItemProps {
    idea: Idea;
    userVote: 'up' | 'down' | null;
    canVote: boolean;
    onVote: (direction: 'up' | 'down') => Promise<void>;
}
export declare function IdeaItem({ idea, userVote, canVote, onVote }: IdeaItemProps): import("react/jsx-runtime").JSX.Element;
export {};
