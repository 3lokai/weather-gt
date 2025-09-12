'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { GeolocationBanner } from './geolocation-banner';
import { GeolocationFallback } from './geolocation-fallback';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useSearchCommand } from '@/components/search/search-provider';
import { cn } from '@/lib/utils';

interface GeolocationProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function GeolocationProvider({ children, className }: GeolocationProviderProps) {
  const [showFallback, setShowFallback] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(true); // Always show banner on page load
  
  const { permissionStatus, hasRequested, position } = useGeolocation();
  const { openSearch } = useSearchCommand();

  // Show fallback when permission is denied or after banner is dismissed
  useEffect(() => {
    // Only show fallback if:
    // 1. Banner was dismissed
    // 2. We don't already have a position
    // 3. Permission is explicitly denied (not just 'prompt' or 'unknown')
    // 4. We're not already showing fallback
    if (bannerDismissed && !position && !showFallback && permissionStatus === 'denied') {
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 500); // Small delay for smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [bannerDismissed, position, showFallback, permissionStatus]);

  // Handle location granted
  const handleLocationGranted = () => {
    console.log('✅ Provider: Location granted, hiding banner');
    setBannerDismissed(true);
    setShowBanner(false);
    setShowFallback(false);
  };

  // Handle location denied
  const handleLocationDenied = () => {
    console.log('❌ Provider: Location denied, showing fallback');
    setBannerDismissed(true);
    setShowBanner(false);
    setShowFallback(true);
  };

  // Handle banner dismiss (close button)
  const handleBannerDismiss = () => {
    setBannerDismissed(true);
    setShowBanner(false);
  };

  // Handle maybe later (don't show fallback immediately)
  const handleMaybeLater = () => {
    setBannerDismissed(true);
    setShowBanner(false);
    // Don't set showFallback - let user manually search if they want
  };

  // Handle fallback search click
  const handleSearchClick = () => {
    openSearch();
  };

  // Handle fallback dismiss
  const handleFallbackDismiss = () => {
    setShowFallback(false);
  };

  // Reset banner state on page load (when component mounts)
  useEffect(() => {
    console.log('🔄 GeolocationProvider: Resetting banner state on mount');
    setShowBanner(true);
    setBannerDismissed(false);
    setShowFallback(false);
  }, []); // Empty dependency array means this runs once on mount

  // Debug logging
  useEffect(() => {
    console.log('🎯 GeolocationProvider state:', {
      showBanner,
      bannerDismissed,
      showFallback,
      permissionStatus,
      hasRequested,
      position: position ? 'has position' : 'no position'
    });
  }, [showBanner, bannerDismissed, showFallback, permissionStatus, hasRequested, position]);

  return (
    <div className={className}>
      {/* Geolocation Permission Banner */}
      {showBanner && (
        <GeolocationBanner
          onLocationGranted={handleLocationGranted}
          onLocationDenied={handleLocationDenied}
          onDismiss={handleBannerDismiss}
          onMaybeLater={handleMaybeLater}
        />
      )}

      {/* Fallback Search Prompt */}
      {showFallback && (
        <GeolocationFallback
          onSearchClick={handleSearchClick}
          onDismiss={handleFallbackDismiss}
        />
      )}

      {/* Main content with bottom padding when banner is visible */}
      <div 
        className={cn(
          "transition-all duration-300",
          (showBanner || showFallback) && "pb-20"
        )}
      >
        {children}
      </div>
    </div>
  );
}
