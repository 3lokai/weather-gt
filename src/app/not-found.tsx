'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import satelliteAnimation from '@/lib/animations/satellite.json';

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
      {/* Weather-themed liquid ether background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Atmospheric blur layers for depth */}
        <div className="atmospheric-blur-bg glass-layer-1"></div>
        
        {/* Fallback background for testing theme switching */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-50 glass-layer-2"></div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 bg-transparent pointer-events-auto">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          {/* Satellite Lottie Animation */}
          <div className="flex justify-center">
            <div className="w-64 h-64">
              <Lottie
                animationData={satelliteAnimation}
                loop={true}
                autoplay={true}
                aria-label="Satellite searching animation"
              />
            </div>
          </div>
          
          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-display font-semibold text-foreground">
              Oops...
            </h1>
            <p className="text-lg text-muted-foreground">
              Can't seem to find what you are searching for...
            </p>
          </div>
          
          {/* Action button */}
          <div className="pt-4">
            <Button 
              onClick={handleGoHome}
              size="lg"
              className="px-8"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}