"use server";

import { z } from "zod";
import { generateDrivingTips, type DrivingTipsInput, type DrivingTipsOutput } from "@/ai/flows/generate-driving-tips";
import type { FuelConsumptionResult } from "@/types";

const fuelLogSchema = z.object({
  liters: z.number().positive("Liters must be positive"),
  kilometers: z.number().positive("Kilometers must be positive"),
  drivingStyle: z.string().min(10, "Driving style description is too short"),
  vehicleType: z.string().min(3, "Vehicle type description is too short"),
});

export interface ProcessFuelLogResult {
  success: boolean;
  data?: {
    consumptionData: FuelConsumptionResult;
    aiTips: DrivingTipsOutput;
  };
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function processFuelLog(formData: {
  liters: number;
  kilometers: number;
  drivingStyle: string;
  vehicleType: string;
}): Promise<ProcessFuelLogResult> {
  const validationResult = fuelLogSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid form data.",
      fieldErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { liters, kilometers, drivingStyle, vehicleType } = validationResult.data;

  const fuelConsumption = parseFloat(((liters / kilometers) * 100).toFixed(2));

  const consumptionData: FuelConsumptionResult = {
    consumption: fuelConsumption,
    date: new Date(),
  };

  const aiInput: DrivingTipsInput = {
    fuelConsumption,
    drivingStyle,
    vehicleType,
  };

  try {
    const aiTips = await generateDrivingTips(aiInput);
    return {
      success: true,
      data: {
        consumptionData,
        aiTips,
      },
    };
  } catch (error) {
    console.error("Error generating driving tips:", error);
    return {
      success: false,
      error: "Failed to generate driving tips.",
    };
  }
}
