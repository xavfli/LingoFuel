
export type Language = "en" | "ru" | "uz";

export interface User {
  id: string;
  email: string;
  // Add other user-specific fields if needed
}

export interface FuelLogData {
  liters: number;
  kilometers: number;
  drivingStyle: string;
  vehicleType: string;
  date: Date;
}

export interface FuelConsumptionResult {
  consumption: number; // L/100km
  date: Date;
}

export interface DrivingTip {
  id: string;
  text: string;
}
