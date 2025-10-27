
'use server';
/**
 * @fileOverview A flow for translating plant names into tribal languages.
 *
 * - translatePlantName - A function that handles the translation.
 * - TranslatePlantNameInput - The input type for the function.
 * - TranslatePlantNameOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslatePlantNameInputSchema = z.object({
  plantName: z.string().describe('The common English name of the plant.'),
  languageName: z.string().describe('The name of the tribal language to translate into.'),
});
export type TranslatePlantNameInput = z.infer<typeof TranslatePlantNameInputSchema>;

const TranslatePlantNameOutputSchema = z.object({
  translatedName: z.string().describe('The translated name of the plant in the specified language.'),
  pronunciation: z.string().describe('A simple, phonetic pronunciation guide for the translated name.'),
});
export type TranslatePlantNameOutput = z.infer<typeof TranslatePlantNameOutputSchema>;

export async function translatePlantName(input: TranslatePlantNameInput): Promise<TranslatePlantNameOutput> {
  return translatePlantNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePlantNamePrompt',
  input: { schema: TranslatePlantNameInputSchema },
  output: { schema: TranslatePlantNameOutputSchema },
  prompt: `You are an expert linguist specializing in the tribal languages of India.
Your task is to translate the name of a plant into a specified tribal language.

Provide the most accurate translation for the plant name.
Also, provide a simple, easy-to-understand phonetic pronunciation guide.

If a direct translation is not available or widely known, provide the most commonly used local name for that plant in that language community. If no name is known, state "Not Available".

Plant to translate: {{{plantName}}}
Translate to: {{{languageName}}}`,
});

const translatePlantNameFlow = ai.defineFlow(
  {
    name: 'translatePlantNameFlow',
    inputSchema: TranslatePlantNameInputSchema,
    outputSchema: TranslatePlantNameOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
