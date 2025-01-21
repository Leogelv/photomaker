export type PhotoCategory = 
  | 'professional-headshots'
  | 'fashion-portfolio'
  | 'creative-portrait'
  | 'personal-branding'
  | 'social-media';

export interface PhotoSession {
  category: PhotoCategory;
  prompt: string;
  subject?: string;
  params: Record<string, any>;
}

export interface GenerationResult {
  urls: string[];
}

interface CategoryConfig {
  title: string;
  description: string;
  defaultPrompt: string;
  presets: Array<{
    name: string;
    prompt: string;
  }>;
}

export const CATEGORY_CONFIGS: Record<PhotoCategory, CategoryConfig> = {
  'professional-headshots': {
    title: 'Деловой Портрет',
    description: 'Профессиональные фотографии для резюме, LinkedIn и бизнес-профилей',
    defaultPrompt: 'Создай профессиональный деловой портрет в современном офисном стиле',
    presets: [
      {
        name: 'Классический',
        prompt: 'Деловой портрет в классическом костюме на нейтральном фоне',
      },
      {
        name: 'Креативный',
        prompt: 'Современный деловой портрет в неформальной обстановке',
      },
    ],
  },
  'fashion-portfolio': {
    title: 'Модное Портфолио',
    description: 'Стильные фотографии для модельного портфолио и Instagram',
    defaultPrompt: 'Создай модную фотосессию в стиле высокой моды',
    presets: [
      {
        name: 'Высокая мода',
        prompt: 'Фэшн-фотография в стиле Vogue на городском фоне',
      },
      {
        name: 'Уличный стиль',
        prompt: 'Модная фотосессия в стиле street fashion',
      },
    ],
  },
  'creative-portrait': {
    title: 'Креативный Портрет',
    description: 'Уникальные художественные портреты с необычными эффектами',
    defaultPrompt: 'Создай креативный портрет с художественными эффектами',
    presets: [
      {
        name: 'Сюрреализм',
        prompt: 'Сюрреалистический портрет с необычными визуальными эффектами',
      },
      {
        name: 'Неон',
        prompt: 'Портрет в неоновых огнях киберпанк стиля',
      },
    ],
  },
  'personal-branding': {
    title: 'Личный Бренд',
    description: 'Фотографии для развития личного бренда и соцсетей',
    defaultPrompt: 'Создай профессиональные фото для личного бренда',
    presets: [
      {
        name: 'Эксперт',
        prompt: 'Портрет уверенного профессионала в рабочей обстановке',
      },
      {
        name: 'Влиятельный',
        prompt: 'Харизматичный портрет для социальных сетей',
      },
    ],
  },
  'social-media': {
    title: 'Соцсети',
    description: 'Привлекательные фото для всех социальных платформ',
    defaultPrompt: 'Создай привлекательное фото для социальных сетей',
    presets: [
      {
        name: 'Лайфстайл',
        prompt: 'Естественный портрет в повседневной обстановке',
      },
      {
        name: 'Блогер',
        prompt: 'Динамичный портрет для контента в соцсетях',
      },
    ],
  },
}; 