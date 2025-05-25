'use server';
/**
 * @fileOverview A flow to generate personalized driving tips based on fuel consumption data.
 *
 * - generateDrivingTips - A function that generates driving tips.
 * - DrivingTipsInput - The input type for the generateDrivingTips function.
 * - DrivingTipsOutput - The return type for the generateDrivingTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DrivingTipsInputSchema = z.object({
  fuelConsumption: z
    .number()
    .describe('The user fuel consumption in liters per 100km.'),
  drivingStyle: z
    .string()
    .describe(
      'Description of the users driving style, i.e. average speed, usual routes (city, highway), acceleration habits.'
    ),
  vehicleType: z.string().describe('The type of vehicle being driven.'),
});
export type DrivingTipsInput = z.infer<typeof DrivingTipsInputSchema>;

const DrivingTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('An array of personalized driving tips.'),
  shouldShowTips: z
    .boolean()
    .describe(
      'A flag that suggests whether the tips should be displayed to the user.'
    ),
});
export type DrivingTipsOutput = z.infer<typeof DrivingTipsOutputSchema>;

export async function generateDrivingTips(input: DrivingTipsInput): Promise<DrivingTipsOutput> {
  return generateDrivingTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDrivingTipsPrompt',
  input: {schema: DrivingTipsInputSchema},
  output: {schema: DrivingTipsOutputSchema},
  prompt: `You are an expert in efficient driving techniques. Based on the user's fuel consumption data, driving style and vehicle type, you will generate personalized driving tips to help them improve their fuel efficiency.

  Fuel Consumption: {{{fuelConsumption}}} liters per 100km
  Driving Style: {{{drivingStyle}}}
  Vehicle Type: {{{vehicleType}}}

  Analyze the provided data and generate a list of driving tips tailored to the user's situation. Also determine if the tips should be displayed to the user depending on how high is their fuel consumption.

  If fuel consumption is high, the tips should be displayed immediately.
`,
});

const generateDrivingTipsFlow = ai.defineFlow(
  {
    name: 'generateDrivingTipsFlow',
    inputSchema: DrivingTipsInputSchema,
    outputSchema: DrivingTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
