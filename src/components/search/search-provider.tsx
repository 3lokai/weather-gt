'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SearchCommand } from './search-command';
import { useCommandK } from '@/hooks/use-keyboard-shortcut';
import { Button } from '@/components/ui/button';

interface SearchProviderProps {
  children: React.ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);

  // Handle Cmd/Ctrl+K keyboard shortcut
  useCommandK(() => {
    setSearchOpen(true);
  });

  // Set data attribute on the hidden button for keyboard shortcut targeting
  useEffect(() => {
    if (searchTriggerRef.current) {
      searchTriggerRef.current.setAttribute('data-search-trigger', 'true');
    }
  }, []);

  return (
    <>
      {children}
      {/* Hidden button for keyboard shortcut targeting */}
      <Button
        ref={searchTriggerRef}
        className="sr-only"
        onClick={() => setSearchOpen(true)}
        data-search-trigger="true"
      >
        Open search
      </Button>
      <SearchCommand 
        open={searchOpen} 
        onOpenChange={setSearchOpen}
      />
    </>
  );
}

// Hook for components that want to trigger search programmatically
export function useSearchCommand() {
  const [searchOpen, setSearchOpen] = useState(false);

  return {
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    isSearchOpen: searchOpen,
  };
}
