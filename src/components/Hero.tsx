
import React, { useState, useEffect } from 'react';
import Button from './Button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-quickfix-dark to-quickfix-dark-gray"></div>
        
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '60px 60px' }}></div>
        </div>
        
        {/* Yellow accent */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-quickfix-yellow/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-quickfix-green/20 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div 
            className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block mb-2">Üdvözöljük a</span>
              <span className="text-gradient">QuickFix-nél!</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Miben segíthetünk ma?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 my-12">
              <ServiceButton 
                title="Segítségre van szükségem" 
                icon={
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path>
                    <path d="m9 10 2 2 4-4"></path>
                  </svg>
                }
                delay={100}
              />
              
              <ServiceButton 
                title="Segítek" 
                icon={
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                }
                delay={200}
              />
              
              <ServiceButton 
                title="Keresés" 
                icon={
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                }
                delay={300}
              />
            </div>
            
            <div
              className={`transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <h2 className="text-2xl font-bold mb-8">Kiemelt ajánlatok</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ServiceButtonProps {
  title: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceButton = ({ title, icon, delay }: ServiceButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <button className="w-full bg-quickfix-dark-gray border border-gray-700 hover:border-quickfix-yellow rounded-xl p-6 group hover-card transition-all">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center bg-quickfix-yellow rounded-full mb-4 text-quickfix-dark group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className="text-white font-medium">{title}</span>
        </div>
      </button>
    </div>
  );
};

export default Hero;
