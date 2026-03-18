import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

const TYPES = ['All', 'Apartment', 'Villa', 'Plot', 'Commercial'];

export default function Listings() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'All';

  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState(initialType);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const t = searchParams.get('type');
    if (t) setSelectedType(t);
  }, [searchParams]);

  const filtered = properties
    .filter((p) => {
      const matchType = selectedType === 'All' || p.type === selectedType;
      const matchQuery =
        query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());
      return matchType && matchQuery;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area') return b.area - a.area;
      return 0;
    });

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-2 block">
            Our Listings
          </span>
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            All Properties
          </h1>
          <p className="text-gray-300 text-sm">
            {filtered.length} properties found
            {selectedType !== 'All' ? ` · ${selectedType}` : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-4 py-2.5">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X size={14} className="text-gray-400 hover:text-red-500" />
                </button>
              )}
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 flex-wrap">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedType === t
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 cursor-pointer bg-white">
                <SlidersHorizontal size={15} className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm text-gray-600 bg-transparent border-none outline-none pr-4 cursor-pointer appearance-none"
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="area">Largest Area</option>
                </select>
                <ChevronDown size={14} className="text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🏚️</div>
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">No Properties Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setQuery(''); setSelectedType('All'); }}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
