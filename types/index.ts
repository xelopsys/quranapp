export type SurahType = {
  number: number;
  name: string;
  en: string;
  arabic: string;
  revelationType: string;
  ayahs: number;
};

export type SavedSurahType = {
  id: string | number;
  name: string;
  surah: number | string;
  ayah: number | string;
  more?: Record<string, any>;
};
