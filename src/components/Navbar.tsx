
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-white p-1" aria-label="Menü">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-quickfix-dark border-quickfix-dark-gray">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <Link to="/" className="flex items-center gap-2 mb-6">
                    <span className="text-quickfix-yellow font-bold text-2xl">
                      Quick<span className="text-white">Fix</span>
                    </span>
                  </Link>
                  
                  <nav className="flex flex-col space-y-4">
                    <MobileNavLink href="#services">Szolgáltatások</MobileNavLink>
                    <MobileNavLink href="#professionals">Szakemberek</MobileNavLink>
                    <MobileNavLink href="#about">Rólunk</MobileNavLink>
                    <MobileNavLink href="#contact">Kapcsolat</MobileNavLink>
                  </nav>
                </div>
                
                <div className="mt-auto border-t border-gray-800 pt-6 pb-8 space-y-4">
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 text-white hover:text-quickfix-yellow"
                  >
                    Bejelentkezés
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center py-3 bg-quickfix-yellow text-quickfix-dark rounded-xl hover:shadow-lg"
                  >
                    Regisztráció
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-lg text-gray-200 py-2 hover:text-quickfix-yellow transition-colors"
    >
      {children}
    </a>
  );
};

export default Navbar;
