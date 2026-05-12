import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Lock, User as UserIcon, ArrowRight, Shield } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-20 px-6">
      <div className="glass p-12 rounded-[3.5rem] space-y-10 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -ml-32 -mt-32"></div>
        
        <div className="text-center space-y-4">
          <div className="bg-primary-600/20 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-600/20 border border-white/5">
            <Shield className="text-primary-400" size={40} />
          </div>
          <h2 className="text-5xl font-black tracking-tight">Welcome back</h2>
          <p className="text-slate-400 text-lg font-medium">Securely access your campus resource dashboard.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl text-sm font-bold text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Username</label>
              <div className="relative group">
                <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-500 transition-all backdrop-blur-md font-bold"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                <input 
                  type="password" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:border-primary-500 transition-all backdrop-blur-md font-bold"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-500 py-6 rounded-3xl font-black uppercase tracking-widest text-sm transition-all shadow-2xl shadow-primary-600/40 hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3"
          >
            {loading ? 'Authenticating...' : (
              <>
                <span>Sign In to Hub</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 font-bold pt-4">
          New to the campus hub? <Link to="/signup" className="text-primary-400 hover:text-primary-300 transition-colors ml-1 underline decoration-primary-400/30 underline-offset-8">Create your profile</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
