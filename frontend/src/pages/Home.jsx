import { Link } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Shield, Award, ChevronRight, ArrowRight, Phone } from 'lucide-react';
import { properties, formatPrice } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const featured = properties.filter((p) => p.featured);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero-gradient relative min-h-screen flex items-center pt-20">
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-red-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-red-500/30">
              🏠 India's #1 Property Platform
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Find Your
              <span className="block text-red-400">Dream Home</span>
              In India
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
              Discover premium apartments, villas, plots and commercial spaces across India's top cities. Your perfect property is just a click away.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-2xl max-w-lg mb-8">
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin size={18} className="text-red-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by city, locality..."
                  className="flex-1 text-sm text-gray-700 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
              <Link
                to="/listings"
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors shrink-0"
              >
                <Search size={16} /> Search
              </Link>
            </div>

            {/* Quick filters */}
            <div className="flex flex-wrap gap-2">
              {['Apartment', 'Villa', 'Plot', 'Commercial'].map((t) => (
                <Link
                  key={t}
                  to={`/listings?type=${t}`}
                  className="px-4 py-1.5 bg-white/10 hover:bg-red-500/30 text-white text-sm rounded-full border border-white/20 transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Hero Cards */}
          <div className="hidden md:block relative">
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 w-52 fade-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-xs text-gray-400 mb-1">Starting From</p>
              <p className="font-display font-bold text-xl text-red-500">₹28 Lakhs</p>
              <p className="text-xs text-gray-500 mt-1">Studio Apartments</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80"
              alt="Luxury Property"
              className="w-full rounded-3xl shadow-2xl object-cover h-[480px]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 w-52 fade-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-xs text-gray-400 mb-1">Properties Sold</p>
              <p className="font-display font-bold text-2xl text-gray-900">12,400+</p>
              <p className="text-xs text-gray-500">Happy Families</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15,000+', label: 'Properties Listed' },
              { value: '8,200+', label: 'Happy Clients' },
              { value: '25+', label: 'Cities Covered' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-red-500 mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2 block">Our Listings</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 accent-underline">
                Featured Properties
              </h2>
            </div>
            <Link to="/listings" className="hidden md:flex items-center gap-2 text-red-500 font-semibold text-sm hover:gap-3 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/listings" className="inline-flex items-center gap-2 text-red-500 font-semibold">
              View All Properties <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROPERTY TYPES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2 block">Browse By</span>
            <h2 className="font-display text-4xl font-bold text-gray-900">Property Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { type: 'Apartment', icon: '🏢', count: '4,800+', color: 'from-blue-50 to-blue-100', accent: 'text-blue-600' },
              { type: 'Villa',     icon: '🏡', count: '2,100+', color: 'from-emerald-50 to-emerald-100', accent: 'text-emerald-600' },
              { type: 'Plot',      icon: '📐', count: '3,500+', color: 'from-purple-50 to-purple-100', accent: 'text-purple-600' },
              { type: 'Commercial',icon: '🏬', count: '1,900+', color: 'from-amber-50 to-amber-100', accent: 'text-amber-600' },
            ].map((c) => (
              <Link
                key={c.type}
                to={`/listings?type=${c.type}`}
                className={`card-hover bg-gradient-to-br ${c.color} rounded-2xl p-6 text-center border border-gray-100`}
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className={`font-display font-bold text-lg ${c.accent} mb-1`}>{c.type}</h3>
                <p className="text-gray-500 text-sm">{c.count} listings</p>
                <div className={`mt-3 flex items-center justify-center gap-1 ${c.accent} text-xs font-semibold`}>
                  Explore <ChevronRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-red-500 text-sm font-semibold tracking-widest uppercase mb-2 block">Why EstateHub</span>
            <h2 className="font-display text-4xl font-bold text-gray-900">Your Trust, Our Priority</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={28} />, title: 'Verified Listings', desc: 'Every property is verified by our experts. No fake listings, ever.' },
              { icon: <TrendingUp size={28} />, title: 'Best Market Prices', desc: 'Get properties at competitive prices with our market intelligence.' },
              { icon: <Award size={28} />, title: 'Award-Winning Service', desc: '10+ years of excellence. Trusted by 8,000+ families across India.' },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-5">
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your <span className="text-red-400">Perfect Home?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Talk to our expert agents today. Free consultation, zero commission from buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-red-500/30"
            >
              Browse Properties
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 justify-center"
            >
              <Phone size={18} /> Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
