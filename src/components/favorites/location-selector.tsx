'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/icons/phosphor-icon";
import { LottieWeatherIcon } from "@/components/icons/lottie-weather-icon";
import { useWeatherStore, type Location } from "@/lib/store/weather-store";
import { useFavoritesWeather } from "@/hooks/use-favorite-weather";
import { cn } from "@/lib/utils";

export interface LocationSelectorProps {
  /** Additional CSS classes */
  className?: string;
}

export function LocationSelector({ className }: LocationSelectorProps) {
  const { 
    favorites, 
    selectedLocation, 
    setSelectedLocation, 
    removeFavorite, 
    reorderFavorites,
    units
  } = useWeatherStore();

  // Get weather data for all favorites
  const { weatherMap, isLoadingMap } = useFavoritesWeather(favorites);

  // Handle location selection
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedIndex !== dropIndex) {
      reorderFavorites(draggedIndex, dropIndex);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-auto p-2 transition-all duration-200",
            "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            "active:text-foreground/80 active:bg-muted/70",
            className
          )}
          aria-label="Select location from favorites"
          data-favorites-trigger="true"
        >
          <div className="text-right">
            {selectedLocation ? (
              <>
                <div className="text-body-m font-medium text-foreground">
                  {selectedLocation.name}
                </div>
                <div className="text-body-s text-muted-foreground">
                  {[selectedLocation.admin1, selectedLocation.country].filter(Boolean).join(', ')}
                </div>
              </>
            ) : (
              <>
                <div className="text-body-m font-medium text-muted-foreground">
                  Favourite Locations
                </div>
                <div className="text-body-s text-muted-foreground">
                  Quick Select here
                </div>
              </>
            )}
          </div>
          <Icon 
            name="CaretDown" 
            size={32} 
            withDuotone={true}
            className="ml-2 transition-transform duration-200 size-8" 
          />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-[320px] max-h-[80vh] overflow-y-auto glass-strong bg-background/80 border-border/50"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-6 py-4 text-body-l font-display">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={20} color="primary" withDuotone={true} className="h-8 w-8" />
            <span>Favorites</span>
            <span className="text-caption text-muted-foreground ml-auto">
              {favorites.length}
            </span>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {favorites.length === 0 ? (
          <div className="text-center py-8 px-6">
            <Icon name="Heart" size={32} withDuotone={true} className="mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-body-s text-muted-foreground">No favorites yet</p>
            <p className="text-caption text-muted-foreground mt-1">
              Add locations to favorites using the heart button
            </p>
          </div>
        ) : (
          <DropdownMenuGroup>
            {favorites.map((favorite, index) => (
              <div
                key={favorite.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={cn(
                  "flex items-center gap-3 p-3 mx-2 rounded-md cursor-pointer transition-all duration-200",
                  "hover:bg-muted/50 border border-transparent hover:border-border/50",
                  "active:bg-muted/70 active:border-border/70",
                  "group",
                  selectedLocation?.id === favorite.id && "bg-primary/10 border-primary/20 hover:bg-primary/15 active:bg-primary/20"
                )}
                onClick={() => handleLocationSelect(favorite)}
              >
                {/* Drag Handle */}
                <div className="flex-shrink-0 cursor-grab active:cursor-grabbing">
                  <Icon name="DotsSix" size={16} withDuotone={true} className="text-muted-foreground group-hover:text-foreground" />
                </div>

                {/* Weather Icon */}
                <div className="flex-shrink-0">
                  {(() => {
                    const weather = weatherMap.get(favorite.id);
                    const isLoading = isLoadingMap.get(favorite.id);
                    
                    if (isLoading) {
                      return (
                        <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
                      );
                    }
                    
                    if (weather) {
                      return (
                        <LottieWeatherIcon
                          code={weather.current.weather_code}
                          isDay={weather.current.is_day}
                          size={24}
                          className="text-foreground"
                        />
                      );
                    }
                    
                    // Fallback for when weather data is not available
                    return (
                      <LottieWeatherIcon
                        code={0}
                        isDay={true}
                        size={24}
                        className="text-muted-foreground/50"
                      />
                    );
                  })()}
                </div>

                {/* Location Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate text-body-s">
                    {favorite.name}
                  </div>
                  <div className="text-caption text-muted-foreground truncate">
                    {[favorite.admin1, favorite.country].filter(Boolean).join(', ')}
                  </div>
                  {/* Temperature Display */}
                  {(() => {
                    const weather = weatherMap.get(favorite.id);
                    if (weather) {
                      const temp = Math.round(weather.current.temperature_2m);
                      const unit = units.temperature === 'fahrenheit' ? 'F' : 'C';
                      return (
                        <div className="text-caption font-medium text-foreground mt-0.5">
                          {temp}°{unit}
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>

                {/* Remove Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(favorite.id);
                  }}
                  aria-label={`Remove ${favorite.name} from favorites`}
                >
                  <Icon 
                    name="X" 
                    size={12} 
                    withDuotone={true} 
                    className="text-muted-foreground hover:text-destructive active:text-destructive/80 transition-colors duration-200" 
                  />
                </Button>
              </div>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
