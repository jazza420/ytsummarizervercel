"use client"

import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User,
  Lock,
  Bell,
  Shield,
  LogOut
} from 'lucide-react';

export default function AccountPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '',
    username: 'johndoe',
  });
  
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  
  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const handlePasswordChange = (key: string, value: string) => {
    setPassword((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-semibold">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">@{profile.username}</p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#security">
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/settings">
                    <Bell className="mr-2 h-4 w-4" />
                    Preferences
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/billing">
                    <Shield className="mr-2 h-4 w-4" />
                    Billing
                  </a>
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="profile" id="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        This email will be used for account notifications
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={profile.username}
                        onChange={(e) => handleProfileChange('username', e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <Input 
                        id="avatar" 
                        type="file" 
                        accept="image/*" 
                      />
                      <p className="text-sm text-muted-foreground">
                        Supported formats: JPG, PNG. Maximum size: 2MB.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" id="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Update your password and manage security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password"
                          value={password.current}
                          onChange={(e) => handlePasswordChange('current', e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password"
                          value={password.new}
                          onChange={(e) => handlePasswordChange('new', e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password"
                          value={password.confirm}
                          onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                        />
                      </div>
                      
                      <Button className="mt-2">Update Password</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Set Up 2FA</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Active Sessions</h3>
                      <div className="rounded-md border">
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">Last active: Just now</p>
                          </div>
                          <Button variant="ghost" size="sm" disabled>This Device</Button>
                        </div>
                        <Separator />
                        <div className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-medium">Chrome on Windows</p>
                            <p className="text-sm text-muted-foreground">Last active: Yesterday</p>
                          </div>
                          <Button variant="ghost" size="sm">Log Out</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Log Out All Devices</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}