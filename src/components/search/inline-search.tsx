'use client';

import * as React from 'react';

// Web Speech API types
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  grammars: SpeechGrammarList;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechGrammarList {
  length: number;
  item(index: number): SpeechGrammar;
  addFromURI(src: string, weight?: number): void;
  addFromString(string: string, weight?: number): void;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};
import { useState, useCallback, useRef, useEffect } from 'react';
import { useWeatherStore } from '@/lib/store/weather-store';
import { useGeocodingSearch, geocodingResultToLocation } from '@/hooks/use-geocoding-search';
import { getWeatherForecast } from '@/lib/api/open-meteo';
import { Icon } from '@/components/icons/phosphor-icon';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

interface InlineSearchProps {
  className?: string;
  placeholder?: string;
  /** Show compare button in search results */
  showCompareButton?: boolean;
  /** Callback when compare button is clicked */
  onCompareLocation?: (location: any) => void;
}

export function InlineSearch({ 
  className, 
  placeholder = 'Search for a place...',
  showCompareButton = false,
  onCompareLocation
}: InlineSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const { 
    setSelectedLocation, 
    units, 
    selectedLocation, 
    recentSearches, 
    clearRecentSearches 
  } = useWeatherStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const { results, isLoading, isEmpty } = useGeocodingSearch({ 
    query,
    enabled: isOpen && query.length >= 2
  });

  // Feature detection for speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        // Get the most recent result
        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript;
        
        // Only process final results to avoid flickering
        if (lastResult.isFinal && transcript.trim()) {
          setQuery(transcript.trim());
          setIsOpen(true);
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
      
      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.warn('Speech recognition error:', event.error, event.message);
        setIsListening(false);
        setIsRecording(false);
        
        // Handle specific error types
        switch (event.error) {
          case 'no-speech':
            console.warn('No speech detected');
            break;
          case 'audio-capture':
            console.warn('Audio capture failed - microphone may be in use');
            break;
          case 'not-allowed':
            console.warn('Microphone permission denied');
            break;
          case 'network':
            console.warn('Network error during speech recognition');
            break;
          case 'service-not-allowed':
            console.warn('Speech recognition service not allowed');
            break;
          default:
            console.warn('Unknown speech recognition error:', event.error);
        }
      };
    }
    
    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  // Handle location selection
  const handleLocationSelect = useCallback(async (result: any) => {
    const location = geocodingResultToLocation(result);
    setSelectedLocation(location);
    
    // Prefetch weather data for selected location
    try {
      await getWeatherForecast(result.latitude, result.longitude, units);
    } catch (error) {
      console.warn('Failed to prefetch weather data:', error);
    }
    
    setIsOpen(false);
    setQuery('');
  }, [setSelectedLocation, units]);

  // Handle recent search selection
  const handleRecentSearchSelect = useCallback(async (recentSearch: any) => {
    setSelectedLocation(recentSearch.location);
    
    // Prefetch weather data for selected location
    try {
      await getWeatherForecast(recentSearch.location.latitude, recentSearch.location.longitude, units);
    } catch (error) {
      console.warn('Failed to prefetch weather data:', error);
    }
    
    setIsOpen(false);
    setQuery('');
  }, [setSelectedLocation, units]);

  // Voice search handlers
  const handleVoiceSearchStart = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setIsRecording(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.warn('Failed to start speech recognition:', error);
        setIsRecording(false);
      }
    }
  }, [isListening]);

  const handleVoiceSearchStop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Format relative time
  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  // Handle clicks outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show results when we have query or loading
  const showResults = isOpen && (query.length >= 2 || isLoading);
  
  // Show recent searches as pills when focused and no query
  const showRecentPills = isOpen && query.length === 0 && recentSearches.length > 0;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedLocation ? selectedLocation.name : placeholder}
          className="peer w-full h-16 ps-16 pe-16 glass-clear glass-hover border-2 border-border hover:border-primary/40 focus:border-primary/60 bg-background/60 hover:bg-background/80 focus:bg-background/90 rounded-md transition-all duration-200 text-body-m font-normal text-foreground placeholder:text-muted-foreground outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          aria-label="Search for a location"
        />
        
        {/* Search/Loading Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center justify-center ps-5 pointer-events-none peer-disabled:opacity-50">
          {isLoading ? (
            <div 
              className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" 
              role="status" 
              aria-label="Loading search results..."
            />
          ) : (
            <Icon 
              name="MagnifyingGlass" 
              size={20} 
              className="text-muted-foreground peer-hover:text-primary peer-focus:text-primary transition-colors" 
              aria-hidden="true"
            />
          )}
        </div>

        {/* Voice Search Button */}
        {speechSupported && (
          <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-5">
            <button
              onMouseDown={handleVoiceSearchStart}
              onMouseUp={handleVoiceSearchStop}
              onMouseLeave={handleVoiceSearchStop}
              onTouchStart={handleVoiceSearchStart}
              onTouchEnd={handleVoiceSearchStop}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                isRecording || isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
              aria-label={isRecording ? 'Recording... Release to stop' : 'Hold to record voice search'}
              type="button"
            >
              <Icon 
                name={isRecording || isListening ? "MicrophoneSlash" : "Microphone"} 
                size={16} 
                className={isRecording || isListening ? 'animate-pulse' : ''}
              />
            </button>
          </div>
        )}

        {/* Clear Button */}
        {query && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuery('');
              setIsOpen(false);
            }}
            className={`absolute inset-y-0 flex h-full w-16 items-center justify-center rounded-e-md text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors outline-none ${
              speechSupported ? 'end-16' : 'end-0'
            }`}
            aria-label="Clear search"
            type="button"
          >
            <Icon name="X" size={16} color="muted" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Recent Searches Pills */}
      {showRecentPills && (
        <div className="absolute top-full left-0 right-0 mt-3 z-[100]">
          <div className="glass-strong bg-background/80 border border-border/50 rounded-md shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-body-s font-medium text-foreground">Recent Searches</h3>
              <button
                onClick={clearRecentSearches}
                className="text-caption text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                aria-label="Clear recent searches"
              >
                <Icon name="Trash" size={12} />
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {recentSearches.slice(0, 3).map((recentSearch) => (
                <button
                  key={recentSearch.id}
                  onClick={() => handleRecentSearchSelect(recentSearch)}
                  className="inline-flex items-center gap-3 px-3 py-2 text-body-s bg-muted/50 hover:bg-muted/70 border border-border/50 hover:border-border rounded-full transition-all duration-200 hover:shadow-sm group"
                  aria-label={`Select ${recentSearch.location.name}`}
                >
                  <Icon name="Clock" size={14} className="text-muted-foreground group-hover:text-foreground" />
                  <span className="text-foreground group-hover:text-foreground">
                    {recentSearch.location.name}
                  </span>
                  <span className="text-caption text-muted-foreground group-hover:text-muted-foreground">
                    {formatRelativeTime(recentSearch.timestamp)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[100]">
          <Command className="glass-strong bg-background/80 border border-border/50 rounded-md shadow-xl isolate">
            <CommandList className="max-h-[300px]">
              {isLoading && query.length >= 2 && (
                <CommandEmpty className="py-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    <span className="text-muted-foreground">Searching...</span>
                  </div>
                </CommandEmpty>
              )}
              
              {isEmpty && query.length >= 2 && !isLoading && (
                <CommandEmpty className="py-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="MagnifyingGlass" size={24} color="muted" />
                    <span className="text-muted-foreground">No locations found</span>
                    <span className="text-caption text-muted-foreground">Try a different search term</span>
                  </div>
                </CommandEmpty>
              )}

              {results.length > 0 && (
                <CommandGroup>
                  {results.slice(0, 5).map((result) => (
                    <CommandItem
                      key={`${result.id}-${result.latitude}-${result.longitude}`}
                      value={`${result.name} ${result.admin1 || ''} ${result.country}`.toLowerCase()}
                      onSelect={() => handleLocationSelect(result)}
                      className="cursor-pointer hover:bg-muted/50 focus:bg-muted/50 data-[selected=true]:bg-muted/50 relative z-10"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Icon name="MapPin" size={16} color="muted" />
                        <div className="flex-1 min-w-0">
                          <div className="text-body-s font-medium text-foreground truncate">
                            {result.name}
                          </div>
                          <div className="text-caption text-muted-foreground truncate">
                            {[result.admin1, result.country].filter(Boolean).join(', ')}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-caption text-muted-foreground font-mono">
                            {result.latitude.toFixed(2)}, {result.longitude.toFixed(2)}
                          </div>
                          {showCompareButton && onCompareLocation && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const location = geocodingResultToLocation(result);
                                onCompareLocation(location);
                              }}
                              className="p-1 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                              aria-label={`Add ${result.name} to comparison`}
                            >
                              <Icon name="Plus" size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {query.length < 2 && query.length > 0 && (
                <CommandEmpty className="py-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="Keyboard" size={24} color="muted" />
                    <span className="text-muted-foreground">Keep typing...</span>
                    <span className="text-caption text-muted-foreground">Enter at least 2 characters</span>
                  </div>
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
