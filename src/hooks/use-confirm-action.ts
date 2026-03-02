'use client';

import { useConfirm } from '@/components/providers/confirm-provider';
import { toast } from 'sonner';

interface ConfirmActionOptions<T = any> {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    action: () => Promise<T>;
    successMessage?: string;
    errorMessage?: string;
    loadingMessage?: string;
    onSuccess?: (result: T) => void;
    onError?: (error: unknown) => void;
}

export function useConfirmAction() {
    const confirm = useConfirm();

    const confirmAction = async <T,>({
        title = 'Are you sure?',
        description = 'This action cannot be undone.',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        action,
        successMessage = 'Action completed successfully.',
        errorMessage = 'Something went wrong.',
        loadingMessage = 'Processing...',
        onSuccess,
        onError,
    }: ConfirmActionOptions<T>) => {
        const confirmed = await confirm({
            title,
            description,
            confirmText,
            cancelText,
        });

        if (!confirmed) return null;

        try {
            const promise = action();

            // Show toast lifecycle (UI)
            toast.promise(promise, {
                loading: loadingMessage,
                success: successMessage,
                error: (err: any) =>
                    err?.response?.data?.message ||
                    err?.message ||
                    errorMessage,
            });

            // 🔥 Await original promise (properly typed as T)
            const result = await promise;

            onSuccess?.(result);
            return result;
        } catch (error) {
            console.error(error);
            onError?.(error);
            return null;
        }
    };

    return { confirmAction };
}