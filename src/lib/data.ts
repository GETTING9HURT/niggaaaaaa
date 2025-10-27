
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
  },
  {
    id: 10,
    englishName: 'Moringa',
    hindiName: 'सहजन',
    scientificName: 'Moringa oleifera',
    family: 'Moringaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
      'Highly nutritious, rich in vitamins and minerals.',
      'Has anti-inflammatory and antioxidant properties.',
      'Can help lower blood sugar and cholesterol levels.'
    ],
    preparationMethods: [
      'Leaves cooked and eaten as a vegetable.',
      'Leaf powder added to smoothies or tea.',
      'Pods used in curries.'
    ],
    precautions: ['Roots and root extracts should be avoided during pregnancy.'],
    imageUrl: "https://images.unsplash.com/photo-1632349944365-5933c09f3032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3JpbmdhJTIwb2xlaWZlcmF8ZW58MHx8fHwxNzYyMTk4NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "moringa tree"
  },
  {
    id: 11,
    englishName: 'Giloy',
    hindiName: 'गिलोय',
    scientificName: 'Tinospora cordifolia',
    family: 'Menispermaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
      'Boosts immunity and helps fight fevers (antipyretic).',
      'Supports liver function and detoxification.',
      'Helps manage respiratory issues.'
    ],
    preparationMethods: [
      'Juice extracted from the stem.',
      'Decoction of the stem.',
      'Powdered stem used in formulations.'
    ],
    precautions: ['May cause constipation for some. Autoimmune patients should consult a doctor.'],
    imageUrl: "https://images.unsplash.com/photo-1721115328229-23a5abc9a3e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxUaW5vc3BvcmElMjBjb3JkaWZvbGlhfGVufDB8fHx8MTc2MjE5ODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "giloy vine"
  },
  {
    id: 12,
    englishName: 'Kalmegh',
    hindiName: 'कालमेघ',
    scientificName: 'Andrographis paniculata',
    family: 'Acanthaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
      'Effective for common cold, flu, and upper respiratory infections.',
      'Supports liver health and function.',
      'Has strong anti-inflammatory and antiviral properties.'
    ],
    preparationMethods: [
      'Decoction of the whole plant.',
      'Powdered leaves and stem.',
      'Extracts in capsule form.'
    ],
    precautions: ['Very bitter taste. Can cause dizziness and stomach upset in high doses.'],
    imageUrl: "https://images.unsplash.com/photo-1707923483320-94f48a17387a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxBbmRyb2dyYXBoaXMlMjBwYW5pY3VsYXRhfGVufDB8fHx8MTc2MjE5ODcxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "kalmegh plant"
  },
  {
    id: 13,
    englishName: 'Ginger',
    hindiName: 'अदरक',
    scientificName: 'Zingiber officinale',
    family: 'Zingiberaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
      'Relieves nausea and indigestion.',
      'Anti-inflammatory, can help with joint pain.',
      'Soothes sore throats.'
    ],
    preparationMethods: [
      'Brewed as a tea from fresh rhizome.',
      'Used fresh or dried in cooking.',
      'Juice mixed with honey for coughs.'
    ],
    precautions: ['Can act as a blood thinner. May cause heartburn in large quantities.'],
    imageUrl: "https://images.unsplash.com/photo-1620989339031-a3875320516a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnaW5nZXIlMjByb290fGVufDB8fHx8MTc2MjE5OTQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "ginger root"
  },
  {
    id: 14,
    englishName: 'Peppermint',
    hindiName: 'पुदीना',
    scientificName: 'Mentha piperita',
    family: 'Lamiaceae',
    isMedicinal: true,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
      'Soothes digestive issues like bloating and gas.',
      'Relieves tension headaches when applied topically (oil).',
      'Acts as a decongestant for colds.'
    ],
    preparationMethods: [
      'Leaves brewed as a tea.',
      'Essential oil used in aromatherapy or diluted for topical application.',
      'Fresh leaves used as a garnish.'
    ],
    precautions: ['Should not be given to infants. Can worsen acid reflux in some people.'],
    imageUrl: "https://images.unsplash.com/photo-1596495691452-f2acedfd808c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXBwZXJtaW50JTIwbGVhdmVzfGVufDB8fHx8MTc2MjE5OTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "peppermint leaves"
  },
  {
    id: 15,
    englishName: 'Tomato',
    hindiName: 'टमाटर',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    isMedicinal: false,
    isEndangered: false,
    tribalNames: [],
    medicinalUses: [
      'Rich in lycopene, an antioxidant that supports heart health.',
      'Good source of Vitamin C and K.'
    ],
    preparationMethods: [
      'Eaten raw in salads.',
      'Cooked into sauces, soups, and curries.'
    ],
    precautions: ['Highly acidic and may cause issues for people with acid reflux.'],
    imageUrl: "https://images.unsplash.com/photo-1582284540020-8acbe03fec79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0b21hdG9lcyUyMG9uJTIwdmluZXxlbnwwfHx8fDE3NjIyMDAyOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "tomatoes on vine"
  }
];

