import React, { useState, useCallback } from 'react';

interface TokenValue {
  [key: string]: string;
}

interface TokenPlaygroundProps {
  className?: string;
}

export const TokenPlayground: React.FC<TokenPlaygroundProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'spacing' | 'radius'>('colors');
  const [customTokens, setCustomTokens] = useState<TokenValue>({});
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  // Default token values
  const defaultTokens: TokenValue = {
    // Colors
    '--primary': 'oklch(0.4500 0.1800 264.0000)',
    '--secondary': 'oklch(0.4200 0.1600 300.0000)',
    '--accent': 'oklch(0.7500 0.1800 65.0000)',
    '--background': 'oklch(0.9800 0.0100 264.0000)',
    '--foreground': 'oklch(0.1500 0.0200 264.0000)',
    
    // Typography
    '--font-sans': 'ui-sans-serif, system-ui, sans-serif',
    '--font-size-base': '1rem',
    '--font-size-lg': '1.125rem',
    '--font-size-xl': '1.25rem',
    
    // Spacing
    '--spacing-4': '1rem',
    '--spacing-6': '1.5rem',
    '--spacing-8': '2rem',
    
    // Radius
    '--radius-sm': '0.75rem',
    '--radius-md': '1rem',
    '--radius-lg': '1.25rem',
  };

  const currentTokens = { ...defaultTokens, ...customTokens };

  const updateToken = useCallback((token: string, value: string) => {
    setCustomTokens(prev => ({
      ...prev,
      [token]: value
    }));
  }, []);

  const resetTokens = useCallback(() => {
    setCustomTokens({});
  }, []);

  const exportTokens = useCallback(() => {
    const css = Object.entries(currentTokens)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
    
    const cssOutput = `:root {\n${css}\n}`;
    
    navigator.clipboard.writeText(cssOutput);
    alert('CSS tokens copied to clipboard!');
  }, [currentTokens]);

  const tabs = [
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'typography', label: 'Typography', icon: '📝' },
    { id: 'spacing', label: 'Spacing', icon: '📏' },
    { id: 'radius', label: 'Radius', icon: '⭕' },
  ] as const;

  const renderColorEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={currentTokens['--primary']}
              onChange={(e) => updateToken('--primary', e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <input
              type="text"
              value={currentTokens['--primary']}
              onChange={(e) => updateToken('--primary', e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm font-mono"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Secondary Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={currentTokens['--secondary']}
              onChange={(e) => updateToken('--secondary', e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <input
              type="text"
              value={currentTokens['--secondary']}
              onChange={(e) => updateToken('--secondary', e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm font-mono"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Accent Color</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={currentTokens['--accent']}
              onChange={(e) => updateToken('--accent', e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <input
              type="text"
              value={currentTokens['--accent']}
              onChange={(e) => updateToken('--accent', e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm font-mono"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Background</label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={currentTokens['--background']}
              onChange={(e) => updateToken('--background', e.target.value)}
              className="w-12 h-8 rounded border"
            />
            <input
              type="text"
              value={currentTokens['--background']}
              onChange={(e) => updateToken('--background', e.target.value)}
              className="flex-1 px-3 py-2 border rounded text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypographyEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Base Font Size</label>
          <input
            type="text"
            value={currentTokens['--font-size-base']}
            onChange={(e) => updateToken('--font-size-base', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Large Font Size</label>
          <input
            type="text"
            value={currentTokens['--font-size-lg']}
            onChange={(e) => updateToken('--font-size-lg', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1.125rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">XL Font Size</label>
          <input
            type="text"
            value={currentTokens['--font-size-xl']}
            onChange={(e) => updateToken('--font-size-xl', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1.25rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <input
            type="text"
            value={currentTokens['--font-sans']}
            onChange={(e) => updateToken('--font-sans', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="ui-sans-serif, system-ui, sans-serif"
          />
        </div>
      </div>
    </div>
  );

  const renderSpacingEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Spacing 4</label>
          <input
            type="text"
            value={currentTokens['--spacing-4']}
            onChange={(e) => updateToken('--spacing-4', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Spacing 6</label>
          <input
            type="text"
            value={currentTokens['--spacing-6']}
            onChange={(e) => updateToken('--spacing-6', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1.5rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Spacing 8</label>
          <input
            type="text"
            value={currentTokens['--spacing-8']}
            onChange={(e) => updateToken('--spacing-8', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="2rem"
          />
        </div>
      </div>
    </div>
  );

  const renderRadiusEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Small Radius</label>
          <input
            type="text"
            value={currentTokens['--radius-sm']}
            onChange={(e) => updateToken('--radius-sm', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="0.75rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Medium Radius</label>
          <input
            type="text"
            value={currentTokens['--radius-md']}
            onChange={(e) => updateToken('--radius-md', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1rem"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Large Radius</label>
          <input
            type="text"
            value={currentTokens['--radius-lg']}
            onChange={(e) => updateToken('--radius-lg', e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm font-mono"
            placeholder="1.25rem"
          />
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="mt-6 p-6 border rounded-lg bg-card">
      <h4 className="text-lg font-semibold mb-4">Live Preview</h4>
      
      <div className="space-y-4">
        {/* Buttons */}
        <div>
          <h5 className="text-sm font-medium mb-2">Buttons</h5>
          <div className="flex space-x-4">
            <button 
              className="px-6 py-3 rounded-md text-white font-medium"
              style={{ 
                backgroundColor: currentTokens['--primary'],
                borderRadius: currentTokens['--radius-md'],
                padding: `${currentTokens['--spacing-3']} ${currentTokens['--spacing-6']}`
              }}
            >
              Primary Button
            </button>
            <button 
              className="px-6 py-3 rounded-md text-white font-medium"
              style={{ 
                backgroundColor: currentTokens['--secondary'],
                borderRadius: currentTokens['--radius-md'],
                padding: `${currentTokens['--spacing-3']} ${currentTokens['--spacing-6']}`
              }}
            >
              Secondary Button
            </button>
          </div>
        </div>
        
        {/* Cards */}
        <div>
          <h5 className="text-sm font-medium mb-2">Cards</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: currentTokens['--background'],
                borderRadius: currentTokens['--radius-lg'],
                padding: currentTokens['--spacing-6']
              }}
            >
              <h6 className="font-semibold mb-2">Card Title</h6>
              <p className="text-sm opacity-75">This is a preview card showing how your tokens affect the design.</p>
            </div>
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: currentTokens['--accent'],
                borderRadius: currentTokens['--radius-md'],
                padding: currentTokens['--spacing-6']
              }}
            >
              <h6 className="font-semibold mb-2 text-white">Accent Card</h6>
              <p className="text-sm text-white opacity-75">This card uses the accent color.</p>
            </div>
          </div>
        </div>
        
        {/* Typography */}
        <div>
          <h5 className="text-sm font-medium mb-2">Typography</h5>
          <div className="space-y-2">
            <h1 
              className="font-bold"
              style={{ 
                fontSize: currentTokens['--font-size-xl'],
                fontFamily: currentTokens['--font-sans']
              }}
            >
              Heading 1
            </h1>
            <p 
              style={{ 
                fontSize: currentTokens['--font-size-base'],
                fontFamily: currentTokens['--font-sans']
              }}
            >
              This is body text showing how typography tokens affect the design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`token-playground ${className || ''}`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Token Playground</h3>
          <div className="flex space-x-2">
            <button
              onClick={resetTokens}
              className="px-4 py-2 text-sm border rounded hover:bg-muted"
            >
              Reset
            </button>
            <button
              onClick={exportTokens}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Export CSS
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Editor */}
        <div className="mb-6">
          {activeTab === 'colors' && renderColorEditor()}
          {activeTab === 'typography' && renderTypographyEditor()}
          {activeTab === 'spacing' && renderSpacingEditor()}
          {activeTab === 'radius' && renderRadiusEditor()}
        </div>
        
        {/* Preview */}
        {renderPreview()}
      </div>
    </div>
  );
};
