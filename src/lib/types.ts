export interface Plant {
  id: number;
  englishName: string;
  hindiName: string;
  scientificName: string;
  family: string;
  isMedicinal: boolean;
  isEndangered: boolean;
  tribalNames: {
    language: string;
    name: string;
    pronunciation: string;
  }[];
  medicinalUses: string[];
  preparationMethods: string[];
  precautions: string[];
  imageUrl: string;
  imageHint: string;
}

export interface TribalLanguage {
  id: number;
  name: string;
  region: string;
}

export interface CommunityRemedy {
  id: string;
  plantName: string;
  remedyDescription: string;
  language: string;
  effectivenessRating: number;
  submittedAt: string;
  upvotes: number;
  downvotes: number;
  photoDataUri?: string; // Optional as it might be large
  isPlausible?: boolean;
  verificationNotes?: string;
}

export interface UserProgress {
  points: number;
  identifiedPlants: number[];
  remediesContributed: number;
  languageTests: {
    [plantId: number]: {
      attempts: number;
      bestScore: number;
    };
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
}
