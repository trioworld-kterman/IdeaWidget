interface IdeaComposerProps {
    onSubmit: (idea: {
        title: string;
        description?: string;
    }) => Promise<void>;
    onSuccess: () => void;
    onCancel: () => void;
}
export declare function IdeaComposer({ onSubmit, onSuccess, onCancel }: IdeaComposerProps): import("react/jsx-runtime").JSX.Element;
export {};
