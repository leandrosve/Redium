const COLORS = [
  "bg-gray-600/25",
  "bg-red-600/25",
  "bg-orange-600/25",
  "bg-amber-600/25",
  "bg-lime-600/25",
  "bg-teal-600/25",
  "bg-cyan-600/25",
  "bg-blue-600/25",
  "bg-purple-600/25",
];

const DATE_UNITS = {
  year: 31_536_000,
  month: 2_592_000,
  week: 604_800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

export const generateColorForNickname = (nickname: string) => {
  let hash = 0;
  if (!nickname) return COLORS[0];
  for (var i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + hash;
  }
  const position = hash % COLORS.length;
  return COLORS[position];
};

export const getInitialsForName = (name: string) => {
  return name
    .trim()
    .split(/\s+/) // separa por espacios (uno o más)
    .slice(0, 2) // toma máximo 2 palabras
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
};

export const formatTimeAgo = (lang: string, date: Date) => {
  if (!["en", "es"].includes(lang)) lang = "en";
  const secondsDiff = (Date.now() - date.getTime()) / 1000;
  let value: number = 0;
  let timeUnit: Intl.RelativeTimeFormatUnit = "day";
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsDiff >= secondsInUnit || unit === "second") {
      value = Math.floor(secondsDiff / secondsInUnit) * -1;
      timeUnit = unit as Intl.RelativeTimeFormatUnit;
      break;
    }
  }

  const formatter = new Intl.RelativeTimeFormat([lang], {
    numeric: "always",
    style: "long",
    localeMatcher: "lookup",
  });
  return formatter.format(value, timeUnit);
};

export const formatTime = (lang: string, date: Date) => {
  if (!["en", "es"].includes(lang)) lang = "en";
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
