import { IdeaWidgetProps } from './types';
interface IdeaModalV2Props {
    title: string;
    userId?: string;
    isAdmin: boolean;
    onFetchIdeas: IdeaWidgetProps['onFetchIdeas'];
    onSubmitIdea: IdeaWidgetProps['onSubmitIdea'];
    onVote: IdeaWidgetProps['onVote'];
    onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes'];
    onChangeStatus: IdeaWidgetProps['onChangeStatus'];
    onDeleteIdea: IdeaWidgetProps['onDeleteIdea'];
    onClose: () => void;
}
export declare function IdeaModalV2({ title, userId, isAdmin, onFetchIdeas, onSubmitIdea, onVote, onFetchUserVotes, onChangeStatus, onDeleteIdea, onClose, }: IdeaModalV2Props): import("react/jsx-runtime").JSX.Element;
export {};
