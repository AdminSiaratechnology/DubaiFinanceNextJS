'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getAllCases, OwnerCase } from '@/features/owner/api/dashboard.api';
import { apiClient } from '@/lib/api/client';
import { ApiSearchableSelect } from "@/shared/ApiSearchableSelect";
import { getBanks } from "@/features/owner/bank/api/bank.api";
import { getBankProductByBankId } from "@/features/owner/bankproducts/api/bankproducts.api";

const LIMIT = 10;

const STATUS_STYLES: Record<string, string> = {
    approved: 'bg-green-soft text-green border-green/20',
    rejected: 'bg-red-soft text-red border-red/20',
    draft: 'bg-muted text-text-secondary border-border',
    submitted_to_coordinator: 'bg-blue-soft text-blue border-blue/20',
    submitted_to_bank: 'bg-purple-soft text-purple border-purple/20',
    documents_required: 'bg-orange-soft text-orange border-orange/20',
    documents_pending: 'bg-orange-soft text-orange border-orange/20',
    under_review: 'bg-blue-soft text-blue border-blue/20',
    sent_back_to_telecaller: 'bg-red-soft text-red border-red/20',
    follow_up: 'bg-purple-soft text-purple border-purple/20',
    
};

const ALL_STATUSES = [
    'submitted_to_coordinator', 'submitted_to_bank', 'documents_required',
    'documents_pending', 'under_review', 'sent_back_to_telecaller', 'follow_up',
    'approved', 'rejected',
];

