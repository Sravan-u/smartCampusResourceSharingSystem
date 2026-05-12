import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent opacity-50"></div>
      
      <div className="glass w-full max-w-md p-12 rounded-[3.5rem] space-y-10 border border-white/10 shadow-2xl relative z-10 backdrop-blur-3xl">
        <div className="text-center space-y-4">
          <div className="bg-primary-600/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary-600/10 border border-white/5">
            <LogIn className="text-primary-400" size={36} />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white">Welcome Back</h2>
          <p className="text-slate-400 font-medium">Log in to your campus account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl text-sm font-bold text-center animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-500 transition-all font-medium placeholder:text-slate-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-500 transition-all font-medium placeholder:text-slate-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-primary-600/30 flex items-center justify-center space-x-3 active:scale-95 group"
          >
            <span>Sign In Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-slate-500 text-sm font-bold">
            New here?{' '}
            <Link to="/signup" className="text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
