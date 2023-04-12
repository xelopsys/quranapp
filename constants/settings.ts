/* eslint-disable import/prefer-default-export */
import Constants from 'expo-constants';

const { extra: env } = Constants.expoConfig || {};

export const baseURL = env?.apiUrl || '';
export const clientBackend = env?.clientBackend || '';
