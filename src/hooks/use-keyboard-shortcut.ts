'use client';

import { useEffect } from 'react';

interface UseKeyboardShortcutOptions {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  enabled?: boolean;
}

export function useKeyboardShortcut(
  options: UseKeyboardShortcutOptions,
  callback: (event: KeyboardEvent) => void
) {
  const { 
    key, 
    metaKey = false, 
    ctrlKey = false, 
    shiftKey = false, 
    altKey = false,
    enabled = true 
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the key matches
      const keyMatches = event.key.toLowerCase() === key.toLowerCase();
      
      // Check if modifiers match
      const metaMatches = metaKey === event.metaKey;
      const ctrlMatches = ctrlKey === event.ctrlKey;
      const shiftMatches = shiftKey === event.shiftKey;
      const altMatches = altKey === event.altKey;
      
      // Only trigger if all conditions are met
      if (keyMatches && metaMatches && ctrlMatches && shiftMatches && altMatches) {
        // Don't trigger if user is typing in an input
        const target = event.target as HTMLElement;
        const isInput = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.contentEditable === 'true';
        
        if (!isInput) {
          event.preventDefault();
          callback(event);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, metaKey, ctrlKey, shiftKey, altKey, enabled, callback]);
}

// Helper for common shortcuts
export function useCommandK(callback: () => void, enabled = true) {
  useKeyboardShortcut(
    {
      key: 'k',
      metaKey: true,   // Mac Cmd
      ctrlKey: false,
      enabled
    },
    callback
  );
  
  // Also listen for Ctrl+K on Windows/Linux
  useKeyboardShortcut(
    {
      key: 'k',
      metaKey: false,
      ctrlKey: true,   // Windows/Linux Ctrl
      enabled
    },
    callback
  );
}
