"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FuelConsumptionResult } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Droplets, Gauge } from "lucide-react";

interface FuelConsumptionCardProps {
  consumptionData: FuelConsumptionResult | null;
}

export function FuelConsumptionCard({ consumptionData }: FuelConsumptionCardProps) {
  const { translate } = useLanguage();

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {translate("fuelConsumption", "Fuel Consumption")}
        </CardTitle>
        <Gauge className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {consumptionData ? (
          <>
            <div className="text-4xl font-bold text-primary">
              {consumptionData.consumption.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
              <span className="text-xl text-muted-foreground"> {translate("kpl", "L/100km")}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {translate("lastLog", "Last Log")}: {new Date(consumptionData.date).toLocaleDateString()}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Droplets className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              {translate("noConsumptionData", "No consumption data yet.")}
            </p>
            <p className="text-sm text-muted-foreground">
              {translate("logFuelToSee", "Log your fuel to see your efficiency here.")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
