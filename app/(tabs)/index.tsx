import React, { useEffect, useState } from 'react';
import { useColorScheme, ScrollView, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'components/themed';
import { setLastRead } from 'context/slice/app-slice';
import { SurahType } from 'types';
import { surahs } from 'quran';
import { wait } from 'helpers';
import useStore from 'hooks/use-store';
import QuranBook from 'assets/quran-article.svg';
import Book from 'assets/book.svg';
import tw from 'tailwind';
import BulletPoint from 'assets/bullet-point.svg';

export default function Tab1() {
  const { user, setLast } = useStore();
  const [surahNumber, setSurahNumber] = useState<number>();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleRoute = React.useCallback(async (surah: SurahType) => {
    if (!surah) return;
    if (surah.number) {
      await setLast(surah.number);
      router.push({
        pathname: '/(quran)/surah',
        params: {
          surah: surah.number,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (!user.name) {
      wait(500).then(() => {
        // navigate to getting started
        router.push('/');
      });
    }
  }, [user?.name]);

  return (
    <View
      style={tw`h-full w-full flex flex-col justify-start items-center px-6 pt-10 pb-6`}
      lightColor="#fff"
      darkColor="#040C23"
    >
      <View
        style={tw`min-h-10 rounded-lg w-full bg-transparent flex flex-row justify-start items-center gap-x-6`}
      >
        <Feather name="menu" size={24} color={colorScheme === 'dark' ? '#A19CC5' : '#000'} />
        <Text style={tw`text-lg font-semibold w-2/3`} lightColor="#000" darkColor="#fff">
          Quran App
        </Text>
        <Feather name="search" size={24} color={colorScheme === 'dark' ? '#A19CC5' : '#000'} />
      </View>
      <View
        style={tw`min-h-25 flex flex-col justify-center items-start rounded-lg w-full bg-transparent gap-y-2`}
      >
        <Text style={tw`text-md text-secondary`}>Assalam alaikum</Text>
        <Text style={tw`text-lg font-semibold`} lightColor="#000" darkColor="#fff">
          {user?.name || ''}
        </Text>
      </View>
      {user?.lastRead ? (
        <View
          style={[
            tw`w-full min-h-32 relative z-30 overflow-hidden bg-purple-extralight rounded-xl flex flex-col justify-start items-start gap-x-4 p-6 mb-5`,
          ]}
        >
          <LinearGradient
            // Background Linear Gradient
            colors={['#F598FA', '#9055FF']}
            start={[0.3, 0]}
            end={[0.6, 1]}
            locations={[0, 1]}
            style={tw`absolute inset-0 z-0`}
          />
          <View style={tw`bg-transparent flex flex-row justify-center items-center gap-x-2`}>
            <Book />
            <Text style={tw`text-white text-sm`}>Last Read</Text>
          </View>
          <View style={tw`bg-transparent flex flex-col justify-center items-center gap-x-2 my-4`}>
            <Text style={tw`text-white text-lg font-semibold`}>
              {surahs.find((surah) => {
                return surah.number === user?.lastRead;
              })?.name || ''}
            </Text>
          </View>
          <QuranBook style={tw` absolute -right-10 -z-10 -bottom-4`} />
        </View>
      ) : null}
      <ScrollView
        horizontal={false}
        scrollsToTop
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        style={tw` w-full bg-transparent`}
        contentContainerStyle={tw`flex flex-col justify-center items-start bg-transparent`}
      >
        {surahs.map((surah: SurahType) => {
          return (
            <TouchableOpacity
              key={surah.number}
              style={tw`min-h-20 rounded-lg  bg-transparent flex flex-row justify-start items-center flex-1 w-full border-b border-secondary gap-x-4`}
              onPress={() => {
                setSurahNumber(surah.number);
                handleRoute(surah);
              }}
            >
              <View
                style={tw`bg-transparent relative w-10 h-10 flex flex-row justify-center items-center`}
              >
                <Text style={tw`font-semibold`} lightColor="#000" darkColor="#fff">
                  {surah.number}
                </Text>
                <BulletPoint style={tw`absolute`} />
              </View>
              <View style={tw`bg-transparent flex flex-col justify-start items-start gap-y-1`}>
                <Text style={tw`text-md font-semibold`} lightColor="#000" darkColor="#fff">
                  {surah.name}
                </Text>
                <Text
                  style={tw`text-sm font-semibold flex flex-row justify-center items-center text-secondary`}
                  lightColor="#000"
                  darkColor="#fff"
                >
                  {surah.revelationType}
                  {' - '}
                  {surah.ayahs}
                  {' verses'}
                </Text>
              </View>
              <View style={tw`bg-transparent ml-auto`}>
                <Text
                  style={tw`text-md font-semibold flex flex-row justify-center items-center text-purple-light`}
                >
                  {surah.arabic}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  bulletPoint: {
    width: 10,
    height: 10,
  },
});
