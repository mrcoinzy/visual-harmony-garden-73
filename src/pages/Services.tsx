
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Search, Filter, Star, ExternalLink, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for professional services
const professionals = [
  {
    id: 1,
    name: "Kovács János",
    avatar: "/assets/avatar-1.png",
    profession: "Vízvezeték-szerelő",
    description: "10+ év tapasztalat vízvezeték szerelés és javítás területén. Gyors és megbízható munkavégzés.",
    rating: 4.8,
    reviewCount: 124,
    priceRange: "15.000 - 25.000 Ft",
    availability: "2-3 nap",
    location: "Budapest",
    services: ["Csaptelep csere", "Vízvezeték javítás", "Duguláselhárítás", "WC/Bidé szerelés"],
    featured: true
  },
  {
    id: 2,
    name: "Nagy Béla",
    avatar: "/assets/avatar-2.png",
    profession: "Villanyszerelő",
    description: "Villanyszerelési munkák teljes körű kivitelezése. Hibaelhárítástól a teljes felújításig minden területen.",
    rating: 4.5,
    reviewCount: 98,
    priceRange: "18.000 - 30.000 Ft",
    availability: "1-2 nap",
    location: "Budapest",
    services: ["Kapcsolók és konnektorok", "Lámpák felszerelése", "Hibaelhárítás", "Biztosítéktábla"]
  },
  {
    id: 3,
    name: "Szabó Péter",
    avatar: "/assets/avatar-3.png",
    profession: "Bútorasztalos",
    description: "Bútorok összeszerelése, javítása és egyedi bútorok készítése. IKEA és egyéb bútorok szakszerű összeszerelése.",
    rating: 4.6,
    reviewCount: 87,
    priceRange: "12.000 - 20.000 Ft",
    availability: "3-4 nap",
    location: "Budapest",
    services: ["Bútor összeszerelés", "Bútor javítás", "Konyhabútor szerelés", "Egyedi bútorok"]
  },
  {
    id: 4,
    name: "Tóth Katalin",
    avatar: "/assets/avatar-4.png",
    profession: "Festő",
    description: "Lakások és irodák festése, mázolása. Tapétázás és dekorációs munkák. Minőségi munka, tiszta kivitelezés.",
    rating: 4.9,
    reviewCount: 156,
    priceRange: "20.000 - 35.000 Ft/nap",
    availability: "5-7 nap",
    location: "Budapest és környéke",
    services: ["Festés", "Mázolás", "Tapétázás", "Glettelés"],
    featured: true
  }
];

// Mock data for stores/shops
const shops = [
  {
    id: 1,
    name: "ToolMaster",
    logo: "https://placehold.co/100x100/orange/white?text=TM",
    type: "Szerszámáruház",
    description: "Minőségi szerszámok otthoni és professzionális felhasználásra. Kéziszerszámok, elektromos és akkumulátoros gépek.",
    rating: 4.7,
    reviewCount: 213,
    location: "Budapest, Váci út 15",
    openHours: "H-P: 8:00-18:00, Szo: 9:00-13:00",
    website: "https://example.com/toolmaster",
    featured: true,
    discount: "20% kedvezmény minden akkumulátoros gépre"
  },
  {
    id: 2,
    name: "Home Depot",
    logo: "https://placehold.co/100x100/blue/white?text=HD",
    type: "Barkácsáruház",
    description: "Minden ami az otthonfelújításhoz kell. Festékek, építőanyagok, szerszámok és dekorációs termékek széles választéka.",
    rating: 4.5,
    reviewCount: 187,
    location: "Budapest, Kerepesi út 78",
    openHours: "H-P: 7:00-20:00, Szo-V: 8:00-17:00",
    website: "https://example.com/homedepot"
  },
  {
    id: 3,
    name: "FestékPont",
    logo: "https://placehold.co/100x100/green/white?text=FP",
    type: "Festékszaküzlet",
    description: "Speciális festékek, lakkok és festőszerszámok. Színkeverés és szaktanácsadás minden lakás- és épületfestési projekthez.",
    rating: 4.8,
    reviewCount: 95,
    location: "Budapest, Bartók Béla út 44",
    openHours: "H-P: 9:00-17:00, Szo: 9:00-12:00",
    website: "https://example.com/festekpont",
    discount: "Ingyenes színkeverés 10.000 Ft felett"
  },
  {
    id: 4,
    name: "Vízszerelvény Szaküzlet",
    logo: "https://placehold.co/100x100/blue/white?text=VS",
    type: "Szerelvénykereskedés",
    description: "Vízvezeték szerelvények, csaptelepek, zuhanykabinok és fürdőszoba felszerelések teljes választéka.",
    rating: 4.6,
    reviewCount: 124,
    location: "Budapest, Soroksári út 65",
    openHours: "H-P: 8:00-16:30, Szo: 8:00-12:00",
    website: "https://example.com/vizszerelveny",
    featured: true
  }
];

