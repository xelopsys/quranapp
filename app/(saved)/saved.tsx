import React from 'react';
import { useRouter } from 'expo-router';
import { useColorScheme, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'components/themed';
import useStore from 'hooks/use-store';
import Bookmark from 'assets/bookmark.svg';
import tw from 'tailwind';
import { SavedSurahType } from 'types';

export default function Saved() {
  const colorScheme = useColorScheme();
  const { user, remove } = useStore();
  const surahs = user?.savedSurahs || [];
  const router = useRouter();

  //   console.log(user?.savedSurahs);
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
              <View
                style={tw`bg-transparent w-full px-4 py-3 my-5 flex flex-col justify-center items-start gap-y-4`}
              >
                <Text style={tw`text-md font-semibold`} lightColor="#240F4F" darkColor="#fff">
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
