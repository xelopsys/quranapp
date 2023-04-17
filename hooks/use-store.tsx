import {
  gettingStarted,
  clear,
  user,
  AppStateType,
  changeLocale,
  setName,
  setLastRead,
  addToBookmark,
  removeFromBookmark,
} from 'context/slice/app-slice';
import { useAppDispatch, useAppSelector } from 'context';
import { SavedSurahType } from 'types';

function useStore() {
  const userData = useAppSelector(user);
  const dispatch = useAppDispatch();

  const getStarted = ({ isFirstTime }: Pick<AppStateType, 'isFirstTime'>) => {
    dispatch(gettingStarted({ isFirstTime }));
  };

  const setNameUser = (name: string) => {
    dispatch(setName({ name }));
  };
  const setLastReadSurah = (lastRead: number) => {
    dispatch(setLastRead({ lastRead: lastRead }));
  };

  const save = (surah: SavedSurahType) => {
    dispatch(addToBookmark(surah));
  };
  const remove = (surah: Record<'id', string | number>) => {
    dispatch(removeFromBookmark(surah));
  };

  const clearApp = () => {
    dispatch(clear());
  };
  const changeLang = (locale: string) => {
    dispatch(changeLocale(locale));
  };

  return {
    save,
    remove,
    start: getStarted,
    clear: clearApp,
    user: userData,
    changeLocale: changeLang,
    setName: setNameUser,
    setLast: setLastReadSurah,
  };
}

export default useStore;
