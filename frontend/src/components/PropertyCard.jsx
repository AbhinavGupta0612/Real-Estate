import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Maximize2, Heart } from 'lucide-react';
import { formatPrice, typeColors } from '../data/properties';
import { useState } from 'react';

export default function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false);
  const colors = typeColors[property.type];

  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Type Badge */}
        <span className={`absolute top-3 left-3 type-badge ${colors.bg} ${colors.text} border ${colors.border}`}>
          {property.type}
        </span>
        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
            liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>
        {/* Featured */}
        {property.featured && (
          <span className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-display text-xl font-bold text-red-500">
            {formatPrice(property.price)}
          </span>
          {property.area > 0 && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Maximize2 size={12} /> {property.area.toLocaleString()} sq ft
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-gray-900 text-lg leading-snug mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
          <MapPin size={14} className="text-red-400 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Short Desc */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {property.shortDescription}
        </p>

        {/* Stats */}
        {(property.bedrooms > 0 || property.bathrooms > 0) && (
          <div className="flex items-center gap-4 py-3 border-t border-gray-100 mb-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <BedDouble size={15} className="text-gray-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Bath size={15} className="text-gray-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          to={`/property/${property.id}`}
          className="block w-full text-center bg-gray-900 hover:bg-red-500 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
