import type { Language } from "@/contexts/language-context"

// Date formatting based on language
export function formatDate(date: Date, language: Language): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const locales: Record<Language, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  }

  return new Intl.DateTimeFormat(locales[language], options).format(date)
}

// Currency formatting based on language
export function formatCurrency(amount: number, language: Language): string {
  const currencies: Record<Language, string> = {
    en: "USD",
    es: "EUR",
    fr: "EUR",
  }

  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: currencies[language],
  }).format(amount)
}

// Time formatting based on language
export function formatTime(date: Date, language: Language): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  }

  const locales: Record<Language, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  }

  return new Intl.DateTimeFormat(locales[language], options).format(date)
}
