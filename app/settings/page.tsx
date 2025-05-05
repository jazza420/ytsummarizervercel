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
import { 
  Switch 
} from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Shield, 
  Zap, 
  Palette, 
  Save
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General
    startOnBoot: true,
    showNotifications: true,
    theme: "system",
    
    // Privacy
    blockTrackers: true,
    blockCookies: false,
    anonymizeData: true,
    
    // Features
    quickSearch: true,
    smartBookmarks: true,
    autoFill: false,
    
    // Notifications
    emailUpdates: true,
    productNews: true,
    securityAlerts: true,
  });
  
  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };
  
  const handleSelectChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="container py-10">
      <div className="mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your extension experience and preferences
        </p>
      </div>
      
      <Tabs defaultValue="general" className="max-w-3xl mx-auto">
        {/* <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList> */}
        
        <div className="mt-6">
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure basic extension settings and appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="start-on-boot">Automatic</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically summarize every video
                    </p>
                  </div>
                  <Switch 
                    id="start-on-boot" 
                    checked={settings.startOnBoot}
                    onCheckedChange={() => handleToggle('startOnBoot')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-notifications">Longer Summaries</Label>
                    <p className="text-sm text-muted-foreground">
                      Provides more detailed summaries
                    </p>
                  </div>
                  <Switch 
                    id="show-notifications" 
                    checked={settings.showNotifications}
                    onCheckedChange={() => handleToggle('showNotifications')}
                  />
                </div>
                
                {/* <div className="flex flex-col gap-2">
                  <Label htmlFor="theme-select">Theme</Label>
                  <Select 
                    value={settings.theme}
                    onValueChange={(value) => handleSelectChange('theme', value)}
                  >
                    <SelectTrigger id="theme-select">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose the appearance theme for the extension
                  </p>
                </div> */}
              </CardContent>
              {/* <CardFooter>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter> */}
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control your data privacy and protection preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="block-trackers">Block trackers</Label>
                    <p className="text-sm text-muted-foreground">
                      Block third-party trackers from websites you visit
                    </p>
                  </div>
                  <Switch 
                    id="block-trackers" 
                    checked={settings.blockTrackers}
                    onCheckedChange={() => handleToggle('blockTrackers')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="block-cookies">Block cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Block non-essential cookies from websites
                    </p>
                  </div>
                  <Switch 
                    id="block-cookies" 
                    checked={settings.blockCookies}
                    onCheckedChange={() => handleToggle('blockCookies')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="anonymize-data">Anonymize data</Label>
                    <p className="text-sm text-muted-foreground">
                      Anonymize your browsing data for enhanced privacy
                    </p>
                  </div>
                  <Switch 
                    id="anonymize-data" 
                    checked={settings.anonymizeData}
                    onCheckedChange={() => handleToggle('anonymizeData')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Feature Settings
                </CardTitle>
                <CardDescription>
                  Enable or disable specific extension features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="quick-search">Quick search</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable quick search functionality with keyboard shortcuts
                    </p>
                  </div>
                  <Switch 
                    id="quick-search" 
                    checked={settings.quickSearch}
                    onCheckedChange={() => handleToggle('quickSearch')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smart-bookmarks">Smart bookmarks</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically organize bookmarks by category
                    </p>
                  </div>
                  <Switch 
                    id="smart-bookmarks" 
                    checked={settings.smartBookmarks}
                    onCheckedChange={() => handleToggle('smartBookmarks')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-fill">Auto-fill forms</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically fill in forms with saved information
                    </p>
                  </div>
                  <Switch 
                    id="auto-fill" 
                    checked={settings.autoFill}
                    onCheckedChange={() => handleToggle('autoFill')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-updates">Email updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your account
                    </p>
                  </div>
                  <Switch 
                    id="email-updates" 
                    checked={settings.emailUpdates}
                    onCheckedChange={() => handleToggle('emailUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="product-news">Product news</Label>
                    <p className="text-sm text-muted-foreground">
                      Stay informed about new features and improvements
                    </p>
                  </div>
                  <Switch 
                    id="product-news" 
                    checked={settings.productNews}
                    onCheckedChange={() => handleToggle('productNews')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-alerts">Security alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about important security updates
                    </p>
                  </div>
                  <Switch 
                    id="security-alerts" 
                    checked={settings.securityAlerts}
                    onCheckedChange={() => handleToggle('securityAlerts')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}