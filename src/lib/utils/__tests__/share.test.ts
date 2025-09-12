import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  shareContent, 
  copyToClipboard, 
  createWeatherShareData,
  isWebShareSupported,
  isClipboardSupported,
  type ShareData 
} from '../share';

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Share Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('createWeatherShareData', () => {
    it('should create share data with default text', () => {
      const location = { name: 'New York', country: 'USA' };
      const url = 'https://example.com';
      
      const shareData = createWeatherShareData(location, url);
      
      expect(shareData).toEqual({
        title: 'Weather GT - Current Weather',
        text: 'Check out the weather in New York, USA',
        url: 'https://example.com',
      });
    });

    it('should create share data with custom text', () => {
      const location = { name: 'London', country: 'UK' };
      const url = 'https://example.com';
      const customText = 'Beautiful weather in London today!';
      
      const shareData = createWeatherShareData(location, url, customText);
      
      expect(shareData).toEqual({
        title: 'Weather GT - Current Weather',
        text: 'Beautiful weather in London today!',
        url: 'https://example.com',
      });
    });
  });

  describe('isWebShareSupported', () => {
    it('should return true when Web Share API is available', () => {
      // Mock navigator.share and navigator.canShare
      Object.defineProperty(navigator, 'share', {
        value: vi.fn(),
        writable: true,
      });
      Object.defineProperty(navigator, 'canShare', {
        value: vi.fn(),
        writable: true,
      });

      expect(isWebShareSupported()).toBe(true);
    });

    it('should return false when Web Share API is not available', () => {
      // Remove navigator.share
      delete (navigator as any).share;
      delete (navigator as any).canShare;

      expect(isWebShareSupported()).toBe(false);
    });
  });

  describe('isClipboardSupported', () => {
    it('should return true when clipboard API is available in secure context', () => {
      // Mock navigator.clipboard and window.isSecureContext
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn() },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      expect(isClipboardSupported()).toBe(true);
    });

    it('should return false when not in secure context', () => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn() },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: false,
        writable: true,
      });

      expect(isClipboardSupported()).toBe(false);
    });
  });

  describe('copyToClipboard', () => {
    it('should use modern clipboard API when available', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const shareData: ShareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com',
      };

      const result = await copyToClipboard(shareData);

      expect(mockWriteText).toHaveBeenCalledWith('Test\nTest text\nhttps://example.com');
      expect(result.success).toBe(true);
      expect(result.method).toBe('clipboard');
    });

    it('should fallback to execCommand when clipboard API is not available', async () => {
      // Remove clipboard API
      delete (navigator as any).clipboard;
      Object.defineProperty(window, 'isSecureContext', {
        value: false,
        writable: true,
      });

      // Mock document.execCommand
      const mockExecCommand = vi.fn().mockReturnValue(true);
      Object.defineProperty(document, 'execCommand', {
        value: mockExecCommand,
        writable: true,
      });

      // Mock document.createElement and related methods
      const mockTextArea = {
        value: '',
        style: {},
        focus: vi.fn(),
        select: vi.fn(),
      };
      const mockCreateElement = vi.fn().mockReturnValue(mockTextArea);
      const mockAppendChild = vi.fn();
      const mockRemoveChild = vi.fn();

      Object.defineProperty(document, 'createElement', {
        value: mockCreateElement,
        writable: true,
      });
      Object.defineProperty(document.body, 'appendChild', {
        value: mockAppendChild,
        writable: true,
      });
      Object.defineProperty(document.body, 'removeChild', {
        value: mockRemoveChild,
        writable: true,
      });

      const shareData: ShareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com',
      };

      const result = await copyToClipboard(shareData);

      expect(mockCreateElement).toHaveBeenCalledWith('textarea');
      expect(mockAppendChild).toHaveBeenCalledWith(mockTextArea);
      expect(mockExecCommand).toHaveBeenCalledWith('copy');
      expect(mockRemoveChild).toHaveBeenCalledWith(mockTextArea);
      expect(result.success).toBe(true);
      expect(result.method).toBe('clipboard');
    });

    it('should handle clipboard errors', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('Clipboard error'));
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const shareData: ShareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com',
      };

      const result = await copyToClipboard(shareData);

      expect(result.success).toBe(false);
      expect(result.method).toBe('clipboard');
      expect(result.error).toBe('Clipboard error');
    });
  });

  describe('shareContent', () => {
    it('should use Web Share API when available', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined);
      const mockCanShare = vi.fn().mockReturnValue(true);
      
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true,
      });
      Object.defineProperty(navigator, 'canShare', {
        value: mockCanShare,
        writable: true,
      });

      const shareData: ShareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com',
      };

      const result = await shareContent(shareData);

      expect(mockCanShare).toHaveBeenCalledWith(shareData);
      expect(mockShare).toHaveBeenCalledWith(shareData);
      expect(result.success).toBe(true);
      expect(result.method).toBe('web-share');
    });

    it('should fallback to clipboard when Web Share API fails', async () => {
      const mockShare = vi.fn().mockRejectedValue(new Error('Share failed'));
      const mockCanShare = vi.fn().mockReturnValue(true);
      
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true,
      });
      Object.defineProperty(navigator, 'canShare', {
        value: mockCanShare,
        writable: true,
      });

      // Mock clipboard API
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: mockWriteText },
        writable: true,
      });
      Object.defineProperty(window, 'isSecureContext', {
        value: true,
        writable: true,
      });

      const shareData: ShareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com',
      };

      const result = await shareContent(shareData);

      expect(result.success).toBe(true);
      expect(result.method).toBe('clipboard');
    });

    it('should handle user cancellation gracefully', async () => {
      const mockShare = vi.fn().mockRejectedValue(new Error('AbortError'));
      const mockCanShare = vi.fn().mockReturnValue(true);
      
      Object.defineProperty(navigator, 'share', {
        value: mockShare,
        writable: true,
      });
      Object.defineProperty(navigator, 'canShare', {
        value: mockCanShare,
        writable: true,
      });

      const shareData: ShareData = {
        title: 'Test',
        text: 'Test text',
        url: 'https://example.com',
      };

      const result = await shareContent(shareData);

      expect(result.success).toBe(false);
      expect(result.method).toBe('web-share');
      expect(result.error).toBe('User cancelled');
    });
  });
});
