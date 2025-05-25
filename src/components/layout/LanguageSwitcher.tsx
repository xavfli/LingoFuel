"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, translate } = useLanguage();

  const languages: { value: Language; label: string }[] = [
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
    { value: "uz", label: "O'zbekcha" },
  ];

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger className="w-auto min-w-[120px] border-0 shadow-none focus:ring-0 focus:ring-offset-0">
        <div className="flex items-center gap-2">
          <Globe size={18} />
          <SelectValue placeholder={translate('selectLanguage','Select Language')} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
