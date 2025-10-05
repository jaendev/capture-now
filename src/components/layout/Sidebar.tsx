'use client'

import { ChevronLeft, ChevronRight, Plus, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import { navigation } from '@/constants/navigation-sidebar';
import { useSidebarStore } from '@/src/stores/sidebarStore';
import { useAuthStore } from '@/src/stores/authStore';
import { LogoutModal } from '@/src/components/ui/LogoutModal';

export function Sidebar() {
  const { isOpen, showLabels, toggleSidebar, initializeSidebar, isInitialized } = useSidebarStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const imageUrl = user?.avatar_url ? user?.avatar_url : '/uploads/avatars/boy.png';

  // Initialize showLabels on component mount
  useEffect(() => {
    if (!isInitialized) {
      initializeSidebar();
    }
  }, [isInitialized, initializeSidebar]);

  // Close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to check if route is active
  const isRouteActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const menuButton = document.getElementById('mobile-menu-button');

      if (isMobileMenuOpen && sidebar && menuButton &&
        !sidebar.contains(event.target as Node) &&
        !menuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobile-menu-button"
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-surface text-accent p-2 rounded-md shadow-lg border border-border"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" />
      )}

      {/* Desktop Sidebar + Mobile Drawer */}
      <aside
        id="mobile-sidebar"
        className={`
        bg-surface shadow-lg border-r border-border z-50 flex flex-col
        overflow-hidden 
        transition-all duration-200
        md:relative md:translate-x-0 md:h-full
        ${isOpen ? 'md:w-64' : 'md:w-16'}
        ${showLogoutModal ? 'md:w-96 w-96' : ''}
        fixed left-0 top-0 w-64 h-full
        ${isMobileMenuOpen ? 'translate-x-0 md:translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Header - Fixed height, no flex grow */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          {(showLabels || isMobileMenuOpen) && (
            <div className="flex items-center space-x-3 animate-fade-in-soft">
              <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                <Image src="/icon.svg" alt="Capture Now" width={20} height={20} />
              </div>
              <span className="text-foreground font-semibold text-lg">Capture Now</span>
            </div>
          )}

          {/* Desktop toggle button */}
          <button
            onClick={toggleSidebar}
            className="hidden md:block bg-card hover:bg-hover text-accent p-2 rounded-md transition-colors duration-200 ml-auto"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Quick add button*/}
        <div className="p-3 shrink-0">
          <button onClick={() => router.push('/notes/new')}

            className={`
            w-full bg-gradient-primary hover:opacity-90 text-foreground rounded-md 
            transition-all duration-200 flex items-center justify-center cursor-pointer
            ${(isOpen || isMobileMenuOpen) ? 'p-2' : 'md:p-2 p-3'}
          `}>
            <Plus size={18} />
            {(showLabels || isMobileMenuOpen) && <span className="ml-2 font-medium animate-fade-in-soft">New Note</span>}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-2">
          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = isRouteActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative flex items-center p-3 rounded-md transition-all duration-200 group
                    ${(isOpen || isMobileMenuOpen) ? 'justify-start' : 'md:justify-center justify-start'}
                    ${isActive
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'hover:bg-card text-muted hover:text-accent border border-transparent'
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`
                      transition-colors duration-200
                      ${isActive ? 'text-primary' : 'text-accent group-hover:text-primary'}
                    `}
                  />

                  {(showLabels || isMobileMenuOpen) && (
                    <span className={`
                      ml-3 animate-fade-in-soft whitespace-nowrap ease-out
                      ${isActive ? 'font-semibold text-primary' : 'font-medium group-hover:text-accent'}
                      ${showLabels || isMobileMenuOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4'
                      }
                    `}>
                      {item.label}
                    </span>
                  )}

                  {/* Active indicator when closed (desktop only) */}
                  {!isOpen && !isMobileMenuOpen && isActive && (
                    <div className="hidden md:block absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={` 
        flex items-center justify-center transition-all duration-300
        ${isOpen ? 'opacity-100 h-auto p-3' : 'hidden'}
        `}
        >
          <div className="relative group">
            <Image
              onClick={() => setShowLogoutModal(!showLogoutModal)}
              src={imageUrl}
              alt={user?.name || 'user'}
              className='rounded-full cursor-pointer'
              width={48}
              height={48}
            />

            {/* Custom tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-surface border border-border rounded-lg text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {user?.name || 'User'}
            </div>
          </div>
        </div>

        {/* Logout Modal */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />

        {/* Footer */}
        <div className="p-3 border-t border-border shrink-0">
          {(showLabels || isMobileMenuOpen) ? (
            <div className="text-xs text-muted text-center animate-fade-in-soft">
              <p>Capture Now</p>
            </div>
          ) : (
            <div className="hidden md:flex w-8 h-8 mx-auto bg-card rounded-full items-center justify-center">
              <span className="text-xs text-muted">CN</span>
            </div>
          )}
        </div>
      </aside >
    </>
  );
}
