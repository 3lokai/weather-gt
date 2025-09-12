'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import errorAnimation from '/public/404 Animation.json';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleRetry = () => {
    reset();
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
          {/* 404 Error Lottie Animation */}
          <div className="flex justify-center">
            <div className="w-80 h-80">
              <Lottie
                animationData={errorAnimation}
                loop={true}
                autoplay={true}
                aria-label="Error animation"
              />
            </div>
          </div>
          
          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-display font-semibold text-foreground">
              Something went wrong...
            </h1>
            <p className="text-lg text-muted-foreground">
              Please try again!
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              onClick={handleRetry}
              size="lg"
              className="px-8"
            >
              Try Again
            </Button>
            <Button 
              onClick={handleGoHome}
              variant="outline"
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
