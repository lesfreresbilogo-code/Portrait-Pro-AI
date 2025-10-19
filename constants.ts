import { Style, StyleOptions } from './types';

const createBasePrompt = (styleSpecifics: string, options?: StyleOptions) => {
  const clothingDescription = (options?.clothingStyle && options?.clothingColor)
    ? `The person is wearing ${options.clothingStyle} in a ${options.clothingColor} color.`
    : (options?.clothingStyle ? `The person is wearing ${options.clothingStyle}.` : '');

  return `
    Create a new, high-resolution, 4K, photorealistic image of a person.
    **Crucially, the face of the person in the new image MUST be identical to the face in the provided user image.**
    Integrate this face seamlessly onto a new body with a natural pose that fits the scene.
    The overall quality should be that of a professional photograph.
    ${clothingDescription}
    ${styleSpecifics}
  `;
};


export const STYLES: Style[] = [
  {
    id: 'studio',
    name: 'Studio Minimaliste',
    description: 'Fond uni, éclairage de studio propre, et tenues modernes pour un look tendance et net.',
    imageUrl: 'https://picsum.photos/seed/studio/500/500',
    prompt: (options) => createBasePrompt(`
      The style is minimalist and trendy studio fashion photography.
      - **Background:** Solid, soft beige colored studio background.
      - **Clothing:** (If not specified by user) A modern, chic, casual white linen shirt.
      - **Lighting:** Clean, bright, soft studio lighting, like a professional fashion photoshoot.
      - **Pose:** Confident, looking towards the camera, with a slight smile.
      - **Overall Vibe:** Elegant, modern, and clean.
    `, options)
  },
  {
    id: 'cinematic',
    name: 'Ambiance Cinématographique',
    description: 'Une ambiance sombre et scénarisée avec un éclairage dramatique de néons colorés.',
    imageUrl: 'https://picsum.photos/seed/cinematic/500/500',
    prompt: (options) => createBasePrompt(`
      The style is dark, urban, and cinematic.
      - **Background:** A moody, modern interior at night with dramatic shadows.
      - **Lighting:** Strong, colored neon lighting (green and blue) casting highlights and creating a cinematic atmosphere. A hint of atmospheric smoke/haze is in the air. The lighting on the face must perfectly match the scene's lighting.
      - **Clothing:** (If not specified by user) An elegant, stylish white blazer over a dark shirt.
      - **Pose:** A thoughtful, slightly side-on pose, looking just off-camera.
      - **Overall Vibe:** Mysterious, cool, and high-fashion.
    `, options)
  },
  {
    id: 'luxury',
    name: 'Luxe & Élégance',
    description: 'Mis en scène dans des lieux prestigieux avec des tenues formelles et une pose assurée.',
    imageUrl: 'https://picsum.photos/seed/luxury/500/500',
    prompt: (options) => createBasePrompt(`
      The style is luxury and elegance.
      - **Background:** A sophisticated, luxurious hotel lounge or a high-end restaurant with warm, ambient lighting and a blurred, upscale decor.
      - **Lighting:** Warm, soft, and atmospheric, creating a feeling of exclusivity and comfort.
      - **Clothing:** (If not specified by user) A perfectly tailored, formal burgundy suit with a crisp white shirt.
      - **Pose:** Confident and relaxed, perhaps sitting in a plush armchair.
      - **Overall Vibe:** Prestigious, successful, and refined.
    `, options)
  },
  {
    id: 'birthday',
    name: 'Célébration d\'Anniversaire',
    description: 'Un style joyeux et festif. Choisissez votre mise en scène : avec des ballons, un gâteau, en studio et plus encore.',
    imageUrl: 'https://picsum.photos/seed/birthday/500/500',
    prompt: (options) => {
      let sceneDescription = '';
      switch (options?.birthdayScene) {
        case 'candle':
          sceneDescription = `
            The scene is a close-up, intimate shot. The person is leaning forward to blow out a single, glowing candle on a small, elegant birthday cake. The background is dark to focus all attention on the person's face illuminated by the candlelight. The atmosphere is warm and personal.
          `;
          break;
        case 'hall':
          sceneDescription = `
            The scene is a lavish birthday party in a grand, beautifully decorated hall. The person is the center of attention, smiling radiantly. The background is filled with blurred guests, festive decorations like banners and soft lights, creating a vibrant and celebratory atmosphere.
          `;
          break;
        case 'studio':
          sceneDescription = `
            The scene is a professional birthday photoshoot in a studio. The background is a solid, cheerful color (like pastel blue or yellow). The person is posing happily, maybe with a small stack of elegantly wrapped presents or a single cupcake. The lighting is bright and flawless. The vibe is clean, modern, and joyful.
          `;
          break;
        case 'balloons':
        default:
          const accessoryText = options?.text
            ? `large, beautiful, golden foil balloons shaped into the letters forming the word '${options.text}'`
            : `large, beautiful, golden foil balloons shaped into the number '${options?.age || '25'}'`;
          sceneDescription = `
             The person is joyfully holding ${accessoryText}. The background is a clean, light grey studio setting to emphasize the subject. There is subtle, out-of-focus golden confetti in the air. The lighting is bright and happy. The pose is proud and celebratory.
          `;
          break;
      }
      return createBasePrompt(sceneDescription, options);
    }
  }
];