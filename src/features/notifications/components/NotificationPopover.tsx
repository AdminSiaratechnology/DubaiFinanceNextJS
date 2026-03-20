'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { Notification } from '../api/notification.api';

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

export default function NotificationPopover() {
    const {
        notifications,
        unreadCount,
        fetchNotifications,
        markNotificationAsRead,
        markAllAsRead,
        isLoading
    } = useNotificationStore();
    const { user } = useAuthStore();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

            router.push(targetUrl);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Icon & Badge */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    relative p-2 rounded-xl border border-border bg-card 
                    text-muted-foreground hover:text-foreground hover:bg-muted 
                    transition-all duration-200 shadow-sm
                "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>

                {unreadCount > 0 && (
                    <span className="
                        absolute -top-1 -right-1 
                        flex h-5 w-5 items-center justify-center 
                        rounded-full bg-brand text-[10px] font-bold text-white
                        ring-2 ring-background animate-in zoom-in duration-300
                    ">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="
                    absolute right-0 mt-3 w-80 sm:w-96 
                    bg-card border border-border rounded-2xl shadow-2xl 
                    z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200
                ">
                    <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-foreground">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="text-[10px] font-bold text-brand px-2 py-0.5 rounded-full bg-brand/10 uppercase tracking-wider">
                                    {unreadCount} New
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    markAllAsRead();
                                }}
                                className="text-[10px] font-bold text-muted-foreground hover:text-brand transition-colors uppercase tracking-widest"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                        {isLoading && notifications.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground italic">
                                Loading notifications...
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                                </div>
                                <p className="text-sm text-muted-foreground">You're all caught up!</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`
                                            p-4 transition-colors cursor-pointer group
                                            ${notification.is_read ? 'opacity-70 grayscale-[0.5]' : 'bg-brand/5 hover:bg-brand/10'}
                                        `}
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`
                                                mt-1 w-2 h-2 rounded-full shrink-0
                                                ${notification.is_read ? 'bg-transparent' : 'bg-brand shadow-[0_0_8px_rgba(var(--brand-rgb),0.5)]'}
                                            `} />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold ${notification.is_read ? 'text-foreground/80' : 'text-foreground'}`}>
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                                    {notification.message}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground/60 mt-2 font-medium">
                                                    {timeAgo(notification.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-border bg-muted/10 text-center">
                        <Link
                            href="/dashboard/notifications"
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-bold text-brand hover:text-brand-dark transition-colors inline-block w-full py-1"
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
