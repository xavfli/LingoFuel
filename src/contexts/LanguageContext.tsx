"use client";

import type { Language } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, defaultText: string) => string; // Basic translation stub
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for demonstration. In a real app, use a library like next-intl.
const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: "LingoFuel",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
    fuelLog: "Fuel Log",
    drivingTips: "Driving Tips",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    submit: "Submit",
    liters: "Liters",
    kilometers: "Kilometers",
    drivingStyle: "Driving Style (e.g. city, highway, habits)",
    vehicleType: "Vehicle Type (e.g. Sedan Toyota Camry 2018)",
    calculateEfficiency: "Calculate & Get Tips",
    noTips: "No specific tips to show right now. Drive safely!",
    fuelConsumption: "Fuel Consumption",
    lastLog: "Last Log",
    kpl: "L/100km",
    selectLanguage: "Select Language",
    welcomeTo: "Welcome to",
    getStartedLogin: "Log in to get started",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    errorOccurred: "An error occurred. Please try again.",
    adviceGenerated: "Driving advice generated!",
    dataLogged: "Fuel data logged successfully!",
    enterFuelData: "Enter New Fuel Data"
  },
  ru: {
    appName: "ЛингоТопливо",
    login: "Войти",
    signup: "Регистрация",
    logout: "Выйти",
    dashboard: "Панель управления",
    fuelLog: "Журнал топлива",
    drivingTips: "Советы по вождению",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    submit: "Отправить",
    liters: "Литры",
    kilometers: "Километры",
    drivingStyle: "Стиль вождения (например, город, шоссе, привычки)",
    vehicleType: "Тип автомобиля (например, Седан Toyota Camry 2018)",
    calculateEfficiency: "Рассчитать и получить советы",
    noTips: "Конкретных советов пока нет. Водите безопасно!",
    fuelConsumption: "Расход топлива",
    lastLog: "Последняя запись",
    kpl: "Л/100км",
    selectLanguage: "Выберите язык",
    welcomeTo: "Добро пожаловать в",
    getStartedLogin: "Войдите, чтобы начать",
    dontHaveAccount: "Нет аккаунта?",
    alreadyHaveAccount: "Уже есть аккаунт?",
    errorOccurred: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    adviceGenerated: "Советы по вождению сгенерированы!",
    dataLogged: "Данные о топливе успешно записаны!",
    enterFuelData: "Ввести новые данные о топливе"
  },
  uz: {
    appName: "LingoYoqilg'i",
    login: "Kirish",
    signup: "Ro'yxatdan o'tish",
    logout: "Chiqish",
    dashboard: "Boshqaruv paneli",
    fuelLog: "Yoqilg'i jurnali",
    drivingTips: "Haydash bo'yicha maslahatlar",
    email: "Elektron pochta",
    password: "Parol",
    confirmPassword: "Parolni tasdiqlang",
    submit: "Yuborish",
    liters: "Litr",
    kilometers: "Kilometr",
    drivingStyle: "Haydash uslubi (masalan, shahar, magistral, odatlar)",
    vehicleType: "Avtomobil turi (masalan, Sedan Toyota Camry 2018)",
    calculateEfficiency: "Hisoblash va maslahatlar olish",
    noTips: "Hozircha aniq maslahatlar yo'q. Xavfsiz haydang!",
    fuelConsumption: "Yoqilg'i sarfi",
    lastLog: "Oxirgi yozuv",
    kpl: "L/100km",
    selectLanguage: "Tilni tanlang",
    welcomeTo: "Xush kelibsiz",
    getStartedLogin: "Boshlash uchun kiring",
    dontHaveAccount: "Hisobingiz yo'qmi?",
    alreadyHaveAccount: "Hisobingiz bormi?",
    errorOccurred: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
    adviceGenerated: "Haydash bo'yicha maslahatlar yaratildi!",
    dataLogged: "Yoqilg'i ma'lumotlari muvaffaqiyatli qayd etildi!",
    enterFuelData: "Yangi yoqilg'i ma'lumotlarini kiriting"
  },
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lingoFuelLanguage") as Language | null;
    if (storedLang && ["en", "ru", "uz"].includes(storedLang)) {
      setLanguageState(storedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lingoFuelLanguage", lang);
  };

  const translate = (key: string, defaultText: string): string => {
    return translations[language]?.[key] || defaultText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
