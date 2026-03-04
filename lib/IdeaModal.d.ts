import { IdeaWidgetProps } from './types';
interface IdeaModalProps {
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
export declare function IdeaModal({ title, userId, isAdmin, onFetchIdeas, onSubmitIdea, onVote, onFetchUserVotes, onChangeStatus, onDeleteIdea, onClose, }: IdeaModalProps): import("react/jsx-runtime").JSX.Element;
export {};