export const plantNames: string[] = [
  'Aloe Vera', 'Tulsi', 'Neem', 'Mint', 'Basil', 'Coriander', 'Parsley', 'Rosemary', 
  'Thyme', 'Oregano', 'Sage', 'Lavender', 'Chamomile', 'Dandelion', 'Peppermint', 'Ginger', 
  'Turmeric', 'Garlic', 'Onion', 'Spinach', 'Tomato', 'Potato', 'Chili', 'Carrot', 'Cabbage', 
  'Broccoli', 'Cauliflower', 'Radish', 'Beetroot', 'Cucumber', 'Zucchini', 'Pumpkin', 'Squash', 
  'Bitter Gourd', 'Bottle Gourd', 'Ash Gourd', 'Snake Gourd', 'Ivy Gourd', 'Drumstick', 'Moringa', 
  'Fenugreek', 'Mustard', 'Lettuce', 'Celery', 'Leek', 'Chives', 'Amaranth', 'Purslane', 
  'Jasmine', 'Hibiscus', 'Marigold', 'Sunflower', 'Lotus', 'Orchid', 'Lily', 'Rose', 
  'Bougainvillea', 'Ixora', 'Begonia', 'Petunia', 'Daisy', 'Foxglove', 'Magnolia', 'Azalea', 
  'Camellia', 'Gardenia', 'Heather', 'Hydrangea', 'Peony', 'Violet', 'Pansy', 'Primrose', 
  'Geranium', 'Verbena', 'Yarrow', 'Aster', 'Freesia', 'Snapdragon', 'Salvia', 'Bluebell', 
  'Clematis', 'Cyclamen', 'Forget-me-not', 'Carnation', 'Rhododendron', 'Dahlia', 'Lobelia', 
  'Zinnia', 'Calendula', 'Cosmos', 'Sweet Pea', 'Moss', 'Fern', 'Bamboo', 'Oak', 'Pine', 'Maple', 
  'Birch', 'Cedar', 'Spruce', 'Willow', 'Sycamore', 'Teak', 'Coconut', 'Banana', 'Mango', 'Papaya', 
  'Guava', 'Apple', 'Berry', 'Date', 'Fig', 'Grape', 'Peach', 'Plum', 'Pear', 'Orange', 'Lemon', 
  'Lime', 'Chiku', 'Jackfruit', 'Avocado', 'Cashew', 'Tamarind', 'Coffee', 'Tea', 'Rubber', 
  'Sugarcane', 'Wheat', 'Rice', 'Barley', 'Maize', 'Sorghum', 'Millet', 'Oats', 'Rye', 'Quinoa', 
  'Chia', 'Buckwheat', 'Sesame', 'Saffron', 'Clove', 'Cardamom', 'Cinnamon', 'Nutmeg', 
  'Star Anise', 'Fennel', 'Poppy', 'Castor', 'Sunhemp', 'Jute', 'Cotton', 'Flax'
];


