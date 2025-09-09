'use client';

import { useMemo, useState, useCallback } from 'react';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  ReferenceArea,
  Cell
} from 'recharts';
import { useWeatherStore } from '@/lib/store/weather-store';
import { type HourlyWeather } from '@/lib/api/open-meteo';
import { getWeatherCondition } from '@/lib/api/open-meteo';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/icons/phosphor-icon';
import { LottieWeatherIcon } from '@/components/icons/lottie-weather-icon';

export interface HourlyPanelChartProps {
  /** Hourly weather data */
  hourlyData: HourlyWeather;
  /** Selected day index from daily forecast rail */
  selectedDayIndex: number;
  /** Temperature unit for display */
  temperatureUnit: 'celsius' | 'fahrenheit';
  /** Time format preference */
  timeFormat: '12h' | '24h';
  /** Additional CSS classes */
  className?: string;
  /** Whether to show in list view mode */
  viewMode?: 'chart' | 'list';
  /** Callback when view mode changes */
  onViewModeChange?: (mode: 'chart' | 'list') => void;
}

export interface HourlyDataPoint {
  time: string;
  hour: string;
  temperature: number;
  precipitation: number;
  precipitationProbability: number;
  weatherCode: number;
  isDay: boolean;
  comfortLevel: 'cold' | 'pleasant' | 'hot';
}

// Comfort level thresholds
const COMFORT_THRESHOLDS = {
  cold: 10, // Below 10°C is cold
  hot: 25,  // Above 25°C is hot
  // Between 10-25°C is pleasant
};

// Custom tooltip component
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-1">{label}</p>
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-muted-foreground">Temperature:</span>
            <span className="font-medium">{data.temperature}°</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-300 rounded-full" />
            <span className="text-muted-foreground">Precipitation:</span>
            <span className="font-medium">{data.precipitation}mm</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">PoP:</span>
            <span className="font-medium">{data.precipitationProbability}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// Custom dot component for temperature line
function CustomDot({ cx, cy, payload, isActive }: any) {
  if (isActive) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="var(--primary)"
        stroke="var(--background)"
        strokeWidth={2}
        className="drop-shadow-sm"
      />
    );
  }
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill="var(--primary)"
      stroke="var(--background)"
      strokeWidth={1}
      className="opacity-60 hover:opacity-100 transition-opacity"
    />
  );
}

// Comfort band component
function ComfortBands({ data }: { data: HourlyDataPoint[] }) {
  const bands = useMemo(() => {
    const coldBands: Array<{ start: number; end: number }> = [];
    const hotBands: Array<{ start: number; end: number }> = [];
    
    let currentBand: { start: number; end: number } | null = null;
    let currentType: 'cold' | 'hot' | null = null;
    
    data.forEach((point, index) => {
      if (point.comfortLevel === 'cold' || point.comfortLevel === 'hot') {
        if (currentType === point.comfortLevel) {
          // Extend current band
          if (currentBand) {
            currentBand.end = index;
          }
        } else {
          // Start new band
          if (currentBand && currentType) {
            if (currentType === 'cold') {
              coldBands.push(currentBand);
            } else {
              hotBands.push(currentBand);
            }
          }
          currentBand = { start: index, end: index };
          currentType = point.comfortLevel;
        }
      } else {
        // End current band
        if (currentBand && currentType) {
          if (currentType === 'cold') {
            coldBands.push(currentBand);
          } else {
            hotBands.push(currentBand);
          }
        }
        currentBand = null;
        currentType = null;
      }
    });
    
    // Add final band if exists
    if (currentBand && currentType) {
      if (currentType === 'cold') {
        coldBands.push(currentBand);
      } else {
        hotBands.push(currentBand);
      }
    }
    
    return { coldBands, hotBands };
  }, [data]);
  
  return (
    <>
      {bands.coldBands.map((band, index) => (
        <ReferenceArea
          key={`cold-${index}`}
          x1={band.start}
          x2={band.end}
          fill="hsl(var(--blue) / 0.1)"
          stroke="none"
        />
      ))}
      {bands.hotBands.map((band, index) => (
        <ReferenceArea
          key={`hot-${index}`}
          x1={band.start}
          x2={band.end}
          fill="hsl(var(--orange) / 0.1)"
          stroke="none"
        />
      ))}
    </>
  );
}

// List view item component
function HourlyListItem({ data, isActive, onClick }: { 
  data: HourlyDataPoint; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const { condition, iconKey } = getWeatherCondition(data.weatherCode, data.isDay);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg transition-all duration-200 w-full text-left",
        "hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
        isActive && "bg-primary/10 ring-2 ring-primary/20"
      )}
      aria-label={`Weather at ${data.hour}: ${data.temperature}°, ${condition}`}
    >
      {/* Time */}
      <div className="w-16 text-sm font-medium text-muted-foreground">
        {data.hour}
      </div>
      
      {/* Weather Icon */}
      <div className="w-10 h-10 flex items-center justify-center">
        <LottieWeatherIcon 
          code={data.weatherCode} 
          isDay={data.isDay}
          size={28}
          className="text-foreground"
        />
      </div>
      
      {/* Temperature and Condition */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">{data.temperature}°</span>
          <Badge 
            variant={data.comfortLevel === 'cold' ? 'secondary' : 
                    data.comfortLevel === 'hot' ? 'destructive' : 'default'}
            className="text-xs"
          >
            {data.comfortLevel}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground mt-1">{condition}</div>
      </div>
    </button>
  );
}

