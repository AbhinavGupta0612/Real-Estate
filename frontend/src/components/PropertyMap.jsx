import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon broken in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const locationCoords = {
  "Bandra West, Mumbai":        { lat: 19.0596, lng: 72.8295 },
  "Whitefield, Bangalore":      { lat: 12.9698, lng: 77.7500 },
  "Connaught Place, New Delhi": { lat: 28.6315, lng: 77.2167 },
  "Sector 62, Noida":           { lat: 28.6270, lng: 77.3750 },
  "Jubilee Hills, Hyderabad":   { lat: 17.4324, lng: 78.4071 },
  "Koramangala, Bangalore":     { lat: 12.9352, lng: 77.6245 },
};

export default function PropertyMap({ location }) {
  const mapRef  = useRef(null);
  const mapInst = useRef(null);

  const coords = locationCoords[location] || { lat: 20.5937, lng: 78.9629 };

  useEffect(() => {
    if (mapInst.current) return;

    mapInst.current = L.map(mapRef.current, {
      center:          [coords.lat, coords.lng],
      zoom:            14,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapInst.current);

    const redIcon = L.divIcon({
      className: '',
      html: `<div style="
        width:20px; height:20px;
        background:#e63946;
        border:3px solid white;
        border-radius:50%;
        box-shadow:0 2px 8px rgba(230,57,70,0.6);
      "></div>`,
      iconSize:    [20, 20],
      iconAnchor:  [10, 10],
      popupAnchor: [0, -14],
    });

    L.marker([coords.lat, coords.lng], { icon: redIcon })
      .addTo(mapInst.current)
      .bindPopup(`<b style="color:#e63946">📍 ${location}</b>`)
      .openPopup();

    return () => {
      mapInst.current.remove();
      mapInst.current = null;
    };
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <MapPin size={15} className="text-red-400" />
        <span>{location}</span>
      </div>
      <div
        ref={mapRef}
        style={{
          height:       '320px',
          borderRadius: '12px',
          overflow:     'hidden',
          border:       '1px solid #ede8e3',
          zIndex:        1,
        }}
      />
    </div>
  );
}
