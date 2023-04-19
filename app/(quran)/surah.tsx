import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ActivityIndicator, useColorScheme, ScrollView, Button, Alert } from 'react-native';
import { usePathname, useSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { surahs } from 'quran';
import { wait, AudioInstance } from 'helpers';
import { Audio, AVPlaybackStatus } from 'expo-av';
import useStore from 'hooks/use-store';
import useSurah from 'hooks/use-surah';
import QuranBook from 'assets/quran-article.svg';
import Bookmark from 'assets/bookmark.svg';
import tw from 'tailwind';
import { View, Text } from 'components/themed';
import { SurahType, SavedSurahType } from 'types';
import { audioayah } from 'constants/settings';

export default function SurahId() {
  const colorScheme = useColorScheme();
  const params = useSearchParams();
  const { user, save } = useStore();
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const surah = useSurah({ surahId: (params?.surah as string) || '' });
  const surahName = surahs.find((sura) => {
    return sura.number === Number(surah?.data?.data?.result?.[0]?.sura);
  });
  const sound = new AudioInstance();

  const playSound = useCallback(async (surah: Record<'surah' | 'aya', any>) => {
    const surahNum =
      Number(surah.surah) > 9
        ? `0${surah.surah}`
        : Number(surah.surah) > 99
        ? surah.surah
        : `00${surah.surah}`;
    const ayaNum =
      Number(surah.aya) > 9
        ? `0${surah.aya}`
        : Number(surah.aya) > 99
        ? surah.aya
        : `00${surah.aya}`;

    try {
      setIsLoading(true);
      await sound.loadAsync(`${audioayah}/${surahNum}${ayaNum}.mp3`).then(() => {
        setIsLoading(false);
      });
      sound.getUnloadedStatus().then((status: any) => {
        setTime(status?.durationMillis ? Math.floor(status?.durationMillis / 1000) : 0);
      });
      await sound.playAsync();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  }, []);

  const handlePause = useCallback(async () => {
    await sound.stopAsync();
    await sound.unloadAsync();
    setTime(0);
  }, []);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        if (time > 0) {
          return time - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <View
      style={[
        tw`h-full px-6 py-10`,
        colorScheme === 'dark' ? tw`bg-background-dark` : tw`bg-background`,
      ]}
    >
      {surah?.isFetching ? (
        <ActivityIndicator size="small" color={colorScheme === 'dark' ? '#fff' : '#000'} />
      ) : (
        <>
          <View
            style={tw`min-h-10 rounded-lg w-full bg-transparent flex flex-row justify-start items-center gap-x-6`}
          >
            <Feather
              name="arrow-left"
              size={24}
              color={colorScheme === 'dark' ? '#A19CC5' : '#000'}
              onPress={() => router.back()}
            />
            <Text style={tw`text-lg font-semibold w-2/3`} lightColor="#000" darkColor="#fff">
              {
                surahs.find((sura) => {
                  return sura.number === Number(surah?.data?.data?.result?.[0]?.sura);
                })?.name
              }
            </Text>
            <Feather name="search" size={24} color={colorScheme === 'dark' ? '#A19CC5' : '#000'} />
          </View>
          <ScrollView
            alwaysBounceHorizontal={false}
            alwaysBounceVertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-transparent flex flex-col justify-start items-start`}
          >
            <View
              style={tw`bg-transparent min-h-65 w-full rounded-xl flex flex-col justify-center items-center relative overflow-hidden z-20 mt-6 mb-10`}
            >
              <LinearGradient
                colors={['#F598FA', '#9055FF']}
                style={tw`w-full h-full absolute opacity-70 z-10`}
              />
              <View
                style={[
                  tw`w-full h-full z-30 bg-transparent absolute flex flex-col justify-center items-center gap-y-3`,
                ]}
              >
                <Text style={tw`text-xl font-semibold text-white`}>{surahName?.name}</Text>
                <Text style={tw`text-lg font-semibold text-white`}>{surahName?.en}</Text>
                <View style={tw`w-2/3 border border-white opacity-50 my-2`} />
                <Text style={tw`text-sm font-semibold uppercase text-white`}>
                  {surahName?.revelationType} - {surahName?.ayahs} verses
                </Text>
                <Text style={tw`text-3xl font-normal uppercase text-white`}>
                  {surahName?.arabic}
                </Text>
              </View>
              <QuranBook
                style={tw`absolute -bottom-19 -right-6 -z-10 w-50 h-50 opacity-60`}
                width={250}
                height={250}
              />
            </View>

            {surah?.data?.data?.result?.map((ayah: Record<string, any>, index: number) => {
              return (
                <View
                  key={index}
                  style={tw`bg-transparent border-b border-secondary w-full min-h-40 mb-8`}
                >
                  <View
                    style={[
                      tw`w-full px-4 py-3 rounded-xl flex flex-row justify-between items-center`,
                      colorScheme === 'dark' ? tw`bg-[#121931]` : tw`bg-gray-100`,
                    ]}
                  >
                    <View
                      style={tw`w-9 h-9 flex flex-col justify-center items-center text-center rounded-full bg-purple-light`}
                    >
                      <Text style={tw`text-md font-semibold text-white`}>{index + 1}</Text>
                    </View>
                    <View
                      style={tw`bg-transparent flex flex-row justify-center items-center gap-x-5`}
                    >
                      <View style={tw`bg-transparent`}>
                        {isLoading && isPlaying === ayah.aya ? (
                          <ActivityIndicator size="small" color="#863ED5" />
                        ) : (
                          <>
                            {time > 0 && isPlaying === ayah.aya ? (
                              <Feather
                                name="pause"
                                size={30}
                                color="#863ED5"
                                onPress={handlePause}
                              />
                            ) : (
                              <Feather
                                name="play"
                                size={30}
                                color="#863ED5"
                                onPress={() => {
                                  setIsPlaying(ayah.aya);
                                  playSound({
                                    surah: ayah.sura,
                                    aya: ayah.aya,
                                  });
                                }}
                              />
                            )}
                          </>
                        )}
                      </View>
                      <Bookmark
                        color="#863ED5"
                        stroke="#863ED5"
                        fill={user?.savedSurahs?.find((b) => b.id === ayah.id) ? '#863ED5' : 'none'}
                        strokeWidth={3}
                        onPress={() => {
                          if (user?.savedSurahs?.find((b) => b.id === ayah.id)) return null;
                          save({
                            id: ayah.id,
                            name: surahName?.name || '',
                            surah: ayah.sura,
                            ayah: ayah.aya,
                            more: ayah,
                          });
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={tw`bg-transparent w-full px-4 py-3 my-5 flex flex-col justify-center items-start gap-y-4`}
                  >
                    <Text
                      style={[
                        tw`text-md font-semibold w-full `,
                        Number(ayah.aya) === 1 && Number(ayah.sura) === 1
                          ? tw`text-center`
                          : tw`text-right`,
                      ]}
                      lightColor="#240F4F"
                      darkColor="#fff"
                    >
                      {ayah.arabicText}
                    </Text>
                    <Text
                      style={tw`text-sm font-semibold`}
                      lightColor="#240F4F"
                      darkColor="#A19CC5"
                    >
                      {ayah.translation}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
}
