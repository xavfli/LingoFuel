"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DrivingTipsOutput } from "@/ai/flows/generate-driving-tips";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lightbulb, AlertTriangle } from "lucide-react";

interface DrivingTipsCardProps {
  tipsData: DrivingTipsOutput | null;
}

export function DrivingTipsCard({ tipsData }: DrivingTipsCardProps) {
  const { translate } = useLanguage();

  if (!tipsData || !tipsData.shouldShowTips || tipsData.tips.length === 0) {
    return (
       <Card className="shadow-lg">
        <CardHeader  className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {translate("drivingTips", "Driving Tips")}
          </CardTitle>
          <Lightbulb className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
                {translate("noTips", "No specific tips to show right now.")}
            </p>
            <p className="text-sm text-muted-foreground">
              {translate("keepLogging", "Keep logging your fuel for personalized advice.")}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-accent" />
          <CardTitle>{translate("drivingTips", "Driving Tips")}</CardTitle>
        </div>
        <CardDescription>{translate("aiTipsDescription", "AI-powered suggestions to improve your fuel efficiency.")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          <ul className="space-y-3">
            {tipsData.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="mr-2 mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary"></span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
