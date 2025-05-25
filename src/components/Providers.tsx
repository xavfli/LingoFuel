"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

export const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </LanguageProvider>
  );
};
