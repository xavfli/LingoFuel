"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { processFuelLog, type ProcessFuelLogResult } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  liters: z.coerce.number().positive({ message: "Liters must be a positive number." }),
  kilometers: z.coerce.number().positive({ message: "Kilometers must be a positive number." }),
  drivingStyle: z.string().min(10, { message: "Please describe your driving style in at least 10 characters." }),
  vehicleType: z.string().min(3, { message: "Please enter a valid vehicle type (at least 3 characters)." }),
});

type FuelLogFormValues = z.infer<typeof formSchema>;

interface FuelLogFormProps {
  onDataLogged: (data: NonNullable<ProcessFuelLogResult['data']>) => void;
}

export function FuelLogForm({ onDataLogged }: FuelLogFormProps) {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FuelLogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      liters: undefined,
      kilometers: undefined,
      drivingStyle: "",
      vehicleType: "",
    },
  });

  async function onSubmit(values: FuelLogFormValues) {
    setIsLoading(true);
    try {
      const result = await processFuelLog(values);
      if (result.success && result.data) {
        onDataLogged(result.data);
        toast({
          title: translate("dataLogged", "Fuel data logged successfully!"),
          description: translate("adviceGenerated", "Driving advice generated!"),
        });
        form.reset(); // Reset form after successful submission
      } else {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              form.setError(field as keyof FuelLogFormValues, { message: errors[0] });
            }
          });
        }
        toast({
          title: translate("errorOccurred", "An error occurred."),
          description: result.error || "Please check your input and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: translate("errorOccurred", "An error occurred."),
        description: "Could not process fuel log. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>{translate("enterFuelData", "Enter New Fuel Data")}</CardTitle>
        <CardDescription>{translate("fuelLogFormDescription", "Log your recent fueling to track consumption and get tips.")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="liters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("liters", "Liters")}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g. 45.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kilometers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{translate("kilometers", "Kilometers")}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="e.g. 550.7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="drivingStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("drivingStyle", "Driving Style")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={translate("drivingStylePlaceholder", "e.g. Mostly city driving, occasional highway, moderate acceleration")}
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate("vehicleType", "Vehicle Type")}</FormLabel>
                  <FormControl>
                    <Input placeholder={translate("vehicleTypePlaceholder", "e.g. Sedan Toyota Camry 2018")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {translate("calculateEfficiency", "Calculate & Get Tips")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
