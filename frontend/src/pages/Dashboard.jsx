import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, CheckCircle, Clock, Award, Package, ShieldCheck, X, Share2, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [myResources, setMyResources] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', description: '', category: 'BOOK' });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, resourcesRes] = await Promise.all([
          axios.get('http://localhost:8080/api/bookings/my', {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get('http://localhost:8080/api/resources/owned/me', {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);
        setBookings(bookingsRes.data);
        setMyResources(resourcesRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.token]);

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/resources', newResource, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Resource added successfully!');
      setShowAddModal(false);
      setNewResource({ title: '', description: '', category: 'BOOK' });
      // Refresh shared items
      const res = await axios.get('http://localhost:8080/api/resources/owned/me', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMyResources(res.data);
    } catch (err) {
      alert('Failed to add resource. Try logging out and back in.');
    }
  };

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMyResources(myResources.filter(r => r.id !== id));
      alert('Resource removed successfully');
    } catch (err) {
      alert('Failed to remove resource');
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/bookings/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Booking completed! Rewards added.');
      window.location.reload();
    } catch (err) {
      alert('Failed to complete booking');
    }
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-5xl font-black tracking-tight">Your Dashboard</h2>
          <p className="text-slate-400 font-medium text-lg">Manage your bookings and shared resources.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 hover:bg-primary-500 px-8 py-4 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 transition-all shadow-2xl shadow-primary-600/30 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          <span>Share Resource</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Column - Bookings & Shared Items */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Active Bookings Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-primary-600/20 p-3 rounded-2xl">
                <Clock className="text-primary-400" size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase tracking-widest text-slate-100">Active Bookings</h3>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <div className="h-32 bg-white/5 animate-pulse rounded-[2rem]"></div>
              ) : bookings.length === 0 ? (
                <div className="glass p-12 rounded-[2.5rem] text-center text-slate-500 border border-dashed border-white/10">
                  No items booked yet.
                </div>
              ) : (
                bookings.map(booking => (
                  <div key={booking.id} className="glass p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 hover:bg-white/[0.05] transition-all shadow-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="text-primary-400" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">{booking.resource.title}</h4>
                        <p className="text-slate-400 text-sm font-medium">Due: {new Date(booking.endTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {booking.status === 'ACTIVE' && (
                      <button 
                        onClick={() => handleComplete(booking.id)}
                        className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-600/20 active:scale-95"
                      >
                        Return Item
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* My Shared Items Section */}
          <section className="space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-purple-600/20 p-3 rounded-2xl">
                <Share2 className="text-purple-400" size={24} />
              </div>
              <h3 className="text-2xl font-black tracking-tight uppercase tracking-widest text-slate-100">My Shared Items</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="h-40 bg-white/5 animate-pulse rounded-[2rem]"></div>
              ) : myResources.length === 0 ? (
                <div className="col-span-2 glass p-12 rounded-[2.5rem] text-center text-slate-500 border border-dashed border-white/10">
                  You aren't sharing any items yet.
                </div>
              ) : (
                myResources.map(resource => (
                  <div key={resource.id} className="glass p-8 rounded-[2rem] border border-white/10 hover:bg-white/[0.05] transition-all flex flex-col justify-between group shadow-xl">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-slate-300">
                          {resource.category}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${resource.status === 'AVAILABLE' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]'}`}></div>
                      </div>
                      <h4 className="font-bold text-2xl mb-3 group-hover:text-primary-400 transition-colors">{resource.title}</h4>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed mb-6">{resource.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Status: <span className={resource.status === 'AVAILABLE' ? 'text-green-400' : 'text-red-400'}>{resource.status}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteResource(resource.id)}
                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-lg shadow-red-500/5"
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>

        {/* Sidebar - Rewards */}
        <div className="space-y-8">
          <div className="glass p-12 rounded-[3.5rem] space-y-8 border border-white/10 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 blur-3xl rounded-full"></div>
            <div className="bg-yellow-400/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-2xl shadow-yellow-400/10 border border-white/5">
              <Award className="text-yellow-400" size={40} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-widest text-slate-400 uppercase">Reward Points</h3>
              <div className="text-8xl font-black text-yellow-400 drop-shadow-[0_10px_20px_rgba(250,204,21,0.3)] tabular-nums">{user.rewardPoints || 0}</div>
            </div>
            <div className="pt-8 border-t border-white/5 space-y-4 text-left">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Quick Tips</p>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span className="font-medium">Earn 10 points per return</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span className="font-medium">Redeem for campus perks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl animate-fade-in" onClick={() => setShowAddModal(false)}></div>
          <div className="glass w-full max-w-xl p-12 rounded-[3.5rem] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in slide-in-from-bottom-8 duration-300">
            <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-black tracking-tight text-white">Share a Resource</h3>
                <p className="text-slate-400 font-medium">Add an item to the marketplace for others to use.</p>
              </div>
              <form onSubmit={handleAddResource} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-2">Title</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-primary-500 outline-none font-bold text-lg backdrop-blur-md"
                    placeholder="e.g. Calculus Textbook"
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-2">Description</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-primary-500 outline-none h-32 resize-none font-medium backdrop-blur-md"
                    placeholder="Details about the item..."
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-2">Category</label>
                  <select 
                    className="w-full bg-slate-950 border border-white/20 rounded-2xl px-6 py-5 focus:border-white outline-none font-bold appearance-none cursor-pointer text-white"
                    value={newResource.category}
                    onChange={(e) => setNewResource({...newResource, category: e.target.value})}
                  >
                    <option value="BOOK" className="bg-slate-950">Book</option>
                    <option value="EQUIPMENT" className="bg-slate-950">Lab Equipment</option>
                    <option value="GEAR" className="bg-slate-950">Sports Gear</option>
                    <option value="OTHER" className="bg-slate-950">Other</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 py-6 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-primary-600/30 transition-all active:scale-95 text-lg mt-4">
                  Confirm & Share
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
