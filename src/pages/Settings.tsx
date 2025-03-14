
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Globe, Bell, Lock, User, Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Available languages
const languages = [
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
];

interface SettingsProps {
  onBack?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [currentLanguage, setCurrentLanguage] = useState('hu');
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Mock user data
  const user = {
    name: "Felhasználó János",
    email: "felhasznalo@example.com",
    avatar: null,
    phone: "+36 30 123 4567"
  };
  
  // Handle language change
  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real app, we would update the language in a context/store
    console.log(`Changing language to: ${langCode}`);
  };
  
  // Handle toggle of dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, we would update the theme in a context/store
    console.log(`Dark mode: ${!darkMode}`);
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
            <SettingsIcon className="h-5 w-5" />
            Beállítások
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-gray-800 mb-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Általános
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Értesítések
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Biztonság
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Profil információk</h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gray-700 text-gray-300 text-lg">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                      {user.avatar && <AvatarImage src={user.avatar} />}
                    </Avatar>
                    
                    <div>
                      <h4 className="font-medium text-gray-300">{user.name}</h4>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <p className="text-sm text-gray-400">{user.phone}</p>
                    </div>
                    
                    <Button variant="outline" className="ml-auto bg-gray-700 hover:bg-gray-600 text-gray-300">
                      Profil szerkesztése
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Moon className={`h-5 w-5 ${darkMode ? 'text-quickfix-yellow' : 'text-gray-400'}`} />
                      <h3 className="text-lg font-medium text-gray-200">Sötét mód</h3>
                    </div>
                    
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={toggleDarkMode} 
                      className="data-[state=checked]:bg-quickfix-yellow" 
                    />
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">
                    A sötét mód bekapcsolásával csökkentheti a szem terhelését és az eszköz energiafogyasztását.
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-quickfix-yellow" />
                    <h3 className="text-lg font-medium text-gray-200">Nyelvi beállítások</h3>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">
                    Válassza ki az alkalmazás megjelenítési nyelvét. Az alapértelmezett nyelv a magyar.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {languages.map(lang => (
                      <Button
                        key={lang.code}
                        variant="outline"
                        className={`flex items-center justify-start gap-2 ${
                          currentLanguage === lang.code 
                            ? 'bg-quickfix-yellow text-quickfix-dark border-quickfix-yellow hover:bg-quickfix-yellow/90' 
                            : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                        }`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm truncate">{lang.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Értesítési beállítások</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">E-mail értesítések</h4>
                        <p className="text-sm text-gray-400">Értesítések fogadása e-mailben</p>
                      </div>
                      <Switch 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications} 
                        className="data-[state=checked]:bg-quickfix-yellow" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">Push értesítések</h4>
                        <p className="text-sm text-gray-400">Értesítések fogadása a böngészőben/alkalmazásban</p>
                      </div>
                      <Switch 
                        checked={pushNotifications} 
                        onCheckedChange={setPushNotifications} 
                        className="data-[state=checked]:bg-quickfix-yellow" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">Marketing e-mailek</h4>
                        <p className="text-sm text-gray-400">Újdonságok, ajánlatok és promóciók</p>
                      </div>
                      <Switch 
                        checked={marketingEmails} 
                        onCheckedChange={setMarketingEmails} 
                        className="data-[state=checked]:bg-quickfix-yellow" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Értesítések típusa</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">Szakember értesítések</h4>
                        <p className="text-sm text-gray-400">Szakemberek üzenetei és munkájukkal kapcsolatos értesítések</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-quickfix-yellow" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">AI asszisztens értesítések</h4>
                        <p className="text-sm text-gray-400">Az AI asszisztenssel folytatott beszélgetésekkel kapcsolatos értesítések</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-quickfix-yellow" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">Hirdetések és ajánlatok</h4>
                        <p className="text-sm text-gray-400">Értesítések új ajánlatokról és promóciókról</p>
                      </div>
                      <Switch defaultChecked={false} className="data-[state=checked]:bg-quickfix-yellow" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Jelszó és biztonság</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-gray-300 font-medium mb-2">Jelszó módosítása</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      Rendszeresen változtassa meg jelszavát a fiókja biztonsága érdekében.
                    </p>
                    <Button className="bg-gray-700 hover:bg-gray-600 text-gray-300">
                      Jelszó módosítása
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-300 font-medium mb-2">Kétlépcsős hitelesítés</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      Növelje fiókja biztonságát egy második hitelesítési lépéssel.
                    </p>
                    <Switch className="data-[state=checked]:bg-quickfix-yellow" />
                    <p className="text-xs text-gray-500 mt-2">
                      Jelenleg nincs bekapcsolva
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Adatvédelem</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">Adatmegosztás szakemberekkel</h4>
                        <p className="text-sm text-gray-400">Engedélyezi a platform szakembereinek, hogy lássák elérhetőségeit</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-quickfix-yellow" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-gray-300 font-medium">Böngészési előzmények mentése</h4>
                        <p className="text-sm text-gray-400">A platform tárolja böngészési előzményeit a jobb felhasználói élmény érdekében</p>
                      </div>
                      <Switch defaultChecked className="data-[state=checked]:bg-quickfix-yellow" />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="text-red-400 hover:text-red-300 hover:bg-red-950 border-red-700">
                      Fiók törlése
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
