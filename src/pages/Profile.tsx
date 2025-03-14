
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Upload, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  
  // Sample user data - in a real app, this would come from authentication context
  const [userData, setUserData] = useState({
    name: 'Felhasználó',
    email: 'felhasznalo@example.com',
    avatar: null as string | null,
  });
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState({ ...userData });
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setTempUserData({ ...userData });
    }
    setIsEditing(!isEditing);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempUserData({
      ...tempUserData,
      [name]: value,
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your storage
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setTempUserData({
        ...tempUserData,
        avatar: imageUrl,
      });
    }
  };
  
  const handleSave = () => {
    // Validate password if changing
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast.error('A jelszavak nem egyeznek!');
        return;
      }
      if (newPassword.length < 6) {
        toast.error('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
        return;
      }
      // In a real app, you would call an API to update the password
      toast.success('Jelszó sikeresen frissítve!');
    }
    
    // Save user data
    setUserData(tempUserData);
    setIsEditing(false);
    toast.success('Profil sikeresen frissítve!');
  };
  
  return (
    <div className="min-h-screen bg-quickfix-dark text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="mr-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-quickfix-yellow">Profilom</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture Card */}
          <Card className="bg-quickfix-dark-gray border-gray-800 text-white col-span-1">
            <CardHeader>
              <CardTitle>Profilkép</CardTitle>
              <CardDescription className="text-gray-400">Válasszon profilképet</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4 border-2 border-quickfix-yellow">
                <AvatarImage src={tempUserData.avatar || ''} alt={tempUserData.name} />
                <AvatarFallback className="bg-quickfix-dark-gray text-white text-xl">
                  {tempUserData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                    <Upload size={16} />
                    <span>Kép feltöltése</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </CardContent>
          </Card>
          
          {/* Profile Information */}
          <Card className="bg-quickfix-dark-gray border-gray-800 text-white col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Személyes Adatok</CardTitle>
                <CardDescription className="text-gray-400">Módosítsa személyes adatait</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={handleEditToggle}
                className="border-quickfix-yellow text-quickfix-yellow hover:bg-quickfix-yellow/10"
              >
                {isEditing ? 'Mégse' : 'Szerkesztés'}
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white flex items-center gap-2">
                  <User size={16} />
                  Név
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={tempUserData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <Mail size={16} />
                  Email cím
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={tempUserData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-gray-800 border-gray-700 text-white disabled:opacity-70"
                />
              </div>
              
              {isEditing && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-white flex items-center gap-2">
                      <Lock size={16} />
                      Új jelszó
                    </Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white flex items-center gap-2">
                      <Lock size={16} />
                      Jelszó megerősítése
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handlePasswordChange}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </>
              )}
            </CardContent>
            
            {isEditing && (
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mentés
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
