import { IdeaWidgetProps } from './types';
interface IdeaListPanelProps {
    userId?: string;
    isAdmin: boolean;
    onFetchIdeas: IdeaWidgetProps['onFetchIdeas'];
    onVote: IdeaWidgetProps['onVote'];
    onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes'];
    onChangeStatus: IdeaWidgetProps['onChangeStatus'];
    onDeleteIdea: IdeaWidgetProps['onDeleteIdea'];
    refreshToken?: number;
}
export declare function IdeaListPanel({ userId, isAdmin, onFetchIdeas, onVote, onFetchUserVotes, onChangeStatus, onDeleteIdea, refreshToken, }: IdeaListPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
