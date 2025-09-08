'use client';

import * as React from 'react';
import { useState } from 'react';
import { SearchCommand } from './search-command';
import { useCommandK } from '@/hooks/use-keyboard-shortcut';

interface SearchProviderProps {
  children: React.ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Handle Cmd/Ctrl+K keyboard shortcut
  useCommandK(() => {
    setSearchOpen(true);
  });

  return (
    <>
      {children}
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
