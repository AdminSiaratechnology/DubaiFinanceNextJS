'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLoanType, LoanType, updateLoanType, CreateLoanTypePayload } from '@/features/owner/loantypes/api/loanTypes.api';
import { Card } from '@/components/ui/Card';
import { Label, Input, Select } from '@/components/ui/Form';
import { toast } from 'sonner';

interface LoanTypeFormProps {
  loanType?: LoanType;
  loanTypeId?: number;
  title: string;
}

export function LoanTypeForm({
  loanType,
  loanTypeId,
  title,
}: LoanTypeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<CreateLoanTypePayload>({
    name: loanType?.name || '',
    description: loanType?.description || '',
    status: (loanType?.status as 'active' | 'inactive') || 'active',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (data: CreateLoanTypePayload) => {
    const apiCall = loanTypeId
      ? updateLoanType(loanTypeId, data)
      : createLoanType(data);

    await toast.promise(apiCall, {
      success: loanTypeId
        ? 'Loan type updated successfully'
        : 'Loan type created successfully',
      error: 'Failed to save loan type',
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSave(formData);
      router.push('/owner/loanTypes');
    } catch (err: any) {
      setError(err?.message || 'Failed to save loan type');
    } finally {
      setLoading(false);
    }
  };
  const onCancel = () => {
    router.push('/owner/loanTypes');
  };
  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-medium text-foreground">
            {title}
          </h1>
          <p className="text-[12px] sm:text-sm text-text-muted italic mt-1">
            Configure loan type details and availability.
          </p>
        </div>

        <button
          onClick={onCancel}
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-foreground hover:bg-muted rounded-xl text-xs font-bold text-foreground hover:text-foreground transition-all sm:w-auto w-full"
        >
          Back to Loan Types
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="p-4 sm:p-8 border-brand/10 shadow-sm overflow-visible">
          <div className="space-y-8">
            <div className="space-y-4">
              {/* <div className="flex items-center gap-3 border-b border-border pb-3">
                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">
                  Loan Type Details
                </h4>
              </div> */}

              {error && (
                <div className="text-red text-sm font-semibold bg-red/10 border border-red/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>
                    Loan Type Name
                  </Label>
                  <Input
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="e.g. Personal Loan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                    Status
                  </Label>
                  <Select
                    name="status"
                    value={formData.status || 'active'}
                    onChange={handleChange}
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest pl-1">
                    Description
                  </Label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    placeholder="Describe this loan type, its purpose, and typical use cases..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-semibold focus:ring-2 focus:ring-foreground/20 outline-none transition-all placeholder:text-text-muted/50 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl border border-foreground font-bold text-sm text-foreground bg-white hover:bg-muted transition-all"
          >
            Discard Changes
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-10 py-3 bg-foreground text-background rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save Loan Type'}
          </button>
        </div>
      </form>
    </div>
  );
}