import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import i18n, { setLocale } from 'i18n';
import { AppState } from '../store/types';
import { SavedSurahType } from 'types';

export interface AppStateType {
  isFirstTime: boolean;
  savedSurahs: SavedSurahType[];
  dailySurahs: number[];
  lastRead: number;
  name: string;
  locale?: string;
}

const initialState: AppStateType = {
  isFirstTime: true,
  savedSurahs: [],
  dailySurahs: [],
  lastRead: 0,
  name: '',
  locale: i18n.locale,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    gettingStarted: (
      state: AppStateType,
      { payload }: PayloadAction<Pick<AppStateType, 'isFirstTime'>>
    ) => {
      const { isFirstTime } = payload;
      state.isFirstTime = isFirstTime;
    },
    setName: (state: AppStateType, { payload }: PayloadAction<Pick<AppStateType, 'name'>>) => {
      const { name } = payload;
      state.name = name;
    },
    setLastRead: (
      state: AppStateType,
      { payload }: PayloadAction<Pick<AppStateType, 'lastRead'>>
    ) => {
      const { lastRead } = payload;
      state.lastRead = lastRead;
    },
    clear: () => {
      return initialState;
    },
    addToBookmark: (state: AppStateType, { payload }: PayloadAction<SavedSurahType>) => {
      state.savedSurahs = [...state?.savedSurahs, payload];
    },
    removeFromBookmark: (state: AppStateType, { payload }: PayloadAction<Record<'id', any>>) => {
      state.savedSurahs = state?.savedSurahs?.filter((item) => item.id !== payload.id);
    },
    changeLocale: (state: AppStateType, { payload }: PayloadAction<string>) => {
      state.locale = payload;
      setLocale(payload);
    },
  },
});

export const {
  gettingStarted,
  clear,
  changeLocale,
  setName,
  setLastRead,
  addToBookmark,
  removeFromBookmark,
} = appSlice.actions;

export const user = (state: AppState) => state.app;

export default appSlice.reducer;
