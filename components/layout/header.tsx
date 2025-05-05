"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  
  // Mock authenticated user
  const isAuthenticated = false;
  const [userName, setUserName] = useState("user");


  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  
  

  useEffect(() => {
    fetchUserData();
  }, [session]);
  


  const fetchUserData = async () => {
    if (session) {
      if (session.user) {
        if(session.user.name)
          setUserName(session.user.name);
        fetch("/api/get-user-credits")
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.error(data.message);
            } else {
              setUserData(data);
              
            }
          });
          console.log(JSON.stringify(session, null, 2));
      }
    }
  }




  const navItems = [
    { title: 'Home', href: '/' },
    // { title: 'Settings', href: '/settings' },
    { title: 'Billing', href: '/billing' },
    // { title: 'Account', href: '/account' },
  ];

  return (
    <header className="sticky top-0 z-50 flex w-full min-w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
      <div className="flex h-16 items-center justify-between w-full">
        <div className="flex items-center gap-6 md:gap-10 ">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-blue-600">SkipVid</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 ">
          <ThemeToggle />

          {session && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Hi, {userName}</span>
              <Button variant="outline" size="sm" onClick={() => signOut({callbackUrl:'/'})}>Log Out</Button>
            </div>
          )} 

          {!session && status!="loading" && (
            <Button size="sm" onClick={() => signIn(undefined, {callbackUrl:'/billing'})}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}