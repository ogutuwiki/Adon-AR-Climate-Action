'use server';
/**
 * @fileOverview A Genkit flow that provides personalized tips to users based on their tracked emissions data.
 *
 * - getPersonalizedTips - A function that returns personalized tips based on user emissions data.
 * - PersonalizedTipsInput - The input type for the getPersonalizedTips function.
 * - PersonalizedTipsOutput - The return type for the getPersonalizedTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTipsInputSchema = z.object({
  cookingFuelEmissions: z.number().describe('The user\'s cooking fuel emissions in kgCO2e.'),
  foodConsumptionEmissions: z.number().describe('The user\'s food consumption emissions in kgCO2e.'),
  wasteEmissions: z.number().describe('The user\'s waste emissions in kgCO2e.'),
  clothingEmissions: z.number().describe('The user\'s clothing emissions in kgCO2e.'),
  dailyNecessitiesEmissions: z.number().describe('The user\'s daily necessities emissions in kgCO2e.'),
});
export type PersonalizedTipsInput = z.infer<typeof PersonalizedTipsInputSchema>;

const PersonalizedTipsOutputSchema = z.object({
  tips: z.array(
    z.string().describe('A personalized tip for reducing emissions in a specific category.')
  ).describe('A list of personalized tips for the user to reduce their environmental impact.'),
});
export type PersonalizedTipsOutput = z.infer<typeof PersonalizedTipsOutputSchema>;

export async function getPersonalizedTips(input: PersonalizedTipsInput): Promise<PersonalizedTipsOutput> {
  return personalizedTipsFlow(input);
}

const personalizedTipsPrompt = ai.definePrompt({
  name: 'personalizedTipsPrompt',
  input: {schema: PersonalizedTipsInputSchema},
  output: {schema: PersonalizedTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized tips to users on how to reduce their environmental impact based on their tracked emissions data.

  Analyze the user's emissions data across various categories and provide specific, actionable tips to help them reduce their carbon footprint in each area.

  Here is the user's emissions data:
  Cooking Fuel Emissions: {{cookingFuelEmissions}} kgCO2e
  Food Consumption Emissions: {{foodConsumptionEmissions}} kgCO2e
  Waste Emissions: {{wasteEmissions}} kgCO2e
  Clothing Emissions: {{clothingEmissions}} kgCO2e
  Daily Necessities Emissions: {{dailyNecessitiesEmissions}} kgCO2e

  Provide at least one tip for each category, focusing on the areas where the user has the highest emissions. The tips should be clear, concise, and easy to implement in their daily life. Format it as a list of tips.

  Ensure that the tips are tailored to the specific emissions data provided and offer practical solutions for reducing emissions in each category.
  `,
});

const personalizedTipsFlow = ai.defineFlow(
  {
    name: 'personalizedTipsFlow',
    inputSchema: PersonalizedTipsInputSchema,
    outputSchema: PersonalizedTipsOutputSchema,
  },
  async input => {
    const {output} = await personalizedTipsPrompt(input);
    return output!;
  }
);
