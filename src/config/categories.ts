import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: 'professional-headshots',
    title: 'Деловой Портрет',
    description: 'Профессиональные фотографии для резюме, LinkedIn и бизнес-профилей',
    icon: 'ph:user-circle-duotone',
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
  {
    id: 'fashion-portfolio',
    title: 'Модное Портфолио',
    description: 'Стильные фотографии для модельного портфолио и Instagram',
    icon: 'ph:camera-duotone',
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
  {
    id: 'creative-portrait',
    title: 'Креативный Портрет',
    description: 'Уникальные художественные портреты с необычными эффектами',
    icon: 'ph:sparkle-duotone',
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
  {
    id: 'personal-branding',
    title: 'Личный Бренд',
    description: 'Фотографии для развития личного бренда и соцсетей',
    icon: 'ph:briefcase-duotone',
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
  {
    id: 'social-media',
    title: 'Соцсети',
    description: 'Привлекательные фото для всех социальных платформ',
    icon: 'ph:share-network-duotone',
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
]; 