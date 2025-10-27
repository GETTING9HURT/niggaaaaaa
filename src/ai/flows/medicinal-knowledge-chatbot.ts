
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
3.  For all other questions, your primary purpose is to answer questions about medicinal plants with a deep focus on the traditional knowledge of India (Bharat). Your responses should be grounded in Ayurvedic, Siddha, Unani, and other traditional Indian medicinal systems, including tribal and folk wisdom. Prioritize information and context relevant to Indian culture and geography.

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
