import React from 'react';

interface FormActionsProps {
    onCancel: () => void;
    isSubmitting?: boolean;
    submitText?: string;
    cancelText?: string;
}

export function FormActions({
    onCancel,
    isSubmitting = false,
    submitText = "Save Changes",
    cancelText = "Discard Changes",
}: FormActionsProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
            <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-[180px] h-[44px] px-6 rounded-xl border border-foreground font-bold text-sm text-foreground bg-card hover:bg-muted transition-all flex items-center justify-center leading-none"
            >
                {cancelText}
            </button>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-[180px] h-[44px] px-6 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 leading-none"
            >
                {isSubmitting && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                    </svg>
                )}
                {isSubmitting ? "Saving..." : submitText}
            </button>
        </div>
    );
}
