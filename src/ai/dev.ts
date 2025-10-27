import { config } from 'dotenv';
config();

import '@/ai/flows/medicinal-knowledge-chatbot.ts';
import '@/ai/flows/community-remedy-verification.ts';
import '@/ai/flows/plant-identification-flow.ts';
import '@/ai/flows/text-to-speech-flow.ts';
import '@/ai/flows/translate-plant-name-flow.ts';
import '@/ai/flows/tribal-language-chatbot.ts';
import '@/ai/flows/remedy-suggestion-flow.ts';
