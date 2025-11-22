
'use server';
/**
 * @fileOverview A flow for translating plant names into tribal languages.
 *
 * - translatePlantName - A function that handles the translation.
 * - TranslatePlantNameInput - The input type for the function.
 * - TranslatePlantNameOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TranslatePlantNameInputSchema = z.object({
  plantName: z.string().describe('The common English or Hindi name of the plant.'),
  languageName: z.string().describe('The name of the tribal language to translate into.'),
});
export type TranslatePlantNameInput = z.infer<typeof TranslatePlantNameInputSchema>;

const TranslatePlantNameOutputSchema = z.object({
  translatedName: z.string().describe('The translated name of the plant in the specified language. If no translation is found, this MUST be "Not Available".'),
  pronunciation: z.string().describe('A simple, phonetic pronunciation guide for the translated name. If no translation is found, this should be empty.'),
});
export type TranslatePlantNameOutput = z.infer<typeof TranslatePlantNameOutputSchema>;

export async function translatePlantName(input: TranslatePlantNameInput): Promise<TranslatePlantNameOutput> {
  return translatePlantNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translatePlantNamePrompt',
  input: { schema: TranslatePlantNameInputSchema },
  output: { schema: TranslatePlantNameOutputSchema },
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an expert linguist and ethnobotanist specializing in the tribal languages and dialects of India.
Your task is to translate the name of a plant into a specified tribal language with the highest possible accuracy.

Follow these rules strictly:
1.  Provide the most accurate, authentic translation for the plant name in the target language.
2.  If a direct translation is not available or not commonly used, provide the most widely used local name for that plant within that language community.
3.  If no name is known in the specified language, try to find the name in a closely related language or dialect from the same geographical region. If you do this, you MUST specify the language you are using. For example, "Not available in Gondi, but in related Halbi it is...".
4.  If, after all efforts, you cannot find any suitable translation in the target language or a closely related one, you MUST respond with "Not Available" for the 'translatedName' field and an empty string for the 'pronunciation' field.
5.  DO NOT return the original plant name as the translation unless it is genuinely the same word used in that language. If they are the same, your pronunciation guide should reflect the local accent.
6.  The pronunciation guide must be simple, phonetic, and easy for an English speaker to understand.

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
