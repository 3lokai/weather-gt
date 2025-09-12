'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/icons/phosphor-icon";
import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import { useWeatherStore, type Location } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";

export interface FavoritesDropdownProps {
  /** Additional CSS classes */
  className?: string;
}

export function FavoritesDropdown({ className }: FavoritesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { 
    favorites, 
    selectedLocation, 
    setSelectedLocation, 
    removeFavorite, 
    reorderFavorites 
  } = useWeatherStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Handle drag and drop
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent, dropIndex: number) => {
    event.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderFavorites(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  // Handle location selection
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  // Handle remove favorite
  const handleRemoveFavorite = (locationId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    removeFavorite(locationId);
  };

  // Format location name
  const formatLocationName = (location: Location) => {
    if (location.admin1 && location.admin1 !== location.name) {
      return `${location.name}, ${location.admin1}`;
    }
    return `${location.name}, ${location.country}`;
  };

  // Check if location is current
  const isCurrentLocation = (location: Location) => {
    return selectedLocation?.id === location.id;
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <Button
        variant="ghost"
        className="h-10 px-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label={`Favorites dropdown (${favorites.length} favorites)`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="Heart" size={20} className="mr-2" />
        <span className="hidden sm:inline">Favorites</span>
        {favorites.length > 0 && (
          <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
            {favorites.length}
          </span>
        )}
        <Icon 
          name="CaretDown" 
          size={16} 
          className={cn(
            "ml-1 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 z-50 glass-strong border shadow-lg">
          <CardContent className="p-0">
            {favorites.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Icon name="Heart" size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No favorites yet</p>
                <p className="text-xs mt-1">Add locations to your favorites to see them here</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {favorites.map((location, index) => (
                  <div
                    key={location.id}
                    className={cn(
                      "flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer group",
                      isCurrentLocation(location) && "bg-primary/10 border-l-2 border-l-primary",
                      draggedIndex === index && "opacity-50"
                    )}
                    onClick={() => handleLocationSelect(location)}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${formatLocationName(location)}`}
                  >
                    {/* Drag Handle */}
                    <div className="flex-shrink-0 cursor-grab active:cursor-grabbing">
                      <Icon name="DotsSix" size={16} className="text-muted-foreground group-hover:text-foreground" />
                    </div>

                    {/* Weather Icon */}
                    <div className="flex-shrink-0">
                      <LottieWeatherIcon
                        code={0} // TODO: Get actual weather code from API
                        isDay={true} // TODO: Get actual day/night state
                        size={32}
                        className="drop-shadow-sm"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Location Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground truncate">
                          {location.name}
                        </p>
                        {isCurrentLocation(location) && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {[location.admin1, location.country].filter(Boolean).join(', ')}
                      </p>
                      {/* TODO: Add temperature display when weather data is available */}
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      onClick={(e) => handleRemoveFavorite(location.id, e)}
                      aria-label={`Remove ${location.name} from favorites`}
                    >
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
