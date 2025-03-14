
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-quickfix-dark/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-quickfix-yellow font-bold text-2xl">
            Quick<span className="text-white">Fix</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#services">Szolgáltatások</NavLink>
          <NavLink href="#professionals">Szakemberek</NavLink>
          <NavLink href="#about">Rólunk</NavLink>
          <NavLink href="#contact">Kapcsolat</NavLink>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="hidden md:block text-white hover:text-quickfix-yellow transition-colors"
          >
            Bejelentkezés
          </Link>
          <Link 
            to="/signup" 
            className="hidden md:flex items-center justify-center px-4 py-2 bg-quickfix-yellow text-quickfix-dark rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            <span>Regisztráció</span>
          </Link>
          
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href}
      className="text-gray-200 hover:text-quickfix-yellow transition-colors duration-300 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-quickfix-yellow group-hover:w-full transition-all duration-300"></span>
    </a>
  );
};

export default Navbar;
