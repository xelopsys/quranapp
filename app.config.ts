import { ConfigContext, ExpoConfig } from 'expo/config';

const Config = {
  sura: 'https://quranenc.com/api/v1/translation/sura/english_rwwad',
  aya: 'https://quranenc.com/api/v1/translation/aya/english_rwwad',
};

if (process.env.NODE_ENV === 'main') {
  Config.sura = 'https://quranenc.com/api/v1/translation/sura/english_rwwad';
  Config.aya = 'https://quranenc.com/api/v1/translation/aya/english_rwwad';
} else if (process.env.NODE_ENV === 'staging') {
  Config.sura = 'https://quranenc.com/api/v1/translation/sura/english_rwwad';
  Config.aya = 'https://quranenc.com/api/v1/translation/aya/english_rwwad';
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
