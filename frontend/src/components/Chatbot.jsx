import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your SmartCampus Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulated Bot Response
    setTimeout(() => {
      let botResponse = "I'm still learning, but I can help you with bookings and marketplace info!";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('book') || lowerInput.includes('how to')) {
        botResponse = "To book a resource, go to the Marketplace, find an item that is 'AVAILABLE', and click 'Book Now'. You'll find your bookings in your Dashboard!";
      } else if (lowerInput.includes('reward') || lowerInput.includes('point')) {
        botResponse = "You earn reward points by sharing your own resources! For every successful return of an item you shared, you earn 10 points.";
      } else if (lowerInput.includes('h2') || lowerInput.includes('database')) {
        botResponse = "The system uses an H2 in-memory database for development. All data is saved as long as the backend server is running.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] max-h-[600px] h-[80vh] glass rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 backdrop-blur-3xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 p-6 flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-white font-black text-lg">Campus Assistant</h3>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white/70 text-xs font-bold uppercase tracking-widest">AI Powered</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex items-end space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg ${
                    msg.role === 'user' ? 'bg-primary-600' : 'bg-white/10 border border-white/10'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Sparkles className="text-primary-400" size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none shadow-inner'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-white/5">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:border-primary-500 transition-all font-medium text-sm placeholder:text-slate-600"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/30 active:scale-95 disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all shadow-2xl relative group ${
          isOpen ? 'bg-slate-900 border border-white/10 rotate-90' : 'bg-primary-600 hover:bg-primary-500 scale-110'
        }`}
      >
        <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
        {isOpen ? (
          <X className="text-white relative z-10" size={28} />
        ) : (
          <MessageSquare className="text-white relative z-10" size={28} />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
