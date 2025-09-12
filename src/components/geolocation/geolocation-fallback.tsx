'use client';

import * as React from 'react';
import { useState } from 'react';
import { Banner, BannerIcon, BannerTitle, BannerDescription, BannerAction, BannerClose } from '@/components/ui/banner';
import { cn } from '@/lib/utils';

interface GeolocationFallbackProps {
  className?: string;
  onSearchClick?: () => void;
  onDismiss?: () => void;
}

export function GeolocationFallback({ 
  className,
  onSearchClick,
  onDismiss
}: GeolocationFallbackProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleSearchClick = () => {
    onSearchClick?.();
    handleDismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Banner
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] animate-in slide-in-from-top-2 duration-300",
        className
      )}
      onClose={handleDismiss}
      role="banner"
      aria-live="polite"
      aria-label="Location search prompt"
    >
      <BannerIcon name="MagnifyingGlass" />
      
      <div className="flex-1 min-w-0">
        <BannerTitle>
          No problem! Search for your location
        </BannerTitle>
        <BannerDescription>
          You can search for any location to get personalized weather information. Just type in the search box below.
        </BannerDescription>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <BannerAction
          onClick={handleSearchClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Start Searching
        </BannerAction>
        
        <BannerClose onClick={handleDismiss} />
      </div>
    </Banner>
  );
}