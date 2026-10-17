export const formatCurrency = (amount, currency = "INR") => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    amount = 0;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2, // comment it if want auto global format .00
    maximumFractionDigits: 2, // comment it if want auto global format .00
  }).format(Number(amount));
};

export const universalFormatCurrency = (amount, currency = "INR") => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    amount = 0;
  }

  const currencyFormat = localStorage.getItem("currencyFormat") || currency;

  // currency → locale mapping
  const localeMap = {
    INR: "en-IN", // Indian format
    USD: "en-US", // US format
    CAD: "en-CA", // Canadian format
    AUD: "en-AU", // Australian format
    EUR: "nl-NL", // Dutch format
    GBP: "en-GB", // British format
    JPY: "ja-JP", // Japanese format
    CNY: "zh-CN", // Chinese format
    CHF: "de-CH", // Swiss format
    SEK: "sv-SE", // Swedish format
    NZD: "en-NZ", // New Zealand format
  };

  const locale = localeMap[currencyFormat] || "en-IN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    // currency,
    currency: currencyFormat,
    // minimumFractionDigits: 2, // comment it if want auto global format .00
    // maximumFractionDigits: 2, // comment it if want auto global format .00
    minimumFractionDigits: currencyFormat === "JPY" ? 0 : 2,
    maximumFractionDigits: currencyFormat === "JPY" ? 0 : 2,
  }).format(Number(amount));
};
