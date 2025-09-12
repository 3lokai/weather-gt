import { toast } from 'sonner';

/**
 * Share utilities with Web Share API fallback to clipboard
 */

export interface ShareData {
  title?: string;
  text?: string;
  url?: string;
}

export interface ShareResult {
  success: boolean;
  method: 'web-share' | 'clipboard' | 'none';
  error?: string;
}

/**
 * Shares content using Web Share API with clipboard fallback
 */
export async function shareContent(data: ShareData): Promise<ShareResult> {
  // Check if Web Share API is available
  if (navigator.share && navigator.canShare && navigator.canShare(data)) {
    try {
      await navigator.share(data);
      toast.success('Shared successfully!');
      return { success: true, method: 'web-share' };
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name === 'AbortError') {
        return { success: false, method: 'web-share', error: 'User cancelled' };
      }
      // Fall through to clipboard fallback
    }
  }

  // Fallback to clipboard
  return await copyToClipboard(data);
}

/**
 * Copies content to clipboard
 */
export async function copyToClipboard(data: ShareData): Promise<ShareResult> {
  try {
    // Create share text
    const shareText = [data.title, data.text, data.url]
      .filter(Boolean)
      .join('\n');

    if (navigator.clipboard && window.isSecureContext) {
      // Use modern clipboard API
      await navigator.clipboard.writeText(shareText);
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (!successful) {
        throw new Error('Failed to copy to clipboard');
      }
    }

    toast.success('Link copied to clipboard!');
    return { success: true, method: 'clipboard' };
  } catch (error) {
    toast.error('Failed to copy to clipboard');
    return { 
      success: false, 
      method: 'clipboard', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Creates share data for weather information
 */
export function createWeatherShareData(
  location: { name: string; country: string },
  url: string,
  customText?: string
): ShareData {
  const defaultText = `Check out the weather in ${location.name}, ${location.country}`;
  
  return {
    title: 'Weather GT - Current Weather',
    text: customText || defaultText,
    url: url,
  };
}

/**
 * Checks if Web Share API is supported
 */
export function isWebShareSupported(): boolean {
  return !!navigator.share;
}

/**
 * Checks if clipboard API is supported
 */
export function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && window.isSecureContext);
}
