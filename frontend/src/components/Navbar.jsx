import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building2, Phone } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home', icon: <Home size={15} /> },
    { to: '/listings', label: 'Properties', icon: <Building2 size={15} /> },
    { to: '/contact', label: 'Contact', icon: <Phone size={15} /> },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center shadow-md group-hover:bg-red-600 transition-colors">
            <Building2 size={20} color="white" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">
            Estate<span className="text-red-500">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? 'text-red-500'
                  : scrolled
                  ? 'text-gray-600 hover:text-red-500'
                  : 'text-gray-700 hover:text-red-500'
              }`}
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
          <Link
            to="/listings"
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
          >
            Browse Properties
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 py-2 text-sm font-medium ${
                isActive(l.to) ? 'text-red-500' : 'text-gray-700'
              }`}
            >
              {l.icon} {l.label}
            </Link>
          ))}
          <Link
            to="/listings"
            onClick={() => setOpen(false)}
            className="block bg-red-500 text-white text-center text-sm font-semibold py-3 rounded-lg mt-2"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </nav>
  );
}
