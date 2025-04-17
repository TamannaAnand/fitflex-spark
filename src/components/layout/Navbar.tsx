
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FitFlexLogo from '@/components/common/FitFlexLogo';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Workouts', path: '/workouts' },
  { title: 'Progress', path: '/progress' },
  { title: 'Community', path: '/community' },
  { title: 'Profile', path: '/profile' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const currentPath = window.location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FitFlexLogo className="h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={`nav-link ${
                  currentPath === link.path ? 'nav-link-active' : ''
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button className="bg-fitflex-purple hover:bg-fitflex-purple-dark">
              Start Workout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className={`block py-2 ${
                  currentPath === link.path
                    ? 'text-fitflex-purple font-medium'
                    : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Button className="w-full bg-fitflex-purple hover:bg-fitflex-purple-dark">
              Start Workout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
