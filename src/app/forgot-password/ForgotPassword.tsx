'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Step = 'email' | 'otp' | 'reset' | 'success';

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  // STEP 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
    //   const res = await fetch('/api/auth/send-otp', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });

    //   const data = await res.json();
    //   if (!res.ok) throw new Error(data.message || 'Failed to send OTP');

      setStep('otp');
      setMessage('OTP sent to your email');
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP + Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
    //   const res = await fetch('/api/auth/reset-password', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, otp, password }),
    //   });

    //   const data = await res.json();
    //   if (!res.ok) throw new Error(data.message || 'Reset failed');

    //   setStep('success');
    //   setMessage('Password reset successfully!');
    setStep('success');
    setMessage('Password reset successfully!');
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-gray-500 mt-2">
            {step === 'email' && 'Enter your email to receive OTP'}
            {step === 'otp' && 'Enter the OTP sent to your email'}
            {step === 'success' && 'Your password has been reset'}
          </p>
        </div>

        {/* STEP 1: EMAIL */}
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* STEP 2: OTP + PASSWORD */}
        {step === 'otp' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP Code
              </label>
              <input
                type="text"
                required
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* SUCCESS */}
        {step === 'success' && (
          <div className="text-center">
            <div className="text-green-600 text-5xl mb-3">✓</div>
            <p className="text-gray-700 font-medium">
              Password reset successfully!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You can now login with your new password.
            </p>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition disabled:opacity-60 mt-3"
            >
              Go to Login
            </button>
          </div>

        )}

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-gray-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;