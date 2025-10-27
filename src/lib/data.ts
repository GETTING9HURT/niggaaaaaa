import type { Plant, TribalLanguage } from './types';

export const plants: Plant[] = [
  {
    id: 1,
    englishName: 'Neem',
    hindiName: 'नीम',
    scientificName: 'Azadirachta indica',
    family: 'Meliaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [
      { language: 'Santhali', name: 'Neem Dare', pronunciation: 'neem da-ray' },
      { language: 'Gondi', name: 'Vepa', pronunciation: 'vay-pa' },
    ],
    medicinalUses: [
      'Antiseptic, treats skin diseases like eczema and acne.',
      'Used as a natural pesticide.',
      'Improves oral health, used in toothpastes.',
    ],
    preparationMethods: [
      'Paste of leaves applied on skin.',
      'Twigs used as a toothbrush.',
      'Decoction of bark for fevers.',
    ],
    precautions: ['Excessive internal use can cause liver damage. Not recommended for pregnant women.'],
    imageUrl: "https://images.unsplash.com/photo-1704380881202-ead38b580d9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxuZWVtJTIwdHJlZXxlbnwwfHx8fDE3NjE0NTc1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "neem tree"
  },
  {
    id: 2,
    englishName: 'Tulsi (Holy Basil)',
    hindiName: 'तुलसी',
    scientificName: 'Ocimum tenuiflorum',
    family: 'Lamiaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [
      { language: 'Ho', name: 'Tulsi Baha', pronunciation: 'tool-see ba-ha' },
      { language: 'Bhil', name: 'Tulsi', pronunciation: 'tool-see' },
    ],
    medicinalUses: [
      'Boosts immunity, effective against cough and cold.',
      'Reduces stress and anxiety (adaptogen).',
      'Purifies blood and improves skin health.',
    ],
    preparationMethods: [
      'Leaves chewed raw or brewed as tea.',
      'Juice of leaves mixed with honey for cough.',
      'Used in religious ceremonies.',
    ],
    precautions: ['Can lower blood sugar, so diabetics should be cautious. May have anti-fertility effects.'],
    imageUrl: "https://images.unsplash.com/photo-1696397279839-a2b8785c2113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0dWxzaSUyMHBsYW50fGVufDB8fHx8MTc2MTUyODA3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "tulsi plant"
  },
  {
    id: 3,
    englishName: 'Ashwagandha',
    hindiName: 'अश्वगंधा',
    scientificName: 'Withania somnifera',
    family: 'Solanaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [
      { language: 'Khasi', name: 'Tirah', pronunciation: 'tee-rah' },
    ],
    medicinalUses: [
      'Reduces stress and anxiety, improves sleep.',
      'Boosts strength, stamina, and energy levels.',
      'Enhances cognitive function and memory.',
    ],
    preparationMethods: [
      'Root powder mixed with milk or honey.',
      'Capsules or extracts.',
      'Tinctures.',
    ],
    precautions: ['Avoid during pregnancy. Can cause stomach upset in large doses.'],
    imageUrl: "https://picsum.photos/seed/108/400/300",
    imageHint: "ashwagandha plant"
  },
];

export const tribalLanguages: TribalLanguage[] = [
    { id: 1, name: 'Santhali', region: 'East India' },
    { id: 2, name: 'Gondi', region: 'Central India' },
    { id: 3, name: 'Bhil', region: 'West India' },
    { id: 4, name: 'Ho', region: 'East India' },
    { id: 5, name: 'Khasi', region: 'Northeast India' },
    { id: 6, name: 'Mundari', region: 'East India' },
];

export const getPlantById = (id: number): Plant | undefined => {
  return plants.find(p => p.id === id);
}
