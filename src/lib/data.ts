
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
    imageUrl: "https://images.unsplash.com/photo-1565113423207-a492a62a70fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhc2h3YWdhbmRoYSUyMHBsYW50fGVufDB8fHx8MTc2MTQ1NzUxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "ashwagandha plant"
  },
  {
    id: 4,
    englishName: 'Turmeric',
    hindiName: 'हल्दी',
    scientificName: 'Curcuma longa',
    family: 'Zingiberaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [
        { language: 'Gondi', name: 'Hardi', pronunciation: 'har-dee' }
    ],
    medicinalUses: [
        'Potent anti-inflammatory and antioxidant.',
        'Used for healing wounds and skin problems.',
        'Aids in digestion and liver function.'
    ],
    preparationMethods: [
        'Rhizome powder mixed with milk (golden milk).',
        'Paste of fresh rhizome applied to wounds.',
        'Used as a spice in cooking.'
    ],
    precautions: ['High doses can cause stomach issues. Can act as a blood thinner.'],
    imageUrl: "https://images.unsplash.com/photo-1702041295331-840d4d9aa7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxUdXJtZXJpY3xlbnwwfHx8fDE3NjE1NDI0NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "turmeric plant"
  },
  {
    id: 5,
    englishName: 'Amla (Indian Gooseberry)',
    hindiName: 'आंवला',
    scientificName: 'Phyllanthus emblica',
    family: 'Phyllanthaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
        'Extremely rich in Vitamin C, boosts immunity.',
        'Promotes hair health and prevents premature graying.',
        'Improves eyesight and purifies blood.'
    ],
    preparationMethods: [
        'Eaten raw, pickled, or as a powder.',
        'Juice consumed for health benefits.',
        'Used in hair oils and masks.'
    ],
    precautions: ['May increase acidity in some individuals.'],
    imageUrl: "https://images.unsplash.com/photo-1676043967557-2b70d9facd71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhbWxhfGVufDB8fHx8MTc2MTU0MjA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "amla fruit"
  },
  {
    id: 6,
    englishName: 'Brahmi',
    hindiName: 'ब्राह्मी',
    scientificName: 'Bacopa monnieri',
    family: 'Plantaginaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
        'Enhances memory, concentration, and cognitive functions.',
        'Reduces anxiety and stress.',
        'Supports nervous system health.'
    ],
    preparationMethods: [
        'Fresh leaves chewed or made into juice.',
        'Powder mixed with ghee or honey.',
        'Used in medicated oils for head massage.'
    ],
    precautions: ['Can cause stomach cramps and nausea on an empty stomach.'],
    imageUrl: "https://images.unsplash.com/photo-1693380140795-745c219de8c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxicmFobWl8ZW58MHx8fHwxNzYxNTQyMDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "brahmi plant"
  },
  {
    id: 7,
    englishName: 'Aloe Vera',
    hindiName: 'घृतकुमारी',
    scientificName: 'Aloe barbadensis miller',
    family: 'Asphodelaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
        'Soothes skin burns, irritations, and sunburns.',
        'Promotes digestion and detoxification.',
        'Moisturizes skin and hair.'
    ],
    preparationMethods: [
        'Gel from leaves applied directly to the skin.',
        'Juice consumed for internal benefits (with caution).',
        'Used in numerous cosmetic products.'
    ],
    precautions: ['Latex from the leaf can be a potent laxative and cause cramps.'],
    imageUrl: "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxBbG9lJTIwVmVyYSUyMHBsYW50fGVufDB8fHx8MTc2MjE5NjU3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "aloe vera"
  },
  {
    id: 8,
    englishName: 'Shatavari',
    hindiName: 'शतावरी',
    scientificName: 'Asparagus racemosus',
    family: 'Asparagaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
        'Supports female reproductive health.',
        'Acts as an adaptogen, helping the body manage stress.',
        'Aids digestion and has antioxidant properties.'
    ],
    preparationMethods: [
        'Root powder taken with milk.',
        'Liquid extracts or capsules.',
    ],
    precautions: ['May have diuretic effects. People allergic to asparagus should avoid it.'],
    imageUrl: "https://images.unsplash.com/photo-1604594418582-1459a9a3f283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhc3BhcmFndXMlMjByYWNlbW9zdXN8ZW58MHx8fHwxNzYyMTk2NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "shatavari plant"
  },
  {
    id: 9,
    englishName: 'Guggul',
    hindiName: 'गुग्गुल',
    scientificName: 'Commiphora wightii',
    family: 'Burseraceae',
    isMedicinal: true,
    isEndangered: true,
    tribalNames: [],
    medicinalUses: [
        'Helps in weight management.',
        'Supports joint health and reduces inflammation.',
        'Used to manage cholesterol levels.'
    ],
    preparationMethods: [
        'Resin purified and used in tablet form.',
        'Extracts standardized for guggulsterones.',
    ],
    precautions: ['Can cause skin rashes or digestive upset. Avoid during pregnancy.'],
    imageUrl: "https://plus.unsplash.com/premium_photo-1678652238217-3d96903f837e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDb21taXBob3JhJTIwd2lnaHRpaXxlbnwwfHx8fDE3NjIxOTY2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "guggul resin"
  }
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
