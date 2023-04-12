import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import i18n, { setLocale } from '../../i18n';

import { AppState } from '../store/types';

export interface AuthState {
  accessToken: string | undefined;
  phone: number | string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  step: number | undefined;
  locale?: string;
}

const initialState: AuthState = {
  accessToken: undefined,
  phone: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  step: undefined,
  locale: i18n.locale,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
      const { accessToken, phone, firstName, lastName, email, step } = payload;
      state.accessToken = accessToken;
      state.phone = phone;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.step = step;
    },
    logout: () => {
      return initialState;
    },
    changeLocale: (state: AuthState, { payload }: PayloadAction<string>) => {
      state.locale = payload;
      setLocale(payload);
    },
  },
});

export const { login, logout, changeLocale } = authSlice.actions;

export const user = (state: AppState) => state.auth;

export default authSlice.reducer;
