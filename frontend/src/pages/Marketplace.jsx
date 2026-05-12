import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Book, Wrench, Dumbbell, Calendar, ChevronRight } from 'lucide-react';

const Marketplace = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const { user } = useAuth();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/resources');
        setResources(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleBook = async (id) => {
    if (!user) {
      alert('Please login to book resources');
      return;
    }
    try {
      const startTime = new Date().toISOString();
      const endTime = new Date(Date.now() + 3600000).toISOString();
      await axios.post(`http://localhost:8080/api/bookings/resource/${id}`,
        { startTime, endTime },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert('Booking successful!');
      window.location.reload();
    } catch (err) {
      alert('Booking failed. Resource may be unavailable.');
    }
  };

  const categories = ['ALL', 'BOOK', 'EQUIPMENT', 'GEAR', 'OTHER'];

  const filteredResources = resources.filter(r =>
    (activeCategory === 'ALL' || r.category === activeCategory) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-5xl font-black tracking-tight">Marketplace</h2>
            <p className="text-slate-400 font-medium">Discover and book campus resources in seconds.</p>
          </div>
          <div className="relative w-full max-w-md group">
            <div className="absolute inset-0 bg-primary-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search books, gear, tools..."
              className="relative w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary-500 transition-all backdrop-blur-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border ${activeCategory === cat
                  ? 'bg-primary-600 border-primary-500 shadow-lg shadow-primary-600/30 text-white'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-white/5 animate-pulse rounded-[2.5rem] border border-white/10"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredResources.map(resource => (
            <div key={resource.id} className="glass rounded-[2.5rem] overflow-hidden hover:bg-white/[0.07] transition-all group border border-white/10 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-600/10">
              <div className="h-56 bg-slate-900/50 relative overflow-hidden">
                {resource.imageUrl ? (
                  <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700 bg-gradient-to-br from-slate-900 to-slate-950">
                    {resource.category === 'BOOK' && <Book size={80} strokeWidth={1} />}
                    {resource.category === 'EQUIPMENT' && <Wrench size={80} strokeWidth={1} />}
                    {resource.category === 'GEAR' && <Dumbbell size={80} strokeWidth={1} />}
                  </div>
                )}
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-2xl">
                  {resource.category}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">{resource.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{resource.description}</p>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${resource.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    <span className={`text-xs font-black uppercase tracking-widest ${resource.status === 'AVAILABLE' ? 'text-green-400' : 'text-red-400'
                      }`}>
                      {resource.status}
                    </span>
                  </div>

                  {resource.status === 'AVAILABLE' && (
                    <button
                      onClick={() => handleBook(resource.id)}
                      className="bg-primary-600 hover:bg-primary-500 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-lg shadow-primary-600/20 active:scale-95"
                    >
                      <span>Book</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredResources.length === 0 && !loading && (
        <div className="text-center py-20 glass rounded-[3rem] border border-dashed border-white/10">
          <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-slate-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No resources found</h3>
          <p className="text-slate-500">Try searching for something else or change the category.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