function formatStatus(status: string) {
    return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ─── View Modal ────────────────────────────────────────────────────────────────
function formatDocLabel(key: string) {
    return key.replace(/_url$/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function ViewModal({ caseData, onClose }: { caseData: OwnerCase; onClose: () => void }) {
    const fields: { label: string; value: React.ReactNode }[] = [
        { label: 'Case ID', value: `#${caseData.id}` },
        { label: 'Customer Name', value: caseData.customer_name },
        { label: 'Mobile', value: caseData.mobile_number },
        { label: 'Email', value: caseData.email },
        { label: 'Company', value: caseData.company_name || '—' },
        { label: 'Emirates ID', value: caseData.emirates_id || '—' },
        { label: 'Product', value: caseData.product?.product_name ?? '—' },
        { label: 'Bank', value: caseData.bank?.name ?? '—' },
        { label: 'Requested Amount', value: `AED ${caseData.requested_amount.toLocaleString()}` },
        { label: 'Salary', value: `AED ${caseData?.salary?.toLocaleString()}` },
        {
            label: 'Status', value: (
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${STATUS_STYLES[caseData.status] ?? 'bg-muted text-text-secondary border-border'}`}>
                    {formatStatus(caseData.status)}
                </span>
            )
        },
        { label: 'Notes', value: caseData.notes || '—' },
        { label: 'Analysis Notes', value: caseData.analysis_notes || '—' },
        { label: 'Created', value: formatDate(caseData.created_at) },
    ];

    // Flatten first document object into entries
    const docEntries = caseData.documents?.[0]
        ? Object.entries(caseData.documents[0])
        : [];
    const uploadedDocs = docEntries.filter(([, v]) => v !== null) as [string, string][];
    const missingDocs = docEntries.filter(([, v]) => v === null).map(([k]) => k);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-3xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="text-lg font-bold text-foreground">Case Details — #{caseData.id}</h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors text-text-muted hover:text-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 max-h-[75vh] overflow-y-auto no-scrollbar space-y-6">
                    {/* Case Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {fields.map(({ label, value }) => (
                            <div key={label} className="bg-muted/30 rounded-xl px-4 py-3 border border-border/50">
                                <p className="text-[12px] font-bold uppercase tracking-widest text-adaptive mb-1">{label}</p>
                                <div className="text-xs font-medium text-adaptive">{value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Documents Section */}
                    {docEntries.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Documents</h3>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-soft text-green border border-green/20">
                                    {uploadedDocs.length} uploaded
                                </span>
                                {missingDocs.length > 0 && (
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-text-muted border border-border">
                                        {missingDocs.length} missing
                                    </span>
                                )}
                            </div>

                            {uploadedDocs.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {uploadedDocs.map(([key, url]) => (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative rounded-xl overflow-hidden border border-border hover:border-brand/40 transition-all bg-muted/20 hover:shadow-md"
                                        >
                                            <img
                                                src={url}
                                                alt={formatDocLabel(key)}
                                                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                            {/* Fallback for non-image files */}
                                            <div className="hidden w-full h-28 items-center justify-center bg-muted/40">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted opacity-50"><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /></svg>
                                            </div>
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                                                <p className="text-[12px] font-bold text-white truncate">{formatDocLabel(key)}</p>
                                            </div>
                                            {/* Always-visible label */}
                                            <p className="px-2 py-1.5 text-[12px] font-semibold text-adaptive truncate border-t border-border bg-card group-hover:hidden">{formatDocLabel(key)}</p>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-text-muted font-medium py-4 text-center bg-muted/20 rounded-xl border border-border">No documents uploaded yet.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-border flex justify-end">
                    <button onClick={onClose} className="px-5 py-2 text-sm font-semibold rounded-xl bg-muted hover:bg-muted/80 border border-border transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Edit Modal ────────────────────────────────────────────────────────────────

function EditModal({
    caseData,
    onClose,
    onSaved,
}: {
    caseData: OwnerCase;
    onClose: () => void;
    onSaved: () => void;
}) {
    const [form, setForm] = useState({
        customer_name: caseData.customer_name,
        mobile_number: caseData.mobile_number,
        email: caseData.email,
        company_name: caseData.company_name ?? '',
        emirates_id: caseData.emirates_id ?? '',
        requested_amount: String(caseData.requested_amount),
        salary: String(caseData.salary),
        status: caseData.status,
        notes: caseData.notes ?? '',
    });

    // ✅ BANK + PRODUCT STATE
    const [bankId, setBankId] = useState(caseData.bank?.id?.toString() || "");
    const [productId, setProductId] = useState(caseData.product?.id?.toString() || "");

    // ✅ DOCUMENTS
    const [documents, setDocuments] = useState<Record<string, File | null>>({});
    const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

    const handleChange = (e: any) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ✅ FILE HANDLER
    const handleFile = (key: string, file: File | null) => {
        if (!file) return;

        if (!allowedTypes.includes(file.type)) {
            alert('Only JPG, PNG, PDF allowed');
            return;
        }

        const preview = URL.createObjectURL(file);

        setDocuments(prev => ({ ...prev, [key]: file }));
        setPreviewUrls(prev => ({ ...prev, [key]: preview }));
    };

    const removeFile = (key: string) => {
        setDocuments(prev => ({ ...prev, [key]: null }));
        setPreviewUrls(prev => ({ ...prev, [key]: '' }));
    };

    // ✅ FETCH PRODUCTS
    const fetchProducts = async () => {
        if (!bankId) {
            return { items: [], total: 0, page: 1, limit: 10 };
        }

        const data = await getBankProductByBankId(Number(bankId));

        return {
            items: data,
            total: data.length,
            page: 1,
            limit: data.length,
        };
    };

    // ✅ SAVE
    const handleSave = async () => {
        setSaving(true);
        setError('');

        try {
            const formData = new FormData();

            // normal fields
            Object.entries(form).forEach(([k, v]) => {
                formData.append(k, v);
            });

            // bank + product
            formData.append("bank_id", bankId);
            formData.append("product_id", productId);

            // documents
            Object.entries(documents).forEach(([key, file]) => {
                if (file) formData.append(key, file);
            });

            await apiClient.put(`/cases/update-case/${caseData.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            onSaved();
            onClose();
        } catch (err: any) {
            setError(err?.response?.data?.detail ?? 'Failed to save.');
        } finally {
            setSaving(false);
        }
    };

    const formatDocLabel = (key: string) => {
        if (!key) return "Document";
        return key
            .replace(/_url$/, '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    const inputCls =
        'w-full px-4 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:ring-2 focus:ring-brand/50';

    const labelCls =
        'block text-[12px] font-bold uppercase tracking-widest text-adaptive mb-1.5';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">

                {/* HEADER */}
                <div className="flex justify-between px-6 py-4 border-b">
                    <h2 className="font-bold">Edit Case #{caseData.id}</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* BODY */}
                <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">

                    {/* FORM */}
                    <div className="grid grid-cols-2 gap-4">

                        {[
                            'customer_name',
                            'mobile_number',
                            'email',
                            'company_name',
                            'emirates_id',
                            'requested_amount',
                            'salary',
                        ].map(name => (
                            <div key={name}>
                                <label className={labelCls}>{formatDocLabel(name)}</label>
                                <input
                                    name={name}
                                    value={(form as any)[name]}
                                    onChange={handleChange}
                                    className={inputCls}
                                />
                            </div>
                        ))}

                        {/* BANK */}
                        <div>
                            <ApiSearchableSelect
                                label="Select Bank"
                                required
                                fetchFn={getBanks as any}
                                value={bankId}
                                initialOptions={[
                                    { id: caseData?.bank?.id, name: caseData?.bank?.name }
                                ]}
                                onChange={(val) => {
                                    setBankId(String(val));
                                    setProductId("");
                                }}
                                placeholder="Search bank..."
                            />
                        </div>

                        {/* PRODUCT */}
                        <div>
                            <ApiSearchableSelect
                                label="Select Product"
                                required
                                fetchFn={fetchProducts}
                                labelKey="product_name"
                                value={productId}
                                initialOptions={[
                                    {
                                        id: caseData?.product?.id,
                                        product_name: caseData?.product?.product_name,
                                    }

                                ]}
                                onChange={(val) => setProductId(String(val))}
                                placeholder="Search product..."
                                disabled={!bankId}
                            />
                        </div>

                        {/* STATUS */}
                        <div>
                            <label className={labelCls}>Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className={inputCls}
                            >
                                {ALL_STATUSES.map(s => (
                                    <option key={s} value={s}>
                                        {formatDocLabel(s)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* NOTES */}
                        <div className="col-span-2">
                            <label className={labelCls}>Notes</label>
                            <textarea
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                className={inputCls}
                            />
                        </div>
                    </div>

                    {/* DOCUMENTS */}
                    {caseData.documents?.[0] && (
                        <div>
                            <h3 className="font-bold text-sm mb-3">Documents</h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {Object.entries(caseData.documents[0]).map(([key, url]) => {
                                    const preview = previewUrls[key] || url;

                                    return (
                                        <div key={key} className="border rounded-xl p-2 bg-muted/20">

                                            <div className="h-28 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                                                {preview?.includes('.pdf') ? (
                                                    <span>PDF</span>
                                                ) : preview ? (
                                                    <img src={preview} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>No File</span>
                                                )}
                                            </div>

                                            <label className="mt-2 flex items-center justify-center text-xs font-semibold border border-dashed rounded-lg py-2 cursor-pointer hover:bg-muted transition">
                                                Upload File
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleFile(key, e.target.files?.[0] || null)
                                                    }
                                                />
                                            </label>

                                            <p className="text-xs font-semibold text-center mt-1">
                                                {formatDocLabel(key)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {error && <p className="text-red text-sm">{error}</p>}
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 p-4 border-t">
                    <button onClick={onClose} className="px-3 py-1 border border-foreground rounded-lg">
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-foreground text-background rounded-lg"
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Tab ──────────────────────────────────────────────────────────────────
export function AllCasesTab() {
    const [cases, setCases] = useState<OwnerCase[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [viewCase, setViewCase] = useState<OwnerCase | null>(null);
    const [editCase, setEditCase] = useState<OwnerCase | null>(null);
    const [request, setRequest] = useState('');

    const fetchCases = useCallback(async (p: number, q: string) => {
        setLoading(true);
        try {
            const res = await getAllCases(p, LIMIT, q || undefined, request || undefined);
            setCases(res.items);
            setTotal(res.total);
        } catch (err) {
            console.error('Failed to fetch cases', err);
        } finally {
            setLoading(false);
        }
    }, [request]);

    useEffect(() => {
        fetchCases(page, search);
    }, [page, search, fetchCases, request]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(inputValue);
            setPage(1);
        }, 350);
        return () => clearTimeout(timer);
    }, [inputValue]);

    const totalPages = Math.ceil(total / LIMIT);
    return (
        <>
            {viewCase && <ViewModal caseData={viewCase} onClose={() => setViewCase(null)} />}
            {editCase && (
                <EditModal
                    caseData={editCase}
                    onClose={() => setEditCase(null)}
                    onSaved={() => fetchCases(page, search)}
                />
            )}

            <div className="bg-card border border-foreground/30 rounded-2xl shadow-sm shadow-foreground/30 overflow-hidden animate-in fade-in duration-300">
                {/* Header */}
                <div className="p-5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-foreground">All Cases</h3>
                        {!loading && <p className="text-xs text-text-muted mt-0.5">{total} total cases</p>}
                    </div>
                    <div className="flex gap-2">
                        <div className='relative'>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-3.5 top-3 text-text-muted"
                            >
                                <polygon points="22 3 2 3 10 12 10 19 14 21 14 12 22 3" />
                            </svg>
                            <select
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                                className="w-full pl-8 pr-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand/50 transition-all font-medium"
                            >
                                <option value="">All</option>
                                <option value="cases">Cases</option>
                                <option value="leads">Leads</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-64 relative">
                            <input
                                type="text"
                                placeholder="Search cases..."
                                className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand/50 transition-all font-medium"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-3 text-text-muted">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto no-scrollbar">
                    {loading ? (
                        <div className="p-6 space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-10 bg-muted/40 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : cases.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-text-muted text-sm font-medium gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 mb-2">
                                <path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                            </svg>
                            No cases found
                        </div>
                    ) : (
                        <table className="w-full text-left min-w-[1100px]">
                            <thead>
                                <tr className="border-b border-border bg-muted/20">
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">S.No.</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Customer</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Product</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Bank</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Amount</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Status</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Created</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold">Team</th>
                                    <th className="py-4 px-5 text-xs text-text-secondary uppercase tracking-widest font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {cases.map((row, index) => (
                                    <tr key={row.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="py-4 px-5">
                                            <div className="text-sm font-bold text-orange"># {(page - 1) * LIMIT + index + 1}</div>
                                            {row.lead_id && (
                                                <span className="mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-soft text-purple border border-purple/20">
                                                    Lead
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="text-sm font-medium text-adaptive">{row.customer_name}</div>
                                            <div className="text-xs text-text-muted">{row.mobile_number}</div>
                                        </td>
                                        <td className="py-4 px-5 text-sm text-text-secondary">{row.product?.product_name ?? '—'}</td>
                                        <td className="py-4 px-5 text-sm text-text-secondary">{row.bank?.name ?? '—'}</td>
                                        <td className="py-4 px-5 text-sm font-medium text-adaptive">AED {row.requested_amount.toLocaleString()}</td>
                                        <td className="py-4 px-5">
                                            <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${STATUS_STYLES[row.status] ?? 'bg-muted text-text-secondary border-border'}`}>
                                                {formatStatus(row.status)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-sm text-text-secondary">{formatDate(row.created_at)}</td>
                                        <td className="py-4 px-5">
                                            <div className="flex flex-col gap-1 mt-1 text-xs text-adaptive">
                                                {row.agent_name && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md border bg-blue-soft text-blue border-blue/20">
                                                        Agent
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                                                        {row.agent_name}
                                                    </span>
                                                )}
                                                {row.coordinator_name && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md border bg-green-soft text-green border-green/20">
                                                        Coordinator
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
                                                        {row.coordinator_name}
                                                    </span>
                                                )}
                                                {row.telecaller_name && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-md border bg-orange-soft text-orange border-orange/20">
                                                        Telecaller
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                                                        {row.telecaller_name}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-5">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View */}
                                                <button
                                                    onClick={() => setViewCase(row)}
                                                    title="View details"
                                                    className="p-1.5 rounded-lg bg-muted border border-border text-text-muted hover:text-brand hover:border-brand/30 hover:bg-brand/5 transition-all"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                                </button>
                                                {/* Edit */}
                                                <button
                                                    onClick={() => setEditCase(row)}
                                                    title="Edit case"
                                                    className="p-1.5 rounded-lg bg-orange text-white hover:bg-orange/85 transition-all shadow-sm"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-muted/10 flex-wrap gap-3">
                        <p className="text-xs text-text-muted font-medium">
                            Page {page} of {totalPages} &mdash; {total} cases
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition">
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button key={p} onClick={() => setPage(p)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${p === page ? 'bg-foreground text-background border-foreground' : 'border-border hover:bg-muted'}`}>
                                    {p}
                                </button>
                            ))}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition">
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
