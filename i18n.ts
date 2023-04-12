import * as Localization from 'expo-localization';
import { store } from './context';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en/en';
import ru from './locales/ru/ru';

const i18n = new I18n();
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.translations = { en, ru };
i18n.withLocale = async (locale: string, callback: () => void) => {
  const currentLocale = i18n.locale;
  i18n.locale = locale;
  await callback();
  i18n.locale = currentLocale;
};

const changeLanguage = async (locale: string) => {
  const currentLang = await AsyncStorage.getItem('locale');
  if (currentLang !== locale) {
    await AsyncStorage.setItem('locale', locale);
    i18n.locale = locale;
  }
};

const translate = i18n.t.bind(i18n);

export { translate as t, changeLanguage as setLocale };
export default i18n;
