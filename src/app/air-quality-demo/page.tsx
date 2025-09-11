import { AirQualityPanelDemo } from '@/components/weather/air-quality-panel-demo';
import { PollenPanelDemo } from '@/components/weather/pollen-panel-demo';

export default function AirQualityDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-4">Air Quality & Pollen Demo</h1>
          <p className="text-muted-foreground mb-8">
            Demonstration of air quality and pollen monitoring components with different states and data.
          </p>
        </div>
        
        <AirQualityPanelDemo />
        <PollenPanelDemo />
      </div>
    </div>
  );
}
