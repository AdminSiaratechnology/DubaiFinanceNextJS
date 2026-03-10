'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Label, Input } from '@/components/ui/Form';
import { toast } from 'sonner';
import {
    getEmailConfig,
    saveEmailConfig,
    deleteEmailConfig,
    EmailConfig
} from '../api/email-config.api';
import { useConfirmAction } from '@/hooks/use-confirm-action';

export function EmailConfigForm() {
    const [config, setConfig] = useState<EmailConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { confirmAction } = useConfirmAction();

    const [formData, setFormData] = useState({
        smtp_user: '',
        smtp_password: ''
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const data = await getEmailConfig();
            if (data) {
                setConfig(data);
                setFormData({
                    smtp_user: data.smtp_user,
                    smtp_password: data.smtp_password
                });
            } else {
                setConfig(null);
                setFormData({ smtp_user: '', smtp_password: '' });
            }
        } catch (error) {
            toast.error('Failed to load email configuration');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.smtp_user || !formData.smtp_password) {
            toast.error('Please fill in all fields');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                ...formData,
                smtp_password: formData.smtp_password.replace(/\s/g, '')
            };
            const updated = await saveEmailConfig(payload);
            setConfig(updated);
            toast.success('Email configuration saved successfully');
        } catch (error: any) {
            toast.error(error?.response?.data?.detail?.[0]?.msg || 'Failed to save configuration');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!config) return;

        await confirmAction({
            title: 'Delete Email Configuration?',
            description: 'This will stop the system from sending emails until a new configuration is added.',
            confirmText: 'Delete Now',
            action: () => deleteEmailConfig(config.id),
            successMessage: 'Configuration deleted successfully',
            onSuccess: () => {
                setConfig(null);
                setFormData({ smtp_user: '', smtp_password: '' });
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-light text-foreground tracking-tight">Email Configuration</h1>
                    <p className="text-[10px] sm:text-xs text-text-muted italic mt-1">
                        Configure SMTP settings for sending system emails and OTPs.
                    </p>
                </div>
                {config && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-soft text-green rounded-full text-[10px] font-bold uppercase tracking-wider border border-green/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                        Configured
                    </div>
                )}
            </header>

            <Card className="p-6 sm:p-8 border-brand/10 shadow-sm">
                <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-border pb-3">
                            <div className="p-2 rounded-lg bg-brand/10 text-brand">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">SMTP Settings</h4>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>SMTP Username / Email</Label>
                                <Input
                                    name="smtp_user"
                                    value={formData.smtp_user}
                                    onChange={(e) => setFormData(prev => ({ ...prev, smtp_user: e.target.value }))}
                                    placeholder="e.g. notifications@dubaifinance.com"
                                    required
                                />
                                <p className="text-[9px] text-text-muted italic pl-1">The email address used to authenticate with the SMTP server.</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-bold tracking-widest pl-1" required>SMTP Password</Label>
                                <div className="relative">
                                    <Input
                                        name="smtp_password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.smtp_password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, smtp_password: e.target.value }))}
                                        placeholder="Enter SMTP password or App Password"
                                        className="pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 10.3 10.3a3 3 0 0 0 4.12 4.12l.42.42" /><path d="M21 21L3 3" /><path d="M15 15.89A9.93 9.93 0 0 1 12 16c-4.42 0-8-3.58-8-8 0-1.21.26-2.36.72-3.39" /><path d="M8.47 5.47C9.55 5.16 10.74 5 12 5c4.42 0 8 3.58 8 8a9.91 9.91 0 0 1-1.38 5.03" /><path d="M11.51 16.22l5.42 5.42" /><path d="M2 12l5.42-5.42" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-[9px] text-text-muted italic pl-1">For Gmail/AOL, use an "App Password" instead of your regular account password.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full sm:flex-1 py-3 bg-brand text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                                    {config ? 'Update Configuration' : 'Save Configuration'}
                                </>
                            )}
                        </button>

                        {config && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={saving}
                                className="w-full sm:w-auto px-6 py-3 bg-red-soft text-red rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red/10 transition-all border border-red/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    Delete
                                </>
                            </button>
                        )}
                    </div>
                </form>
            </Card>

            <div className="bg-amber-soft/30 border border-amber/10 rounded-2xl p-4 sm:p-6 flex gap-4">
                <div className="text-amber shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                </div>
                <div className="space-y-1">
                    <h5 className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Important Security Note</h5>
                    <p className="text-[11px] text-amber-900/70 font-medium leading-relaxed">
                        Email credentials are encrypted and stored securely. Ensure the SMTP server is configured to use SSL/TLS (Port 465 or 587) for secure transmission. Only one configuration is allowed at a time.
                    </p>
                </div>
            </div>
        </div>
    );
}
