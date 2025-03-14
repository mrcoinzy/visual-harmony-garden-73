
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-quickfix-dark-gray">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="text-quickfix-yellow font-bold text-2xl">
                Quick<span className="text-white">Fix</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Szakemberek és szolgáltatások gyorsan, egyszerűen, megbízhatóan.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Szolgáltatások</h3>
            <ul className="space-y-2">
              <FooterLink href="#szerelesi-munkak">Szerelési munkák</FooterLink>
              <FooterLink href="#helyi-szakemberek">Helyi szakemberek</FooterLink>
              <FooterLink href="#surgossegi-segitseg">Sürgősségi segítség</FooterLink>
              <FooterLink href="#ajanlatok">Kiemelt ajánlatok</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Információk</h3>
            <ul className="space-y-2">
              <FooterLink href="#rolunk">Rólunk</FooterLink>
              <FooterLink href="#gyik">Gyakori kérdések</FooterLink>
              <FooterLink href="#feltetelak">Feltételek</FooterLink>
              <FooterLink href="#adatvedelem">Adatvédelmi irányelvek</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Kapcsolat</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                <span className="block font-medium text-gray-300">Email:</span>
                info@quickfix.hu
              </li>
              <li className="text-gray-400 text-sm">
                <span className="block font-medium text-gray-300">Telefon:</span>
                +36 1 234 5678
              </li>
              <li className="text-gray-400 text-sm mt-4">
                <span className="block font-medium text-gray-300">Cím:</span>
                1024 Budapest, Fő utca 1.
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} QuickFix. Minden jog fenntartva.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <SocialIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialIcon>
            <SocialIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </SocialIcon>
            <SocialIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4c0 1.1-.9 2-2 2a19.65 19.65 0 0 1-6.3 3.7A19.6 19.6 0 0 1 8 16a19.65 19.65 0 0 1-6.3-3.7 2 2 0 0 1 .9-3.76A19.4 19.4 0 0 1 8 2c2.8 0 5.3.5 7.7 1.54a2 2 0 0 1 6.3 1.46v1Z"></path>
                <path d="M15.5 9h.01"></path>
                <path d="M16.5 12h.01"></path>
                <path d="M17.5 15h.01"></path>
                <path d="M18.5 18h.01"></path>
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-quickfix-yellow transition-colors duration-300 text-sm"
      >
        {children}
      </a>
    </li>
  );
};

const SocialIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <a 
      href="#" 
      className="flex items-center justify-center w-10 h-10 rounded-full bg-quickfix-dark-gray border border-gray-700 text-gray-400 hover:text-quickfix-yellow hover:border-quickfix-yellow transition-colors duration-300"
    >
      {children}
    </a>
  );
};

export default Footer;
