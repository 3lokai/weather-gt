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
}

export function GeolocationBanner({ 
  className,
  onLocationGranted,
  onLocationDenied,
  onDismiss
}: GeolocationBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  console.log('🎨 GeolocationBanner: Component rendered', { isDismissed });
  
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
    console.log('🎯 Banner: Starting location request...');
    try {
      const result = await requestLocation();
      console.log('✅ Banner: Location request successful, result:', result);
      console.log('✅ Banner: Calling onLocationGranted');
      onLocationGranted?.();
    } catch (error) {
      console.log('❌ Banner: Location request failed, error:', error);
      console.log('❌ Banner: Calling onLocationDenied');
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
    onDismiss?.();
  };

  // Don't render if dismissed
  if (isDismissed) {
    console.log('🎨 GeolocationBanner: Not rendering because dismissed');
    return null;
  }

  console.log('🎨 GeolocationBanner: Rendering banner');

  return (
    <Banner
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ease-in-out",
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