export const tribalLanguages: TribalLanguage[] = [
    { id: 1, name: 'Santhali', region: 'East India' },
    { id: 2, name: 'Gondi', region: 'Central India' },
    { id: 3, name: 'Bhil', region: 'West India' },
    { id: 4, name: 'Ho', region: 'East India' },
    { id: 5, name: 'Khasi', region: 'Northeast India' },
    { id: 6, name: 'Mundari', region: 'East India' },
    { id: 7, name: 'Kurukh', region: 'East India' },
    { id: 8, 'name': 'Garo', 'region': 'Northeast India' },
    { id: 9, 'name': 'Tripuri', 'region': 'Northeast India' },
    { id: 10, 'name': 'Ao', 'region': 'Northeast India' },
    { id: 11, 'name': 'Angami', 'region': 'Northeast India' },
    { id: 12, 'name': 'Sema', 'region': 'Northeast India' },
    { id: 13, 'name': 'Lotha', 'region': 'Northeast India' },
    { id: 14, 'name': 'Mizo', 'region': 'Northeast India' },
    { id: 15, 'name': 'Hmar', 'region': 'Northeast India' },
    { id: 16, 'name': 'Paite', 'region': 'Northeast India' },
    { id: 17, 'name': 'Vaiphei', 'region': 'Northeast India' },
    { id: 18, 'name': 'Zou', 'region': 'Northeast India' },
    { id: 19, 'name': 'Simte', 'region': 'Northeast India' },
    { id: 20, 'name': 'Kom', 'region': 'Northeast India' },
    { id: 21, 'name': 'Chiru', 'region': 'Northeast India' },
    { id: 22, 'name': 'Koireng', 'region': 'Northeast India' },
    { id: 23, 'name': 'Thadou', 'region': 'Northeast India' },
    { id: 24, 'name': 'Gangte', 'region': 'Northeast India' },
    { id: 25, 'name': 'Anal', 'region': 'Northeast India' },
    { id: 26, 'name': 'Maring', 'region': 'Northeast India' },
    { id: 27, 'name': 'Tarao', 'region': 'Northeast India' },
    { id: 28, 'name': 'Moyon', 'region': 'Northeast India' },
    { id: 29, 'name': 'Monsang', 'region': 'Northeast India' },
    { id: 30, 'name': 'Lamkang', 'region': 'Northeast India' },
    { id: 31, 'name': 'Tangkhul', 'region': 'Northeast India' },
    { id: 32, 'name': 'Mao', 'region': 'Northeast India' },
    { id: 33, 'name': 'Poumai', 'region': 'Northeast India' },
    { id: 34, 'name': 'Maram', 'region': 'Northeast India' },
    { id: 35, 'name': 'Thangal', 'region': 'Northeast India' },
    { id: 36, 'name': 'Zeliang', 'region': 'Northeast India' },
    { id: 37, 'name': 'Rongmei', 'region': 'Northeast India' },
    { id: 38, 'name': 'Liangmai', 'region': 'Northeast India' },
    { id: 39, 'name': 'Zeme', 'region': 'Northeast India' },
    { id: 40, 'name': 'Konyak', 'region': 'Northeast India' },
    { id: 41, 'name': 'Phom', 'region': 'Northeast India' },
    { id: 42, 'name': 'Chang', 'region': 'Northeast India' },
    { id: 43, 'name': 'Sangtam', 'region': 'Northeast India' },
    { id: 44, 'name': 'Yimchunger', 'region': 'Northeast India' },
    { id: 45, 'name': 'Khiamniungan', 'region': 'Northeast India' },
    { id: 46, 'name': 'Chakhesang', 'region': 'Northeast India' },
    { id: 47, 'name': 'Pochury', 'region': 'Northeast India' },
    { id: 48, 'name': 'Rengma', 'region': 'Northeast India' },
    { id: 49, 'name': 'Tulu', 'region': 'South India' },
    { id: 50, 'name': 'Kodava', 'region': 'South India' },
    { id: 51, 'name': 'Koraga', 'region': 'South India' },
    { id: 52, 'name': 'Yerava', 'region': 'South India' },
    { id: 53, 'name': 'Kuruba', 'region': 'South India' },
    { id: 54, 'name': 'Irula', 'region': 'South India' },
    { id: 55, 'name': 'Toda', 'region': 'South India' },
    { id: 56, 'name': 'Kota', 'region': 'South India' },
    { id: 57, 'name': 'Koya', 'region': 'South India' },
    { id: 58, 'name': 'Savara', 'region': 'East India' },
    { id: 59, 'name': 'Juang', 'region': 'East India' },
    { id: 60, 'name': 'Kharia', 'region': 'East India' },
    { id: 61, 'name': 'Lodha', 'region': 'East India' },
    { id: 62, 'name': 'Mahli', 'region': 'East India' },
    { id: 63, 'name': 'Mal Paharia', 'region': 'East India' },
    { id: 64, 'name': 'Sauria Paharia', 'region': 'East India' },
    { id: 65, 'name': 'Birhor', 'region': 'East India' },
    { id: 66, 'name': 'Asur', 'region': 'East India' },
    { id: 67, 'name': 'Korwa', 'region': 'Central India' },
    { id: 68, 'name': 'Baiga', 'region': 'Central India' },
    { id: 69, 'name': 'Abujhmaria', 'region': 'Central India' },
    { id: 70, 'name': 'Hill Maria', 'region': 'Central India' },
    { id: 71, 'name': 'Dhurwa', 'region': 'Central India' },
    { id: 72, 'name': 'Bhatri', 'region': 'Central India' },
    { id: 73, 'name': 'Halbi', 'region': 'Central India' },
    { id: 74, 'name': 'Warli', 'region': 'West India' },
    { id: 75, 'name': 'Konkani', 'region': 'West India' },
    { id: 76, 'name': 'Dhodia', 'region': 'West India' },
    { id: 77, 'name': 'Dubla', 'region': 'West India' },
    { id: 78, 'name': 'Gamit', 'region': 'West India' },
    { id: 79, 'name': 'Chaudhari', 'region': 'West India' },
    { id: 80, 'name': 'Korku', 'region': 'West India' },
    { id: 81, 'name': 'Nihali', 'region': 'West India' },
    { id: 82, 'name': 'Andh', 'region': 'West India' },
    { id: 83, 'name': 'Thoti', 'region': 'West India' },
    { id: 84, 'name': 'Kolami', 'region': 'West India' },
    { id: 85, 'name': 'Naiki', 'region': 'West India' },
    { id: 86, 'name': 'Pardhan', 'region': 'West India' },
    { id: 87, 'name': 'Kinnauri', 'region': 'North India' },
    { id: 88, 'name': 'Lahauli', 'region': 'North India' },
    { id: 89, 'name': 'Spiti', 'region': 'North India' },
    { id: 90, 'name': 'Gaddi', 'region': 'North India' },
    { id: 91, 'name': 'Jaunsari', 'region': 'North India' },
    { id: 92, 'name': 'Bhotia', 'region': 'North India' },
    { id: 93, 'name': 'Raji', 'region': 'North India' },
    { id: 94, 'name': 'Tharu', 'region': 'North India' },
    { id: 95, 'name': 'Buxa', 'region': 'North India' },
    { id: 96, 'name': 'Shompen', 'region': 'Andaman & Nicobar' },
    { id: 97, 'name': 'Jarawa', 'region': 'Andaman & Nicobar' },
    { id: 98, 'name': 'Onge', 'region': 'Andaman & Nicobar' },
    { id: 99, 'name': 'Sentinelese', 'region': 'Andaman & Nicobar' },
    { id: 100, 'name': 'Great Andamanese', 'region': 'Andaman & Nicobar' }
];


export const getPlantById = (id: number): Plant | undefined => {
  return plants.find(p => p.id === id);
}
