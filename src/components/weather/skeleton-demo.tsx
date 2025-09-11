'use client';

import { useState } from 'react';
import { CurrentConditionsSkeleton } from './current-conditions-skeleton';
import { MetricsGridSkeleton } from './metrics-grid-skeleton';
import { DailyForecastSkeleton } from './daily-forecast-skeleton';
import { HourlyPanelSkeleton } from './hourly-panel-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function SkeletonDemo() {
  const [showSkeletons, setShowSkeletons] = useState(true);
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Weather App Skeleton Components</h1>
        <p className="text-muted-foreground">
          Loading states that match the exact dimensions of weather components to prevent CLS
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setShowSkeletons(!showSkeletons)}
            variant={showSkeletons ? "default" : "outline"}
          >
            {showSkeletons ? "Hide Skeletons" : "Show Skeletons"}
          </Button>
          
          <Button
            onClick={() => setViewMode(viewMode === 'chart' ? 'list' : 'chart')}
            variant="outline"
          >
            Switch to {viewMode === 'chart' ? 'List' : 'Chart'} View
          </Button>
        </div>
      </div>

      {showSkeletons && (
        <div className="space-y-8">
          {/* Hero Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Current Conditions Skeleton</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CurrentConditionsSkeleton size="sm" />
                <CurrentConditionsSkeleton size="md" />
                <CurrentConditionsSkeleton size="lg" />
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Metrics Grid Skeleton</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Grid Layout</h3>
                  <MetricsGridSkeleton size="md" layout="grid" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">List Layout</h3>
                  <MetricsGridSkeleton size="md" layout="list" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Forecast Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Forecast Skeleton</CardTitle>
            </CardHeader>
            <CardContent>
              <DailyForecastSkeleton dayCount={7} />
            </CardContent>
          </Card>

          {/* Hourly Panel Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Hourly Panel Skeleton</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Chart View</h3>
                  <HourlyPanelSkeleton viewMode="chart" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">List View</h3>
                  <HourlyPanelSkeleton viewMode="list" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integration Example */}
      <Card>
        <CardHeader>
          <CardTitle>Integration with TanStack Query</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              These skeleton components are designed to integrate seamlessly with TanStack Query loading states:
            </p>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`// Example usage with TanStack Query
const { data: weather, isLoading, error } = useQuery({
  queryKey: ['weather', location],
  queryFn: () => fetchWeather(location)
});

if (isLoading) {
  return <CurrentConditionsSkeleton size="md" />;
}

if (error) {
  return <div>Error loading weather data</div>;
}

return <CurrentConditionsCard conditions={weather} location={location} />;`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
