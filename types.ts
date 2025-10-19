export type BirthdayScene = 'balloons' | 'candle' | 'studio' | 'hall';

export interface StyleOptions {
  age?: string;
  text?: string;
  clothingStyle?: string;
  clothingColor?: string;
  birthdayScene?: BirthdayScene;
}

export interface Style {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  prompt: (options?: StyleOptions) => string;
}