interface ServicesProps {
  onBack?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professionFilter, setProfessionFilter] = useState("all");
  const [shopTypeFilter, setShopTypeFilter] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  // Filter professionals based on search and filters
  const filteredProfessionals = professionals.filter(pro => {
    const matchesSearch = 
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProfession = professionFilter === "all" || pro.profession.includes(professionFilter);
    const matchesFeatured = !showFeaturedOnly || pro.featured;
    
    return matchesSearch && matchesProfession && matchesFeatured;
  });
  
  // Filter shops based on search and filters
  const filteredShops = shops.filter(shop => {
    const matchesSearch = 
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = shopTypeFilter === "all" || shop.type.includes(shopTypeFilter);
    const matchesFeatured = !showFeaturedOnly || shop.featured;
    
    return matchesSearch && matchesType && matchesFeatured;
  });
  
  // Render rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="font-medium text-yellow-400 mr-1">{rating.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className={`h-3.5 w-3.5 ${
                star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="animate-fade-in">
      {onBack && (
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mb-4"
        >
          Vissza
        </Button>
      )}
      
      <Card className="border-none shadow-md bg-quickfix-dark-gray">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-quickfix-yellow flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Szolgáltatások
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Keresés szakemberek és üzletek között..."
                className="pl-10 bg-gray-700 border-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Szűrés:</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className={`${showFeaturedOnly ? 'bg-quickfix-yellow text-quickfix-dark' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              >
                Csak kiemelt
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="professionals" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-gray-800 mb-4">
              <TabsTrigger value="professionals" className="flex items-center gap-2">
                Szakemberek
              </TabsTrigger>
              <TabsTrigger value="shops" className="flex items-center gap-2">
                Üzletek
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="professionals">
              <div className="mb-4">
                <Select defaultValue="all" onValueChange={setProfessionFilter}>
                  <SelectTrigger className="w-full md:w-[250px] bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Szakma szerint" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">Összes szakma</SelectItem>
                    <SelectItem value="Vízvezeték">Vízvezeték-szerelő</SelectItem>
                    <SelectItem value="Villany">Villanyszerelő</SelectItem>
                    <SelectItem value="Bútor">Bútorasztalos</SelectItem>
                    <SelectItem value="Festő">Festő</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProfessionals.length > 0 ? (
                  filteredProfessionals.map(pro => (
                    <div 
                      key={pro.id} 
                      className={`bg-gray-800 rounded-lg p-4 border ${pro.featured ? 'border-quickfix-yellow' : 'border-gray-700'} hover:border-gray-600 transition-colors`}
                    >
                      <div className="flex gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-gray-700 text-gray-300 text-lg">
                            {pro.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                          {pro.avatar && <AvatarImage src={pro.avatar} />}
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-200">{pro.name}</h3>
                              <p className="text-sm text-quickfix-yellow">{pro.profession}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {renderRating(pro.rating)}
                              <span className="text-xs text-gray-400">{pro.reviewCount} értékelés</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mt-3 mb-3">{pro.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Árkategória</p>
                          <p className="text-sm text-gray-300">{pro.priceRange}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Elérhetőség</p>
                          <p className="text-sm text-gray-300">{pro.availability}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Helyszín</p>
                          <p className="text-sm text-gray-300">{pro.location}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Szolgáltatások</p>
                        <div className="flex flex-wrap gap-2">
                          {pro.services.map(service => (
                            <span 
                              key={service} 
                              className="text-xs bg-gray-700 text-gray-300 rounded-full px-2 py-1"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-quickfix-yellow hover:bg-quickfix-yellow/90 text-black">
                          Kapcsolatfelvétel
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 bg-gray-800 rounded-lg">
                    <Wrench className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Nincsenek találatok</h3>
                    <p className="text-gray-400">A keresési feltételeknek megfelelő szakemberek nem találhatók</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="shops">
              <div className="mb-4">
                <Select defaultValue="all" onValueChange={setShopTypeFilter}>
                  <SelectTrigger className="w-full md:w-[250px] bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Üzlet típusa szerint" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">Összes üzlettípus</SelectItem>
                    <SelectItem value="Szerszám">Szerszámáruház</SelectItem>
                    <SelectItem value="Barkács">Barkácsáruház</SelectItem>
                    <SelectItem value="Festék">Festékszaküzlet</SelectItem>
                    <SelectItem value="Szerelvény">Szerelvénykereskedés</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredShops.length > 0 ? (
                  filteredShops.map(shop => (
                    <div 
                      key={shop.id} 
                      className={`bg-gray-800 rounded-lg p-4 border ${shop.featured ? 'border-quickfix-yellow' : 'border-gray-700'} hover:border-gray-600 transition-colors`}
                    >
                      <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={shop.logo} 
                            alt={`${shop.name} logo`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-200">{shop.name}</h3>
                              <p className="text-sm text-quickfix-yellow">{shop.type}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {renderRating(shop.rating)}
                              <span className="text-xs text-gray-400">{shop.reviewCount} értékelés</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mt-3 mb-3">{shop.description}</p>
                      
                      {shop.discount && (
                        <div className="mb-3 p-2 bg-green-900/50 border border-green-600 rounded-md">
                          <p className="text-green-300 text-sm flex items-center">
                            <Info className="h-4 w-4 mr-1" />
                            {shop.discount}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Cím</p>
                          <p className="text-sm text-gray-300">{shop.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Nyitvatartás</p>
                          <p className="text-sm text-gray-300">{shop.openHours}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          className="bg-quickfix-yellow hover:bg-quickfix-yellow/90 text-black mr-2"
                          onClick={() => window.open(shop.website, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Weboldal
                        </Button>
                        <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                          Részletek
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 bg-gray-800 rounded-lg">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Nincsenek találatok</h3>
                    <p className="text-gray-400">A keresési feltételeknek megfelelő üzletek nem találhatók</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;
