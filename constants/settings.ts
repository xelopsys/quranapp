/* eslint-disable import/prefer-default-export */
import Constants from 'expo-constants';

const { extra: env } = Constants.expoConfig || {};

export const surahUrl = env?.sura || '';
export const ayatUrl = env?.aya || '';
