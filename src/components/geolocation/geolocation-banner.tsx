'use client';

import * as React from 'react';
import { useState } from 'react';
import { useGeolocation } from '@/hooks/use-geolocation';
import { Banner, BannerIcon, BannerTitle, BannerDescription, BannerAction, BannerClose } from '@/components/ui/banner';
import { cn } from '@/lib/utils';

interface GeolocationBannerProps {
  className?: string;
  onLocationGranted?: () => void;
  onLocationDenied?: () => void;
  onDismiss?: () => void;
  onMaybeLater?: () => void;
}

export function GeolocationBanner({ 
  className,
  onLocationGranted,
  onLocationDenied,
  onDismiss,
  onMaybeLater
}: GeolocationBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  const {
    isLoading,
    error,
    permissionStatus,
    hasRequested,
    requestLocation,
    clearError,
  } = useGeolocation();

  // Handle location request
  const handleAllowLocation = async () => {
    try {
      await requestLocation();
      // Only call onLocationGranted after successful location request
      onLocationGranted?.();
    } catch (error) {
      console.error('Location request failed:', error);
      onLocationDenied?.();
    }
  };

  // Handle dismiss
  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  // Handle maybe later
  const handleMaybeLater = () => {
    setIsDismissed(true);
    onMaybeLater?.();
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }


  return (
    <Banner
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[70] transition-all duration-300 ease-in-out",
        className
      )}
      onClose={handleDismiss}
    >
      <BannerIcon name="MapPin" />
      
      <div className="flex-1 min-w-0">
        <BannerTitle>
          Get your current location weather
        </BannerTitle>
        <BannerDescription>
          Click to get weather for your current location. This will update your location to show the most relevant forecast for where you are right now.
        </BannerDescription>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <BannerAction
          onClick={handleAllowLocation}
          disabled={isLoading}
          variant="default"
          className="!bg-primary !text-primary-foreground hover:!bg-primary/90 !border-primary"
        >
          {isLoading ? 'Getting...' : 'Get My Location'}
        </BannerAction>
        
        <BannerAction
          onClick={handleMaybeLater}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          Maybe Later
        </BannerAction>
        
        <BannerClose onClick={handleDismiss} />
      </div>
    </Banner>
  );
}