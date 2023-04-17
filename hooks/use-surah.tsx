import { useQuery } from 'react-query';
import axios from 'utils/surahInstance';

export default function useSurah({ surahId }: { surahId: string }) {
  return useQuery(
    ['surahs', surahId],
    () => {
      return axios.get(`/${surahId}`);
    },
    {
      enabled: !!surahId,
    }
  );
}
