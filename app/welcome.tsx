import React from 'react';
import { useRouter } from 'expo-router';
import useStore from 'hooks/use-store';
import { ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { View, Text } from 'components/themed';
import WelcomeBack from 'assets/welcome-back.svg';
import Logo from 'assets/logo/logo-black.svg';
import tw from 'tailwind';

export default function Welcome() {
  const router = useRouter();
  const { start } = useStore();
  const colorScheme = useColorScheme();

  const handleStart = () => {
    start({
      isFirstTime: false,
    });
    router.push('/');
  };

  return (
    <ScrollView
      contentContainerStyle={[
        tw`bg-transparent p-6 h-full w-full flex flex-col justify-center items-center gap-y-5`,
        colorScheme === 'dark' ? tw`bg-background-dark` : tw`bg-background`,
      ]}
    >
      <Text style={tw`text-xl font-bold`} lightColor="#672CBC" darkColor="#fff">
        Quran App
      </Text>
      {/* <Image source={{ uri: image }} /> */}
      <Text style={tw`text-sm`} lightColor="#8789A3" darkColor="#A19CC5">
        Learn Quran and Recite once everyday
      </Text>
      <View
        style={tw`min-h-100 rounded-3xl w-full bg-transparent relative  flex flex-row justify-center items-center`}
      >
        <WelcomeBack />
        <TouchableOpacity
          style={tw`py-3 w-1/3 flex flex-row justify-center items-center rounded-3xl bg-orange absolute -bottom-3 mx-auto left-1/3`}
          onPress={handleStart}
        >
          <Text style={tw`text-white`}>Pressable</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
