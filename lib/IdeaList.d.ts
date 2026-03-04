import { IdeaWidgetProps } from './types';
interface IdeaListProps {
    userId?: string;
    onFetchIdeas: IdeaWidgetProps['onFetchIdeas'];
    onVote: IdeaWidgetProps['onVote'];
    onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes'];
}
export declare function IdeaList({ userId, onFetchIdeas, onVote, onFetchUserVotes }: IdeaListProps): import("react/jsx-runtime").JSX.Element;
export {};
