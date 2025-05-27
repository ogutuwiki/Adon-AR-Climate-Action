'use server';

/**
 * @fileOverview Dynamically generates personalized challenges for users to encourage sustainable behavior.
 *
 * - generateChallenge - A function that generates a challenge based on user data.
 * - GenerateChallengeInput - The input type for the generateChallenge function.
 * - GenerateChallengeOutput - The return type for the generateChallenge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateChallengeInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  pastActions: z.string().describe('Description of past actions taken by the user on the platform.'),
  currentCreditBalance: z.number().describe('The current carbon credit balance of the user.'),
});
export type GenerateChallengeInput = z.infer<typeof GenerateChallengeInputSchema>;

const GenerateChallengeOutputSchema = z.object({
  challenge: z.string().describe('A challenge tailored to the user to encourage sustainable behavior.'),
  rewardCredits: z.number().describe('The number of carbon credits awarded for completing the challenge.'),
});
export type GenerateChallengeOutput = z.infer<typeof GenerateChallengeOutputSchema>;

export async function generateChallenge(input: GenerateChallengeInput): Promise<GenerateChallengeOutput> {
  return generateChallengeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChallengePrompt',
  input: {schema: GenerateChallengeInputSchema},
  output: {schema: GenerateChallengeOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized challenges for users to encourage sustainable behavior on a climate action platform.  The challenge should be tailored to the user's past actions and current carbon credit balance.

  User ID: {{{userId}}}
  Past Actions: {{{pastActions}}}
  Current Credit Balance: {{{currentCreditBalance}}}

  Generate a challenge that is both achievable and impactful. Also, suggest a reasonable number of reward credits for completing the challenge.  Make the challenge sound fun and engaging, and be sure to relate it to the goal of the platform: AdonAR - a youth-focused climate action platform for tracking emissions and earning carbon credits in Africa.

  Output the challenge and the reward credits in JSON format.
`,
});

const generateChallengeFlow = ai.defineFlow(
  {
    name: 'generateChallengeFlow',
    inputSchema: GenerateChallengeInputSchema,
    outputSchema: GenerateChallengeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
