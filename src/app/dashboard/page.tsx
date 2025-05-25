"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FuelLogForm } from "@/components/dashboard/FuelLogForm";
import { FuelConsumptionCard } from "@/components/dashboard/FuelConsumptionCard";
import { DrivingTipsCard } from "@/components/dashboard/DrivingTipsCard";
import type { FuelConsumptionResult } from "@/types";
import type { DrivingTipsOutput } from "@/ai/flows/generate-driving-tips";
import type { ProcessFuelLogResult } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { translate } = useLanguage();
  const router = useRouter();

  const [consumptionData, setConsumptionData] = useState<FuelConsumptionResult | null>(null);
  const [drivingTips, setDrivingTips] = useState<DrivingTipsOutput | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleDataLogged = (data: NonNullable<ProcessFuelLogResult['data']>) => {
    setConsumptionData(data.consumptionData);
    setDrivingTips(data.aiTips);
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-primary">
        {translate("dashboard", "Dashboard")}
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FuelLogForm onDataLogged={handleDataLogged} />
        </div>
        <div className="space-y-8 lg:col-span-1">
          <FuelConsumptionCard consumptionData={consumptionData} />
          <DrivingTipsCard tipsData={drivingTips} />
        </div>
      </div>
    </div>
  );
}
