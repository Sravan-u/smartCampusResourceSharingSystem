import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutGrid, ShoppingBag, User as UserIcon, LogOut, Award, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="glass px-8 py-4 rounded-[2rem] flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center space-x-2 group">
          <div className="bg-primary-600 w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary-600/30">
            <ShoppingBag className="text-white" size={22} />
          </div>
          <span className="gradient-text">SmartCampus</span>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <Link to="/marketplace" className="text-sm font-semibold text-slate-300 hover:text-white transition-all flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary-600/10 transition-colors">
              <ShoppingBag size={18} className="group-hover:text-primary-400 transition-colors" />
            </div>
            <span>Marketplace</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-semibold text-slate-300 hover:text-white transition-all flex items-center space-x-2 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary-600/10 transition-colors">
                  <LayoutGrid size={18} className="group-hover:text-primary-400 transition-colors" />
                </div>
                <span>Dashboard</span>
              </Link>
              
              <div className="flex items-center space-x-4 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Award size={18} className="animate-pulse" />
                  <span className="font-bold">{user.rewardPoints || 0}</span>
                </div>
                <div className="h-5 w-[1px] bg-white/10"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-xs font-bold shadow-lg">
                    {user.username.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold tracking-tight">{user.username}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="p-2 rounded-xl hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</Link>
              <Link to="/signup" className="bg-primary-600 hover:bg-primary-500 px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-primary-600/30 hover:-translate-y-0.5 active:scale-95">
                Join Community
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-3 rounded-2xl bg-white/5 border border-white/10">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
