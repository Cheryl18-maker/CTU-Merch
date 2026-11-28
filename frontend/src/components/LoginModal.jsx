import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X, ShieldCheck, UserCheck, UserPlus, Loader2, AlertCircle } from 'lucide-react';
import { signIn, signUp } from '../supabase';

export default function LoginModal({ isOpen, onClose, onLogin, onContinueAsGuest }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const reset = () => {
    setEmail(''); setPassword(''); setFullName(''); setStudentId('');
    setError(''); setSuccessMsg(''); setShowPassword(false); setLoading(false);
  };

  const switchMode = (m) => { reset(); setMode(m); };

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user, error: authError } = await signIn(email, password);
      if (authError) {
        setError(authError.message || 'Invalid email or password.');
        setLoading(false);
        return;
      }
      // onLogin receives the Supabase user; App.jsx will fetch the profile
      onLogin(user);
      onClose();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  // ── SIGN UP ────────────────────────────────────────────────────────────────
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const { user, error: authError } = await signUp(email, password, fullName, studentId);
      if (authError) {
        setError(authError.message || 'Registration failed.');
        setLoading(false);
        return;
      }
      setSuccessMsg('Account created! Check your email to confirm, then log in.');
      setLoading(false);
      setTimeout(() => switchMode('login'), 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleGuest = () => {
    onContinueAsGuest();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors z-10"
          aria-label="Close login modal"
        >
          <X size={18} />
        </button>

        <div className="p-7 sm:p-8 space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-ctu-orange text-xs font-bold border border-orange-200">
            <ShieldCheck size={14} />
            <span>Campus Identity Access</span>
          </div>

          {/* Title */}
          <div className="space-y-1 pr-8">
            <h2 className="text-2xl sm:text-3xl font-black text-ctu-dark tracking-tight">
              {mode === 'login' ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="text-xs sm:text-sm text-ctu-muted leading-relaxed">
              {mode === 'login'
                ? 'Log in with your campus email to access your wallet, points, and order history.'
                : 'Register with your CTU email to start earning points and paying with your campus wallet.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
            {['login', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                  mode === m
                    ? 'bg-white text-ctu-dark shadow-sm'
                    : 'text-ctu-muted hover:text-ctu-dark'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error / Success */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-semibold">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {successMsg && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-600 text-xs font-semibold">
              <span>{successMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                  Campus Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@ctu.edu.ph"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-ctu-orange hover:bg-orange-600 disabled:opacity-60 text-white rounded-2xl text-sm font-black tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 border-2 border-orange-400"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <UserCheck size={18} />}
                  <span>{loading ? 'Logging in…' : 'LOG IN'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuest}
                  className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-ctu-dark rounded-2xl text-sm font-black tracking-wider transition-all flex items-center justify-center gap-2 border border-gray-200"
                >
                  <span>CONTINUE AS GUEST</span>
                </button>
              </div>
            </form>
          )}

          {/* SIGN UP FORM */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                />
              </div>

              {/* Student ID */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                  Student / Faculty ID <span className="text-gray-400 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="CTU-2024-00001"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                  Campus Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@ctu.edu.ph"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                  Password <span className="text-gray-400 normal-case font-normal">(min. 6 characters)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-ctu-orange hover:bg-orange-600 disabled:opacity-60 text-white rounded-2xl text-sm font-black tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 border-2 border-orange-400"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
                  <span>{loading ? 'Creating account…' : 'CREATE ACCOUNT'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuest}
                  className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-ctu-dark rounded-2xl text-sm font-black tracking-wider transition-all flex items-center justify-center gap-2 border border-gray-200"
                >
                  <span>CONTINUE AS GUEST</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <p className="text-center text-xs text-ctu-muted pt-1 border-t border-gray-100">
            Browsing as guest? You can still view and add items to your cart — we'll ask you to log in at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
