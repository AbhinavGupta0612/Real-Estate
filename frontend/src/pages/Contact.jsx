import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-2 block">Get In Touch</span>
          <h1 className="font-display text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Info cards */}
          <div className="space-y-5">
            {[
              { icon: <Phone size={22} />, title: 'Call Us', lines: ['+91 1800 123 456', 'Mon–Sat 9AM–8PM'] },
              { icon: <Mail size={22} />, title: 'Email Us', lines: ['hello@estatehub.in', 'support@estatehub.in'] },
              { icon: <MapPin size={22} />, title: 'Visit Us', lines: ['12th Floor, Skyline Tower,', 'BKC, Mumbai – 400051'] },
              { icon: <Clock size={22} />, title: 'Working Hours', lines: ['Mon – Sat: 9AM – 8PM', 'Sunday: 10AM – 5PM'] },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1 text-sm">{c.title}</p>
                  {c.lines.map((l) => <p key={l} className="text-gray-500 text-xs">{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2 accent-underline">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mt-6 mb-8">Our team will get back to you within 24 hours.</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }}
                  className="mt-5 text-sm text-green-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                    <input
                      type="text" required placeholder="John Doe"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                    <input
                      type="email" required placeholder="john@email.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel" placeholder="+91 98765 43210"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Subject</label>
                    <select
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600"
                    >
                      <option value="">Select a topic</option>
                      <option>Buy a Property</option>
                      <option>Sell a Property</option>
                      <option>Rent a Property</option>
                      <option>Investment Advice</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message *</label>
                  <textarea
                    rows={5} required placeholder="Tell us how we can help you..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-red-200"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
