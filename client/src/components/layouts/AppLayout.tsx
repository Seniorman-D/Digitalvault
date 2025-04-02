import React, { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const { toast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Initialize user's initials from their username
  const userInitials = user?.username ? user.username.substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="text-primary">
              <i className="ri-shield-keyhole-fill text-2xl"></i>
            </div>
            <h1 className="text-xl font-semibold text-neutral-700">Secure Next-of-Kin Vault</h1>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline-block text-neutral-600">{user?.username}</span>
            <div className="relative">
              <button 
                className="flex items-center space-x-2 bg-neutral-100 hover:bg-neutral-200 rounded-full px-3 py-1.5 transition"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                  <span>{userInitials}</span>
                </div>
                <i className="ri-arrow-down-s-line text-neutral-500"></i>
              </button>
              
              {/* Dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-neutral-200">
                  <div className="py-1">
                    <Link href="/security">
                      <a className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                        Account Settings
                      </a>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-16 md:w-56 bg-white border-r border-neutral-200 flex-shrink-0 h-screen sticky top-0">
          <div className="flex flex-col h-full">
            <div className="py-4 flex-1">
              <ul className="space-y-1 px-2">
                <li>
                  <Link href="/">
                    <a className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-md transition",
                      location === "/" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                    )}>
                      <i className="ri-dashboard-line text-lg"></i>
                      <span className="hidden md:inline">Dashboard</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/passwords">
                    <a className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-md transition",
                      location === "/passwords" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                    )}>
                      <i className="ri-key-line text-lg"></i>
                      <span className="hidden md:inline">Passwords</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/files">
                    <a className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-md transition",
                      location === "/files" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                    )}>
                      <i className="ri-file-line text-lg"></i>
                      <span className="hidden md:inline">Files & Notes</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/next-of-kin">
                    <a className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-md transition",
                      location === "/next-of-kin" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                    )}>
                      <i className="ri-user-heart-line text-lg"></i>
                      <span className="hidden md:inline">Next of Kin</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/security">
                    <a className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 rounded-md transition",
                      location === "/security" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800"
                    )}>
                      <i className="ri-shield-check-line text-lg"></i>
                      <span className="hidden md:inline">Security</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Plan Information */}
            <div className="border-t border-neutral-200 py-3 px-3">
              <div className="bg-primary/5 rounded-md p-2 mb-3">
                <div className="flex items-center justify-between md:justify-start md:space-x-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-vip-crown-fill text-warning"></i>
                    <span className="text-sm font-medium hidden md:inline">
                      {/* Assume user.isPremium will be part of user object */}
                      {user?.isPremium ? 'Premium' : 'Free Trial'}
                    </span>
                  </div>
                  {!user?.isPremium && (
                    <span className="text-xs text-neutral-500 bg-white px-2 py-0.5 rounded">
                      {/* This would come from user data */}
                      23 days left
                    </span>
                  )}
                </div>
                <div className="mt-2 hidden md:block">
                  {!user?.isPremium && (
                    <Link href="/upgrade">
                      <a className="block text-center text-xs text-primary font-medium bg-white hover:bg-primary hover:text-white border border-primary rounded-md py-1.5 transition">
                        Upgrade to Premium
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              
              <Link href="/security">
                <a className="flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-neutral-100 text-neutral-600">
                  <i className="ri-settings-3-line text-lg"></i>
                  <span className="text-sm hidden md:inline">Settings</span>
                </a>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-2 py-2 rounded-md hover:bg-neutral-100 text-neutral-600"
              >
                <i className="ri-logout-box-r-line text-lg"></i>
                <span className="text-sm hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
