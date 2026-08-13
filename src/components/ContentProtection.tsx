'use client';

import { useEffect } from 'react';

export const ContentProtection: React.FC = () => {
  useEffect(() => {
    // Disable right-click context menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable text/image copy event
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    // Disable cut event
    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    // Disable shortcut keys (Ctrl/Cmd + C, U, S, A, P, F12)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      // Allow Ctrl+A / Ctrl+C / Ctrl+V inside form inputs only
      if (isInput) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const metaKey = isMac ? e.metaKey : e.ctrlKey;

      if (
        (metaKey && (e.key === 'c' || e.key === 'C')) || // Copy
        (metaKey && (e.key === 'u' || e.key === 'U')) || // View Source
        (metaKey && (e.key === 's' || e.key === 'S')) || // Save Page
        (metaKey && (e.key === 'a' || e.key === 'A')) || // Select All
        (metaKey && (e.key === 'p' || e.key === 'P')) || // Print
        (metaKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) || // DevTools
        e.key === 'F12' // F12 DevTools
      ) {
        e.preventDefault();
      }
    };

    // Disable image drag
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null;
};
