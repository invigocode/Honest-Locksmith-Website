export type ImageResolution = '1K' | '2K' | '4K';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  resolution: ImageResolution;
  timestamp: number;
}

export interface ApiKeyState {
  hasKey: boolean;
  checking: boolean;
}