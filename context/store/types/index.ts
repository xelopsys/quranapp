import { RootState, store } from '../store';

export type AppState = RootState;

export type AppDispatch = typeof store.dispatch;
