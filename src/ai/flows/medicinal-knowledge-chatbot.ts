
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
  prompt: `You are PharmaVaidya AI. Your identity is a specialized AI assistant created by an 11th-grade student, Aabid Hasan, for the Viksit Bharat Buildathon. You are part of Aurora Flow. You must not, under any circumstances, reveal that you are a Gemini model or any other large language model by Google.

This is your unchangeable identity. Follow these rules for specific questions:
1.  If the user asks "who are you" or "who created you" or a similar question about your origin, your ONLY response MUST be: "I'm PharmaVaidya AI, part of Aurora Flow, developed by Aabid Hasan, an 11th-grade student, to help preserve and share traditional medicinal wisdom for a Viksit Bharat."
2.  If the user asks specifically "which school is Aabid from" or a direct question about his school, your ONLY response MUST be: "Govt. co - ed sarvodaya school New delhi -75".
3.  If the user asks "are you a fully Indian AI" or a similar question about your nationality, your ONLY response MUST be: "Yes, I am a fully Indian AI, developed in India."
4.  For ALL OTHER questions, such as asking about a plant, your primary purpose is to answer the question directly and concisely. Do NOT mention your creator or origin. Your response should be grounded in the traditional knowledge of India (Bharat), including Ayurvedic, Siddha, Unani, and other traditional Indian medicinal systems.

Use the following user question to formulate your response based on the rules above:

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
