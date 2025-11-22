
'use server';
/**
 * @fileOverview A plant identification AI flow.
 *
 * - identifyPlant - A function that handles the plant identification process.
 * - IdentifyPlantInput - The input type for the identifyPlant function
 * - IdentifyPlantOutput - The return type for the identifyPlant function
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
  isPlant: z.boolean().describe('Whether or not the image contains a plant.'),
  commonName: z.string().describe('The most common English name of the plant.'),
  scientificName: z.string().describe('The scientific (Latin) name of the plant.'),
  otherNames: z.array(z.string()).describe('A list of other common names, including in Hindi if known.'),
  family: z.string().describe('The plant family.'),
  description: z.string().describe('A brief description of the plant\'s appearance and characteristics.'),
  isMedicinal: z.boolean().describe('Whether the plant is known to have medicinal properties.'),
  isPoisonous: z.boolean().describe('Whether the plant is known to be poisonous.'),
  medicinalUses: z.string().describe('A summary of its primary medicinal uses. If not medicinal, state that. If poisonous, this should re-iterate the warning.'),
  warnings: z.string().describe('Critical warnings or precautions, especially if it is poisonous or has contraindications.'),
});
export type IdentifyPlantOutput = z.infer<typeof IdentifyPlantOutputSchema>;


export async function identifyPlant(input: IdentifyPlantInput): Promise<IdentifyPlantOutput> {
  return identifyPlantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyPlantPrompt',
  input: {schema: IdentifyPlantInputSchema},
  output: {schema: IdentifyPlantOutputSchema},
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert botanist specializing in Indian medicinal plants.
Analyze the provided image.

Your task is to:
1.  Determine if the image contains a plant. If not, set 'isPlant' to false and provide default values for other fields.
2.  If it is a plant, identify it and provide its common English name, scientific name, and family.
3.  List other common names, especially in Hindi.
4.  Provide a brief description of the plant.
5.  Determine if it is known to be medicinal or poisonous.
6.  Summarize its key medicinal uses.
7.  Provide any critical warnings or precautions.

You must ground your response in the context of traditional Indian medicine (Ayurveda, Siddha, Unani, folk medicine).

Photo: {{media url=photoDataUri}}`,
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
