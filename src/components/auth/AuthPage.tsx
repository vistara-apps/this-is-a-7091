import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-md">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface/50 backdrop-blur-sm border border-surface/50 rounded-card p-xl shadow-modal">
          {/* Logo/Brand */}
          <div className="text-center mb-lg">
            <div className="gradient-bg w-16 h-16 rounded-card mx-auto mb-md flex items-center justify-center">
              <span className="text-2xl font-bold text-white">TT</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary">Token Tracker Pro</h1>
          </div>

          {/* Auth Forms */}
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>

        {/* Demo credentials */}
        <div className="mt-lg p-md bg-surface/30 backdrop-blur-sm border border-surface/30 rounded-card">
          <p className="text-xs text-text-secondary text-center mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-xs text-text-secondary text-center">
            Email: demo@example.com | Password: demo123
          </p>
        </div>
      </div>
    </div>
  );
};
