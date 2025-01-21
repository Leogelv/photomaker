export interface Preset {
  name: string;
  prompt: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  presets: Preset[];
}

export interface GenerationResult {
  urls: string[];
} 