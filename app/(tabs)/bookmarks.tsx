import React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'components/themed';
import useStore from 'hooks/use-store';
import Folder from 'assets/folder.svg';
import tw from 'tailwind';

export default function Tab1() {
  const colorScheme = useColorScheme();
  const { user } = useStore();
  const router = useRouter();

  const handleGoToSaved = React.useCallback(() => {
    router.push({
      pathname: '/(saved)/saved',
    });
  }, []);

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
          Bookmarks
        </Text>
        <Feather name="search" size={24} color={colorScheme === 'dark' ? '#A19CC5' : '#000'} />
      </View>
      <View
        style={tw`bg-transparent flex flex-col justify-center items-center w-full min-h-20 my-8`}
      >
        <Pressable
          style={tw`min-h-10 flex flex-row justify-start items-start gap-x-4 mb-5 bg-transparent w-full`}
          onPress={handleGoToSaved}
        >
          <Folder />
          <View style={tw`flex flex-col justify-start items-start bg-transparent`}>
            <Text style={tw`text-lg font-semibold`} lightColor="#000" darkColor="#fff">
              Saved Surahs
            </Text>
            <Text style={tw`text-sm text-secondary`}>{user?.savedSurahs?.length} items</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
