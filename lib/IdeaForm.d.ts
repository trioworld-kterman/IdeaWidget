interface IdeaFormProps {
    onSubmit: (idea: {
        title: string;
        description?: string;
    }) => Promise<void>;
    onSuccess: () => void;
}
export declare function IdeaForm({ onSubmit, onSuccess }: IdeaFormProps): import("react/jsx-runtime").JSX.Element;
export {};
