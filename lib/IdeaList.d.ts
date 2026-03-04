import { IdeaWidgetProps } from './types';
interface IdeaListProps {
    userId?: string;
    isAdmin: boolean;
    onFetchIdeas: IdeaWidgetProps['onFetchIdeas'];
    onVote: IdeaWidgetProps['onVote'];
    onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes'];
    onChangeStatus: IdeaWidgetProps['onChangeStatus'];
    onDeleteIdea: IdeaWidgetProps['onDeleteIdea'];
}
export declare function IdeaList({ userId, isAdmin, onFetchIdeas, onVote, onFetchUserVotes, onChangeStatus, onDeleteIdea }: IdeaListProps): import("react/jsx-runtime").JSX.Element;
export {};
