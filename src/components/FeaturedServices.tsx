
import React, { useState, useEffect } from 'react';
import Card from './Card';

const FeaturedServices = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard 
            title="Szerelési munkák"
            description="Professzionális szerelői szolgáltatások kedvező áron"
            icon={
              <svg className="w-8 h-8 text-quickfix-yellow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            }
            delay={100}
          />
          
          <ServiceCard 
            title="Helyi szakemberek"
            description="Találj szakembert a közeledben gyorsan és egyszerűen"
            icon={
              <svg className="w-8 h-8 text-quickfix-yellow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"></path>
              </svg>
            }
            delay={200}
          />
          
          <ServiceCard 
            title="Sürgősségi segítség"
            description="Azonnali segítség váratlanul adódó problémákra"
            icon={
              <svg className="w-8 h-8 text-quickfix-yellow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
            }
            delay={300}
          />
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard = ({ title, description, icon, delay }: ServiceCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentElement = document.getElementById(`service-${title}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [title, delay]);
  
  return (
    <div 
      id={`service-${title}`}
      className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <Card variant="feature">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-quickfix-dark mb-6 group-hover:bg-quickfix-yellow/20 transition-colors">
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
          <p className="text-gray-400 mb-6">{description}</p>
          
          <a 
            href="#" 
            className="inline-flex items-center text-quickfix-yellow hover:text-quickfix-green transition-colors"
          >
            <span className="mr-2">Tovább</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedServices;
