
import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, Star, Filter, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface ServiceProps {
  onBack?: () => void;
}

const Services: React.FC<ServiceProps> = ({ onBack }) => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Dummy data for services - in a real app this would come from Supabase
    const dummyServices = [
      {
        id: 1,
        title: 'Villanyszerelés',
        provider: 'Gyors Villany Kft.',
        location: 'Budapest',
        rating: 4.8,
        price: '15000-25000 Ft',
        category: 'electrical',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop'
      },
      {
        id: 2,
        title: 'Vízvezeték szerelés',
        provider: 'Csőguru Bt.',
        location: 'Debrecen',
        rating: 4.5,
        price: '20000-30000 Ft',
        category: 'plumbing',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 3,
        title: 'Festés-mázolás',
        provider: 'Színkavalkád Kft.',
        location: 'Szeged',
        rating: 4.7,
        price: '2500-3500 Ft/m²',
        category: 'painting',
        image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=2012&auto=format&fit=crop'
      },
      {
        id: 4,
        title: 'Bútorszerelés',
        provider: 'Lakberendező Kft.',
        location: 'Pécs',
        rating: 4.3,
        price: '10000-20000 Ft',
        category: 'furniture',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop'
      },
      {
        id: 5,
        title: 'Kertgondozás',
        provider: 'Zöld Paradicsom Bt.',
        location: 'Győr',
        rating: 4.9,
        price: '5000-8000 Ft/óra',
        category: 'gardening',
        image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2070&auto=format&fit=crop'
      },
      {
        id: 6,
        title: 'Klímaszerelés',
        provider: 'Hűvös Szellő Kft.',
        location: 'Budapest',
        rating: 4.6,
        price: '25000-40000 Ft',
        category: 'electrical',
        image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop'
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setServices(dummyServices);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter services based on category and search query
  const filteredServices = services.filter(service => {
    const matchesCategory = filter === 'all' || service.category === filter;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-in">
      {onBack && (
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Vissza
        </Button>
      )}
      
      <div className="rounded-lg border border-gray-800 bg-quickfix-dark-gray p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-quickfix-yellow">Szolgáltatások</h2>
        
        {/* Search and filter bar */}
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Keresés szolgáltatás, szolgáltató vagy helyszín alapján..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex w-full flex-row space-x-2 md:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Kategória" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Összes kategória</SelectItem>
                <SelectItem value="electrical">Villanyszerelés</SelectItem>
                <SelectItem value="plumbing">Vízvezeték szerelés</SelectItem>
                <SelectItem value="painting">Festés-mázolás</SelectItem>
                <SelectItem value="furniture">Bútorszerelés</SelectItem>
                <SelectItem value="gardening">Kertgondozás</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Services grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-quickfix-yellow border-t-transparent"></div>
          </div>
        ) : (
          <>
            {filteredServices.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <ShoppingBag className="mb-4 h-12 w-12 text-gray-400" />
                <h3 className="text-xl font-semibold">Nem találtunk szolgáltatást</h3>
                <p className="mt-2 text-gray-400">Próbálja meg módosítani a keresési feltételeket</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden bg-quickfix-dark border-gray-700 transition-all hover:border-quickfix-yellow">
                    <div className="relative h-48 w-full">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <Badge variant="outline" className="bg-quickfix-dark-gray">
                          <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {service.rating}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">{service.provider}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-gray-400">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span className="text-sm">{service.location}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-quickfix-yellow">{service.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Kapcsolatfelvétel</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
