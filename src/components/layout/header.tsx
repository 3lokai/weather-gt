'use client';

import Link from "next/link";
import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle";
import { SettingsDropdown } from "@/components/settings/settings-dropdown";
import { LocationSelector } from "@/components/favorites/location-selector";
import { KeyboardShortcutsSheet } from "@/components/ui/keyboard-shortcuts-sheet";
import { useWeatherStore } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";

export function Header() {
  const { selectedLocation } = useWeatherStore();

  return (
    <header className="glass-nav transition-colors duration-300 pointer-events-auto fixed top-0 left-0 right-0 z-[80]">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Simplified header with branding and controls */}
        <div className="flex items-center justify-between">
          {/* Left: Logo, Brand and Navigation */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 sm:gap-3 transition-opacity duration-200 hover:opacity-80"
            >
              <LottieWeatherIcon 
                code={0} // Default weather code, will be updated by weather context
                isDay={true} // Default to day, will be updated by weather context
                size={28} 
                variant="fill" 
                speed={1.5} 
                className="sm:w-8 sm:h-8" 
              />
              <h1 className="text-h3 sm:text-h1 font-display text-foreground">
                Weather Now
              </h1>
            </Link>
            
            {/* Navigation Links */}
            <nav className="flex items-center">
              <Link 
                href="/compare" 
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  "text-muted-foreground hover:text-foreground",
                  "hover:underline underline-offset-4"
                )}
              >
                Compare Locations
              </Link>
            </nav>
          </div>
          
          {/* Right: Location and Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Location Selector */}
            <LocationSelector />
            <KeyboardShortcutsSheet />
            <SettingsDropdown variant="icon" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
