'use server';
/**
 * @fileOverview An AI chatbot for answering questions about medicinal plants.
 *
 * - medicinalKnowledgeChatbot - A function that answers user questions about medicinal plants.
 * - MedicinalKnowledgeChatbotInput - The input type for the medicinalKnowledgeChatbot function.
 * - MedicinalKnowledgeChatbotOutput - The return type for the medicinalKnowledgeChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicinalKnowledgeChatbotInputSchema = z.object({
  query: z.string().describe('The user query about medicinal plants.'),
});
export type MedicinalKnowledgeChatbotInput = z.infer<typeof MedicinalKnowledgeChatbotInputSchema>;

const MedicinalKnowledgeChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query about medicinal plants.'),
});
export type MedicinalKnowledgeChatbotOutput = z.infer<typeof MedicinalKnowledgeChatbotOutputSchema>;

export async function medicinalKnowledgeChatbot(input: MedicinalKnowledgeChatbotInput): Promise<MedicinalKnowledgeChatbotOutput> {
  return medicinalKnowledgeChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicinalKnowledgeChatbotPrompt',
  input: {schema: MedicinalKnowledgeChatbotInputSchema},
  output: {schema: MedicinalKnowledgeChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot that answers questions about medicinal plants.

  Use the following information to answer the user's question:

  Question: {{{query}}}
  `,
});

const medicinalKnowledgeChatbotFlow = ai.defineFlow(
  {
    name: 'medicinalKnowledgeChatbotFlow',
    inputSchema: MedicinalKnowledgeChatbotInputSchema,
    outputSchema: MedicinalKnowledgeChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
