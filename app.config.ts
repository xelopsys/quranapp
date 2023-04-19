import { ConfigContext, ExpoConfig } from 'expo/config';

const Config = {
  sura: 'https://quranenc.com/api/v1/translation/sura/english_rwwad',
  aya: 'https://quranenc.com/api/v1/translation/aya/english_rwwad',
  audioayah: 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com',
};
if (process.env.NODE_ENV === 'main') {
  Config.sura = 'https://quranenc.com/api/v1/translation/sura/english_rwwad';
  Config.aya = 'https://quranenc.com/api/v1/translation/aya/english_rwwad';
  Config.audioayah = 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com';
} else if (process.env.NODE_ENV === 'staging') {
  Config.sura = 'https://quranenc.com/api/v1/translation/sura/english_rwwad';
  Config.aya = 'https://quranenc.com/api/v1/translation/aya/english_rwwad';
  Config.audioayah = 'https://everyayah.com/data/AbdulSamad_64kbps_QuranExplorer.Com';
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const { extra } = config;
  return {
    ...config,
    extra: {
      ...extra,
      ...Config,
    },
  } as ExpoConfig;
};
