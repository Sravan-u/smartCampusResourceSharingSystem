import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Wrench, Dumbbell, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/hero.png';

const Home = () => {
  const features = [
    { icon: <Book className="text-blue-400" />, title: 'Shared Knowledge', desc: 'Borrow and lend academic books across campus.' },
    { icon: <Wrench className="text-green-400" />, title: 'Lab Equipment', desc: 'Book scientific instruments and technical tools.' },
    { icon: <Dumbbell className="text-purple-400" />, title: 'Sports Gear', desc: 'Access sports equipment for your next match.' },
    { icon: <ShieldCheck className="text-red-400" />, title: 'Safe & Secure', desc: 'QR-based verification ensures trust and safety.' },
  ];

  return (
    <div className="space-y-32 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse-slow delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto px-6 mt-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium text-primary-400 animate-fade-in shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Active Campus Sharing Hub</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1] animate-slide-up opacity-0 [animation-fill-mode:forwards]">
            Share Resources, <br />
            <span className="gradient-text">Build Community</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl animate-slide-up delay-100 opacity-0 [animation-fill-mode:forwards]">
            The ultimate campus sharing platform. Book equipment, share books, and earn rewards for contributing to your campus ecosystem.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 animate-slide-up delay-200 opacity-0 [animation-fill-mode:forwards]">
            <Link to="/marketplace" className="bg-primary-600 hover:bg-primary-500 px-10 py-5 rounded-2xl font-bold text-lg flex items-center space-x-3 transition-all group shadow-2xl shadow-primary-600/40 hover:-translate-y-1">
              <span>Explore Marketplace</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/signup" className="glass px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all hover:-translate-y-1">
              Start Sharing
            </Link>
          </div>
        </div>
        
        <div className="flex-1 relative animate-float w-full max-w-2xl">
          <div className="absolute -inset-4 bg-primary-500/20 blur-3xl rounded-full opacity-50"></div>
          <img 
            src={heroImg} 
            alt="Campus Sharing" 
            className="relative rounded-[2.5rem] shadow-2xl border border-white/10 w-full object-cover aspect-[4/3] backdrop-blur-sm"
          />
          {/* Floating Stats Card */}
          <div className="absolute -bottom-8 -left-8 glass p-6 rounded-3xl shadow-2xl animate-float-delayed border border-white/20 hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500/20 p-4 rounded-2xl">
                <ShieldCheck className="text-green-400" size={28} />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Verified Assets</p>
                <p className="text-2xl font-black">1.2k+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Everything you need</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Discover a new way to interact with your campus resources and fellow students through our integrated ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass p-10 rounded-[2.5rem] hover:bg-white/5 transition-all hover:-translate-y-2 group border border-white/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary-500/10 blur-2xl rounded-full group-hover:bg-primary-500/20 transition-colors"></div>
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/10 shadow-inner">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="glass rounded-[4rem] p-16 flex flex-wrap justify-around items-center gap-16 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-purple-600/5 pointer-events-none"></div>
          <div className="relative">
            <div className="text-6xl font-black gradient-text">1,200+</div>
            <div className="text-slate-400 mt-3 font-medium uppercase tracking-wider">Active Resources</div>
          </div>
          <div className="relative">
            <div className="text-6xl font-black gradient-text">5k+</div>
            <div className="text-slate-400 mt-3 font-medium uppercase tracking-wider">Campus Users</div>
          </div>
          <div className="relative">
            <div className="text-6xl font-black gradient-text">150+</div>
            <div className="text-slate-400 mt-3 font-medium uppercase tracking-wider">Daily Bookings</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
