interface IdeaFormProps {
    onSubmit: (idea: {
        title: string;
        description?: string;
    }) => Promise<void>;
    onSuccess: () => void;
    onCancel?: () => void;
}
export declare function IdeaForm({ onSubmit, onSuccess, onCancel }: IdeaFormProps): import("react/jsx-runtime").JSX.Element;
export {};
