'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/phosphor-icon';
import { useWeatherStore } from '@/lib/store/weather-store';

interface ShortcutItem {
  keys: string;
  description: string;
  category: 'navigation' | 'settings' | 'system';
  icon?: string;
}

const shortcuts: ShortcutItem[] = [
  {
    keys: '⌘K / Ctrl+K',
    description: 'Open Search Command Palette',
    category: 'navigation',
    icon: 'MagnifyingGlass'
  },
  {
    keys: 'C',
    description: 'Go to Compare View',
    category: 'navigation',
    icon: 'Columns'
  },
  {
    keys: 'F',
    description: 'Toggle Favorites Dropdown',
    category: 'navigation',
    icon: 'Heart'
  },
  {
    keys: 'U',
    description: 'Toggle Units (Metric/Imperial)',
    category: 'settings',
    icon: 'Ruler'
  },
  {
    keys: 'T',
    description: 'Toggle Theme (Light/Dark)',
    category: 'settings',
    icon: 'Sun'
  },
  {
    keys: '?',
    description: 'Open/Close this Cheat Sheet',
    category: 'system',
    icon: 'Question'
  },
  {
    keys: 'Esc',
    description: 'Close any open dialog/sheet',
    category: 'system',
    icon: 'X'
  }
];

const categoryLabels = {
  navigation: 'Navigation',
  settings: 'Settings',
  system: 'System'
};

export function KeyboardShortcutsSheet() {
  const { accessibility } = useWeatherStore();
  const shortcutsEnabled = accessibility.keyboardShortcuts;

  if (!shortcutsEnabled) {
    return null; // Don't render if shortcuts are disabled
  }

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, ShortcutItem[]>);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-16 transition-all duration-200 text-muted-foreground hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 active:text-primary/80 active:bg-primary/20 dark:active:bg-primary/30"
          aria-label="Open keyboard shortcuts cheat sheet"
          data-cheat-sheet-trigger="true"
        >
          <Icon name="Question" size={24} color="primary" withDuotone={true} className="size-10 transition-all duration-200 text-muted-foreground group-hover:text-primary group-active:text-primary/80" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg glass-strong bg-background/95 border-border/50 backdrop-blur-xl"
      >
        <SheetHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
              <Icon name="Keyboard" size={20} color="primary" withDuotone={true} className="text-primary" />
            </div>
            <SheetTitle className="text-h3 font-display text-foreground">
              Keyboard Shortcuts
            </SheetTitle>
          </div>
          <SheetDescription className="text-body-s text-muted-foreground leading-relaxed">
            Master the app with these time-saving shortcuts. Press <kbd className="px-1.5 py-0.5 text-xs rounded bg-muted border font-mono">?</kbd> anytime to open this reference.
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-px bg-border flex-1" />
                <h3 className="text-body-s font-medium text-muted-foreground uppercase tracking-wide">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </h3>
                <div className="h-px bg-border flex-1" />
              </div>
              
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/50 hover:bg-accent/50 hover:border-accent/50 transition-all duration-200"
                  >
                    {shortcut.icon && (
                      <div className="p-1.5 rounded-md bg-muted/50 group-hover:bg-primary/10 transition-colors duration-200">
                        <Icon 
                          name={shortcut.icon} 
                          size={16} 
                          color="muted" 
                          withDuotone={true} 
                          className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-body-s font-medium text-foreground leading-tight">
                        {shortcut.description}
                      </p>
                    </div>
                    
                    <kbd className="flex items-center justify-center min-w-[3rem] h-10 px-3 rounded-md border bg-background/80 font-mono text-sm font-medium text-foreground shadow-sm group-hover:shadow-md transition-shadow duration-200">
                      {shortcut.keys}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-body-xs text-muted-foreground">
            <Icon name="Info" size={14} color="muted" withDuotone={true} />
            <span>Shortcuts can be disabled in Settings → Accessibility</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
