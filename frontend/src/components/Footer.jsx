import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center">
                <Building2 size={20} color="white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Estate<span className="text-red-400">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              India's most trusted real estate platform. Find your dream home, commercial space, or investment plot with us.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/listings', label: 'All Properties' },
                { to: '/listings?type=Apartment', label: 'Apartments' },
                { to: '/listings?type=Villa', label: 'Villas' },
                { to: '/listings?type=Plot', label: 'Plots' },
                { to: '/listings?type=Commercial', label: 'Commercial' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-red-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Top Cities</h4>
            <ul className="space-y-3 text-sm">
              {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Noida', 'Pune'].map((city) => (
                <li key={city}>
                  <a href="#" className="hover:text-red-400 transition-colors">{city}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-red-400 mt-0.5 shrink-0" />
                <span>
                  5th Floor, Tech Park Tower,<br />
                  Sector 62, Noida, Uttar Pradesh - 201309
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-red-400 shrink-0" />
                <a href="tel:+911800123456" className="hover:text-red-400 transition-colors">+91 1800 123 456</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-red-400 shrink-0" />
                <a href="mailto:hello@estatehub.in" className="hover:text-red-400 transition-colors">hello@estatehub.in</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2026 EstateHub. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}