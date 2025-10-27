'use server';
/**
 * @fileOverview A plant identification AI flow.
 *
 * - identifyPlant - A function that handles the plant identification process.
 * - IdentifyPlantInput - The input type for the identifyPlant function.
 * - IdentifyPlantOutput - The return type for the identifyPlant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPlantInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyPlantInput = z.infer<typeof IdentifyPlantInputSchema>;

const IdentifyPlantOutputSchema = z.object({
  isPlant: z.boolean().describe('Whether or not the input image is a plant.'),
  commonName: z.string().describe('The common English name of the identified plant.'),
  scientificName: z.string().describe('The scientific (Latin) name of the identified plant.'),
  family: z.string().describe('The plant family.'),
  otherNames: z.array(z.string()).describe('Other common names for the plant, including in Hindi if applicable.'),
  description: z.string().describe('A brief description of the plant, including its appearance and habitat.'),
  isMedicinal: z.boolean().describe('Whether the plant has known medicinal uses in traditional Indian (Ayurvedic, Siddha, Unani, etc.) or other systems.'),
  isPoisonous: z.boolean().describe('Whether any part of the plant is known to be poisonous or toxic.'),
  medicinalUses: z.string().describe('A paragraph detailing the traditional medicinal uses of the plant, focusing on Indian knowledge systems. If not medicinal, state that.'),
  warnings: z.string().describe('Important warnings, precautions, or contraindications for using this plant. If none, state that clearly.'),
});
export type IdentifyPlantOutput = z.infer<typeof IdentifyPlantOutputSchema>;

export async function identifyPlant(input: IdentifyPlantInput): Promise<IdentifyPlantOutput> {
  return identifyPlantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyPlantPrompt',
  input: {schema: IdentifyPlantInputSchema},
  output: {schema: IdentifyPlantOutputSchema},
  prompt: `You are an expert botanist specializing in identifying plants, with a deep focus on the flora of India and its use in traditional medicine (Ayurveda, Siddha, Unani, and folk traditions).

Analyze the provided image.

1.  First, determine if the image contains a plant. If not, set 'isPlant' to false and provide default values for other fields.
2.  If it is a plant, identify it. Provide its common English name, scientific name, and family.
3.  List any other common names, especially its name in Hindi if widely known.
4.  Write a brief description of the plant's key characteristics.
5.  State whether it has medicinal properties ('isMedicinal') based on traditional Indian knowledge.
6.  Describe its medicinal uses in a detailed paragraph. If it has no significant medicinal use in these traditions, clearly state that.
7.  State whether it is known to be poisonous or has toxic parts.
8.  Detail any important warnings or precautions associated with its use. If there are no known warnings, state "None. However, always consult an expert before use."

Your response must be grounded in the context of Indian traditional knowledge.

Image: {{media url=photoDataUri}}`,
});

const identifyPlantFlow = ai.defineFlow(
  {
    name: 'identifyPlantFlow',
    inputSchema: IdentifyPlantInputSchema,
    outputSchema: IdentifyPlantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
