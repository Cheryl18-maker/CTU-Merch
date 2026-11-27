import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X, Check, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLogin, onContinueAsGuest, currentUser }) {
  if (!isOpen) return null;

  const [idOrEmail, setIdOrEmail] = useState(currentUser?.id || 'CTU-2024-08219');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      id: idOrEmail || 'CTU-2024-08219',
      name: idOrEmail.includes('@') ? idOrEmail.split('@')[0] : 'Dominic Magalso',
      role: 'Student',
      isGuest: false
    });
    onClose();
  };

  const handleGuest = () => {
    onContinueAsGuest();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none animate-fadeIn">
      {/* Figma Frame 47:11 Container */}
      <div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col animate-scaleUp relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-7 sm:p-8 space-y-6">
          {/* Login Header (47:12) */}
          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-ctu-orange text-xs font-bold mb-1 border border-orange-200">
              <ShieldCheck size={14} />
              <span>Campus Identity Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ctu-dark tracking-tight">
              Welcome to CTU Merch!
            </h2>
            <p className="text-xs sm:text-sm text-ctu-muted leading-relaxed">
              Log in with your university ID or email to access your account, or continue as a guest to browse merchandise.
            </p>
          </div>

          {/* Form (47:15) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / ID Field (47:16) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                University ID or Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={idOrEmail}
                  onChange={(e) => setIdOrEmail(e.target.value)}
                  placeholder="student@ctu.edu.ph or 2024-001"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                />
              </div>
            </div>

            {/* Password Field (47:22) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-ctu-dark">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ctu-orange/50 focus:bg-white text-ctu-dark transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox (47:30) */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-ctu-orange focus:ring-ctu-orange/40 border-gray-300 accent-ctu-orange"
                />
                <span className="text-xs font-semibold text-ctu-muted">Remember this device</span>
              </label>

              <button
                type="button"
                className="text-xs font-bold text-ctu-orange hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Login Button (47:33) */}
              <button
                type="submit"
                className="w-full py-4 bg-ctu-orange hover:bg-orange-600 active:scale-98 text-white rounded-2xl text-sm font-black tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 border-2 border-orange-400 cursor-pointer"
              >
                <UserCheck size={18} />
                <span>LOG IN</span>
              </button>

              {/* Continue As Guest Button (47:35) */}
              <button
                type="button"
                onClick={handleGuest}
                className="w-full py-4 bg-gray-100 hover:bg-gray-200 active:scale-98 text-ctu-dark rounded-2xl text-sm font-black tracking-wider transition-all flex items-center justify-center gap-2 border border-gray-200 cursor-pointer"
              >
                <span>CONTINUE AS GUEST</span>
              </button>
            </div>
          </form>

          {/* Support Links (47:37) */}
          <div className="pt-2 border-t border-gray-100 text-center space-y-1">
            <p className="text-xs text-ctu-muted">
              No account? You can still browse merchandise without signing in.
            </p>
            <button
              onClick={() => {
                alert("Account registration is available at CTU Registrar or Student Affairs portal.");
              }}
              className="text-xs font-extrabold text-ctu-orange hover:underline"
            >
              Don't have an ID? Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
