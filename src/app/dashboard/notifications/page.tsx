'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '@/features/notifications/store/useNotificationStore';
import { Notification } from '@/features/notifications/api/notification.api';

function timeAgo(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
}

export default function NotificationsPage() {
    const {
        notifications,
        fetchNotifications,
        markNotificationAsRead,
        markAllAsRead,
        isLoading
    } = useNotificationStore();
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notification: Notification) => {
        if (!notification.is_read) {
            await markNotificationAsRead(notification.id);
        }

        if (notification.parent_type && notification.parent_id && user?.role) {
            const role = user.role === 'coordinator' ? 'analyst' : user.role;
            const paramName = notification.parent_type === 'lead' ? 'leadId' : 'caseId';
            let targetUrl = `/dashboard/${role}/main?${paramName}=${notification.parent_id}`;

            // Fix: Set correct tab/view so the list matches the selected item
            if (role === 'telecaller') {
                const title = notification.title.toLowerCase();
                const msg = notification.message.toLowerCase();
                if (title.includes('returned') || title.includes('sent back') || msg.includes('returned') || msg.includes('sent back')) {
                    targetUrl += '&tab=sent_back_to_telecaller';
                } else {
                    targetUrl += '&tab=new-leads';
                }
            }

            if (role === 'agent' && notification.parent_type === 'lead') {
                targetUrl += '&view=leads';
            }
            
            console.log(role, paramName, notification.parent_id, targetUrl);
            router.push(targetUrl);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-6 rounded-2xl border border-border shadow-soft">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Stay updated with your latest activities and alerts
                    </p>
                </div>
                {notifications.some(n => !n.is_read) && (
                    <button
                        onClick={() => markAllAsRead()}
                        className="px-4 py-2 bg-brand/10 text-brand hover:bg-brand hover:text-white font-bold rounded-xl transition-all duration-300 text-sm ring-1 ring-brand/20 shadow-sm"
                    >
                        Mark All as Read
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
                {isLoading && notifications.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4" />
                        <p className="text-muted-foreground font-medium">Fetching your notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2">No notifications yet</h2>
                        <p className="text-muted-foreground max-w-xs mx-auto">
                            When you receive alerts or updates, they'll show up here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`
                                    p-5 sm:p-6 transition-all duration-300 flex gap-4 sm:gap-6 group relative cursor-pointer hover:bg-muted/30
                                    ${notification.is_read ? 'opacity-80' : 'bg-brand/5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-brand'}
                                `}
                            >
                                <div className={`
                                    shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                                    ${notification.is_read ? 'bg-muted text-muted-foreground' : 'bg-brand text-brand-foreground shadow-lg shadow-brand/20'}
                                `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                                    </svg>
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className={`font-bold transition-colors ${notification.is_read ? 'text-foreground/80' : 'text-foreground'}`}>
                                            {notification.title}
                                        </h3>
                                        <span className="text-[10px] sm:text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                                            {timeAgo(notification.created_at)}
                                        </span>
                                    </div>
                                    <p className={`text-sm leading-relaxed ${notification.is_read ? 'text-muted-foreground' : 'text-foreground/90'}`}>
                                        {notification.message}
                                    </p>
                                    {!notification.is_read && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markNotificationAsRead(notification.id);
                                            }}
                                            className="text-xs font-bold text-brand hover:underline mt-2 inline-flex items-center gap-1 group/btn"
                                        >
                                            Mark as read
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
