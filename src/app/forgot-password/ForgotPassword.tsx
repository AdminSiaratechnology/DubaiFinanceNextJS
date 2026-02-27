'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/features/owner/api/auth.api';
import { ThemeToggle } from '@/components/ThemeToggle';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setLoading(true);

    try {
      await forgotPassword({ email });
      setMessage('Password reset link has been sent to your email.');
    } catch (err: any) {
      setIsError(true);
      const errorDetail = err?.response?.data?.detail;
      if (errorDetail) {
        setMessage(errorDetail);
      } else {
        setMessage(err?.response?.data?.message || err?.message || 'Failed to send reset link.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 sm:p-10 relative min-h-screen">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black tracking-tight">
              Forgot Password
            </h3>
            <p className="text-sm text-muted-foreground mt-2 font-medium">
              Enter your email to receive a reset link
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 p-3 rounded-xl text-sm font-semibold border ${isError
                  ? 'bg-red-500/10 border-red-500/20 text-red-600'
                  : 'bg-green-500/10 border-green-500/20 text-green-600'
                }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all text-sm font-semibold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 rounded-2xl font-black uppercase tracking-widest text-xs
                bg-brand text-white shadow-xl shadow-brand/20
                transition-all duration-300 flex items-center justify-center
                ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-brand/40'}
              `}
            >
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full py-3 rounded-2xl font-black tracking-widest text-xs
              bg-muted text-foreground border border-border transition-all duration-300"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;