export function HourlyPanelChart({
  hourlyData,
  selectedDayIndex,
  temperatureUnit,
  timeFormat,
  className,
  viewMode = 'chart',
  onViewModeChange
}: HourlyPanelChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Process hourly data for the selected day
  const processedData = useMemo(() => {
    if (!hourlyData || !hourlyData.time) return [];
    
    // Get 24 hours starting from the selected day
    const startIndex = selectedDayIndex * 24;
    const endIndex = startIndex + 24;
    
    const dayData = hourlyData.time.slice(startIndex, endIndex);
    
    return dayData.map((time, index) => {
      const actualIndex = startIndex + index;
      const date = new Date(time);
      const hour = timeFormat === '12h' 
        ? date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
        : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      const temperature = hourlyData.temperature_2m[actualIndex];
      const precipitation = hourlyData.precipitation[actualIndex];
      const precipitationProbability = hourlyData.precipitation_probability[actualIndex];
      const weatherCode = hourlyData.weather_code?.[actualIndex] || 0;
      
      // Determine comfort level
      let comfortLevel: 'cold' | 'pleasant' | 'hot' = 'pleasant';
      if (temperature < COMFORT_THRESHOLDS.cold) {
        comfortLevel = 'cold';
      } else if (temperature > COMFORT_THRESHOLDS.hot) {
        comfortLevel = 'hot';
      }
      
      // Determine if it's day or night (simplified - could be improved with sunrise/sunset data)
      const hourOfDay = date.getHours();
      const isDay = hourOfDay >= 6 && hourOfDay < 18;
      
      return {
        time: hour,
        hour,
        temperature: Math.round(temperature),
        precipitation: Math.round(precipitation * 10) / 10, // Round to 1 decimal
        precipitationProbability: Math.round(precipitationProbability),
        weatherCode,
        isDay,
        comfortLevel
      } as HourlyDataPoint;
    });
  }, [hourlyData, selectedDayIndex, timeFormat]);
  
  // Chart event handlers
  const handleMouseMove = useCallback((data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setHoveredIndex(data.activeTooltipIndex);
    }
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);
  
  const handleClick = useCallback((data: any) => {
    if (data && data.activeTooltipIndex !== undefined) {
      setActiveIndex(data.activeTooltipIndex);
    }
  }, []);
  
  if (!processedData.length) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="text-center text-muted-foreground">
          <Icon name="ChartLine" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No hourly data available</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange?.('chart')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              viewMode === 'chart' 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Chart View
          </button>
          <button
            onClick={() => onViewModeChange?.('list')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              viewMode === 'list' 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            List View
          </button>
        </div>
      </div>
      
      {viewMode === 'chart' ? (
        <div className="h-64 text-foreground">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={processedData}
              margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              style={{ color: 'var(--foreground)' }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              
              {/* Comfort bands */}
              <ComfortBands data={processedData} />
              
              <XAxis 
                dataKey="hour" 
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                tick={{ 
                  fill: "var(--muted-foreground)",
                  fontSize: 12
                }}
              />
              <YAxis 
                orientation="left"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{ 
                  fill: "var(--muted-foreground)",
                  fontSize: 12
                }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              {/* Temperature line only */}
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 6, stroke: "var(--background)", strokeWidth: 2, fill: "var(--primary)" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="space-y-1 max-h-80 overflow-y-auto">
          {processedData.map((data, index) => (
            <HourlyListItem
              key={data.time}
              data={data}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full" />
          <span>Temperature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-200 rounded-full" />
          <span>Cold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-200 rounded-full" />
          <span>Hot</span>
        </div>
      </div>
    </Card>
  );
}

/**
 * Hook to get hourly data for a specific day
 */
export function useHourlyData(
  hourlyData: HourlyWeather | null,
  selectedDayIndex: number
) {
  return useMemo(() => {
    if (!hourlyData || !hourlyData.time) return [];
    
    const startIndex = selectedDayIndex * 24;
    const endIndex = startIndex + 24;
    
    return hourlyData.time.slice(startIndex, endIndex).map((time, index) => {
      const actualIndex = startIndex + index;
      return {
        time,
        temperature: hourlyData.temperature_2m[actualIndex],
        precipitation: hourlyData.precipitation[actualIndex],
        precipitationProbability: hourlyData.precipitation_probability[actualIndex],
      };
    });
  }, [hourlyData, selectedDayIndex]);
}
