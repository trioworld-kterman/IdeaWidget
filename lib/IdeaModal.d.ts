import { IdeaWidgetProps } from './types';
interface IdeaModalProps {
    title: string;
    userId?: string;
    onFetchIdeas: IdeaWidgetProps['onFetchIdeas'];
    onSubmitIdea: IdeaWidgetProps['onSubmitIdea'];
    onVote: IdeaWidgetProps['onVote'];
    onFetchUserVotes: IdeaWidgetProps['onFetchUserVotes'];
    onClose: () => void;
}
export declare function IdeaModal({ title, userId, onFetchIdeas, onSubmitIdea, onVote, onFetchUserVotes, onClose, }: IdeaModalProps): import("react/jsx-runtime").JSX.Element;
export {};
