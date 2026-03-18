import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  MapPin, BedDouble, Bath, Maximize2, ArrowLeft,
  Phone, Mail, CheckCircle2, Heart, Share2,
  Home, Wifi, Car, Dumbbell, Droplets, Zap,
  Shield, Trees, Star, Send, Map
} from 'lucide-react';
import { properties, formatPrice, typeColors } from '../data/properties';
import PropertyMap from '../components/PropertyMap';

const amenityIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('pool'))    return <Droplets size={16} />;
  if (n.includes('gym') || n.includes('fitness')) return <Dumbbell size={16} />;
  if (n.includes('park') || n.includes('car'))  return <Car size={16} />;
  if (n.includes('security')) return <Shield size={16} />;
  if (n.includes('power') || n.includes('solar') || n.includes('electric')) return <Zap size={16} />;
  if (n.includes('garden') || n.includes('green')) return <Trees size={16} />;
  if (n.includes('internet') || n.includes('wifi') || n.includes('fiber')) return <Wifi size={16} />;
  return <CheckCircle2 size={16} />;
};

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === Number(id));

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-20">
        <div className="text-6xl">🏚️</div>
        <h2 className="font-display text-2xl font-bold">Property Not Found</h2>
        <Link to="/listings" className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold text-sm">
          Back to Listings
        </Link>
      </div>
    );
  }

  const colors = typeColors[property.type];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const related = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 2);

  return (
    <main className="min-h-screen bg-cream pt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-red-500 flex items-center gap-1"><Home size={14} /> Home</Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-red-500">Properties</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
            >
              <ArrowLeft size={16} /> Back to Listings
            </button>

            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-[420px]">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Overlays */}
              <div className="absolute top-5 left-5 flex gap-2">
                <span className={`type-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
                  {property.type}
                </span>
                {property.featured && (
                  <span className="type-badge bg-red-500 text-white border-red-500">⭐ Featured</span>
                )}
              </div>

              <div className="absolute top-5 right-5 flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                    liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-gray-600 hover:bg-gray-100 backdrop-blur-sm">
                  <Share2 size={18} />
                </button>
              </div>

              <div className="absolute bottom-5 left-5">
                <p className="font-display text-3xl font-bold text-white">{formatPrice(property.price)}</p>
              </div>
            </div>

            {/* Title + Location */}
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <MapPin size={16} className="text-red-400 shrink-0" />
                {property.location}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {property.bedrooms > 0 && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
                    <BedDouble size={22} className="text-red-400 mx-auto mb-1.5" />
                    <p className="font-bold text-gray-900">{property.bedrooms}</p>
                    <p className="text-xs text-gray-400">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
                    <Bath size={22} className="text-red-400 mx-auto mb-1.5" />
                    <p className="font-bold text-gray-900">{property.bathrooms}</p>
                    <p className="text-xs text-gray-400">Bathrooms</p>
                  </div>
                )}
                {property.area > 0 && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
                    <Maximize2 size={22} className="text-red-400 mx-auto mb-1.5" />
                    <p className="font-bold text-gray-900">{property.area.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Sq. Ft.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-4 accent-underline">
                About this Property
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm mt-6">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-6 accent-underline">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {property.amenities.map((a) => (
                  <div key={a} className="amenity-chip">
                    <span className="text-red-400">{amenityIcon(a)}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Map */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-6 accent-underline">
                Location on Map
              </h2>
              <div className="mt-6">
                <PropertyMap location={property.location} />
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-1 space-y-6">
            {/* Agent Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-lg font-display shadow-md">
                  {property.agent.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{property.agent.name}</p>
                  <p className="text-xs text-gray-400">Property Agent</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={11} className="text-amber-400 fill-amber-400" />)}
                    <span className="text-xs text-gray-400 ml-1">5.0</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-colors"
                >
                  <Phone size={16} /> {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold transition-colors"
                >
                  <Mail size={16} /> {property.agent.email}
                </a>
              </div>

              {/* Inquiry Form */}
              <div>
                <h3 className="font-display font-bold text-gray-900 mb-4">Send Inquiry</h3>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                    <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2" />
                    <p className="font-semibold text-green-800 text-sm">Inquiry Sent!</p>
                    <p className="text-green-600 text-xs mt-1">Our agent will reach out to you shortly.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-3 text-xs text-green-600 underline"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
                    />
                    <textarea
                      rows={3}
                      placeholder="Your message (optional)..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-red-500 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send size={15} /> Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 accent-underline">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {related.map((p) => (
                <div key={p.id} className="card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex gap-4">
                  <img src={p.image} alt={p.title} className="w-36 h-full object-cover shrink-0" />
                  <div className="py-4 pr-4 flex flex-col justify-between">
                    <div>
                      <span className={`type-badge ${typeColors[p.type].bg} ${typeColors[p.type].text} text-xs mb-2 inline-block`}>{p.type}</span>
                      <h4 className="font-display font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{p.title}</h4>
                      <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={11} /> {p.location}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-red-500 text-sm">{formatPrice(p.price)}</span>
                      <Link to={`/property/${p.id}`} className="text-xs text-red-500 font-semibold hover:underline">View →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
