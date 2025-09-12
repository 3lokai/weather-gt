'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons/phosphor-icon";
import { useWeatherStore, type Location } from "@/lib/store/weather-store";
import { cn } from "@/lib/utils";

export interface LocationSelectorProps {
  /** Currently selected locations for comparison */
  selectedLocations: Location[];
  /** Callback when a location is added to comparison */
  onAddLocation: (location: Location) => void;
  /** Callback when a location is removed from comparison */
  onRemoveLocation: (locationId: string) => void;
  /** Maximum number of locations allowed (default: 4) */
  maxLocations?: number;
  /** Additional CSS classes */
  className?: string;
}

export function LocationSelector({
  selectedLocations,
  onAddLocation,
  onRemoveLocation,
  maxLocations = 4,
  className
}: LocationSelectorProps) {
  const { favorites, recentSearches } = useWeatherStore();
  const [isExpanded, setIsExpanded] = useState(false);

  // Get available locations (favorites + recent searches, excluding already selected)
  const availableLocations = [
    ...favorites,
    ...recentSearches.map(search => search.location)
  ].filter(location => 
    !selectedLocations.some(selected => selected.id === location.id)
  );

  // Remove duplicates based on location ID
  const uniqueLocations = availableLocations.filter((location, index, self) =>
    index === self.findIndex(l => l.id === location.id)
  );

  const canAddMore = selectedLocations.length < maxLocations;
  const hasAvailableLocations = uniqueLocations.length > 0;

  const formatLocation = (loc: Location) => {
    if (loc.admin1 && loc.admin1 !== loc.name) {
      return `${loc.name}, ${loc.admin1}`;
    }
    return `${loc.name}, ${loc.country}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Selected Locations */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-h3 font-semibold text-foreground">
            Compare Locations
          </h3>
          <div className="text-body-s text-muted-foreground">
            {selectedLocations.length} / {maxLocations}
          </div>
        </div>

        {selectedLocations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border"
              >
                <span className="text-body-s text-foreground">
                  {formatLocation(location)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={() => onRemoveLocation(location.id)}
                  aria-label={`Remove ${formatLocation(location)} from comparison`}
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Plus" size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-body-s">No locations selected for comparison</p>
            <p className="text-caption">Add locations from your favorites or recent searches</p>
          </div>
        )}
      </div>

      {/* Add Location Section */}
      {canAddMore && hasAvailableLocations && (
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Hide available locations" : "Show available locations"}
          >
            <span>Add Location</span>
            <Icon 
              name="CaretDown" 
              size={16} 
              className={cn(
                "transition-transform duration-200",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
            />
          </Button>

          {isExpanded && (
            <div className="space-y-1 max-h-48 overflow-y-auto border border-border rounded-lg bg-background">
              {uniqueLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    onAddLocation(location);
                    setIsExpanded(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                  aria-label={`Add ${formatLocation(location)} to comparison`}
                >
                  <div className="text-body-s text-foreground">
                    {formatLocation(location)}
                  </div>
                  <div className="text-caption text-muted-foreground">
                    {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Max Locations Reached */}
      {!canAddMore && (
        <div className="text-center py-4 text-muted-foreground">
          <Icon name="Warning" size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-body-s">Maximum {maxLocations} locations reached</p>
          <p className="text-caption">Remove a location to add another</p>
        </div>
      )}

      {/* No Available Locations */}
      {canAddMore && !hasAvailableLocations && (
        <div className="text-center py-4 text-muted-foreground">
          <Icon name="Info" size={24} className="mx-auto mb-2 opacity-50" />
          <p className="text-body-s">No additional locations available</p>
          <p className="text-caption">Search for locations to add them to favorites</p>
        </div>
      )}
    </div>
  );
}
