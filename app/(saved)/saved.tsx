import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'components/themed';
import useStore from 'hooks/use-store';
import { AudioInstance } from 'helpers';
import Bookmark from 'assets/bookmark.svg';
import tw from 'tailwind';
import { SavedSurahType } from 'types';
import { audioayah } from 'constants/settings';

export default function Saved() {
  const colorScheme = useColorScheme();
  const { user, remove } = useStore();
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const surahs = user?.savedSurahs || [];
  const router = useRouter();

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
        tw`h-full w-full px-6 py-10`,
        colorScheme === 'dark' ? tw`bg-background-dark` : tw`bg-background`,
      ]}
      lightColor="#fff"
      darkColor="#040C23"
    >
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
          Bookmarks
        </Text>
        <Feather name="search" size={24} color={colorScheme === 'dark' ? '#A19CC5' : '#000'} />
      </View>
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`bg-transparent flex flex-col justify-start items-start my-5`}
      >
        {surahs.map((ayah: SavedSurahType, index: number) => {
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
                <Text style={tw`text-md font-semibold text-secondary`}>
                  {ayah?.name} - {ayah?.more?.aya}
                </Text>
                <View style={tw`bg-transparent flex flex-row justify-center items-center gap-x-5`}>
                  <View style={tw`bg-transparent`}>
                    {isLoading && isPlaying === ayah.ayah ? (
                      <ActivityIndicator size="small" color="#863ED5" />
                    ) : (
                      <>
                        {time > 0 && isPlaying === ayah.ayah ? (
                          <Feather name="pause" size={30} color="#863ED5" onPress={handlePause} />
                        ) : (
                          <Feather
                            name="play"
                            size={30}
                            color="#863ED5"
                            onPress={() => {
                              setIsPlaying(ayah.ayah as number);
                              playSound({
                                surah: ayah.surah,
                                aya: ayah.ayah,
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
                      remove({
                        id: ayah.id,
                      });
                    }}
                  />
                </View>
              </View>
              <View
                style={tw`bg-transparent w-full px-4 py-3 my-5 flex flex-col justify-center items-start gap-y-4`}
              >
                <Text
                  style={tw`text-md font-semibold w-full text-right`}
                  lightColor="#240F4F"
                  darkColor="#fff"
                >
                  {ayah?.more?.arabicText}
                </Text>
                <Text style={tw`text-sm font-semibold`} lightColor="#240F4F" darkColor="#A19CC5">
                  {ayah?.more?.translation}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
