import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  Pressable,
} from 'react-native';
import { Text, View } from 'components/themed';
import useStore from 'hooks/use-store';
import { wait } from 'helpers';
import Toast from 'react-native-toast-message';
import tw from 'tailwind';

export default function Home() {
  const [text, setText] = useState('');
  const colorScheme = useColorScheme();
  const { user, setName } = useStore();
  const router = useRouter();

  const handleText = () => {
    if (text || user.name) {
      setName(text || user.name);
      router.push('/(tabs)/');
    } else {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter your name',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  useEffect(() => {
    if (user.isFirstTime) {
      wait(500).then(() => {
        // navigate to getting started
        router.push('welcome');
      });
    }
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={[
        tw` p-6 h-full w-full flex flex-col justify-center items-center`,
        colorScheme === 'dark' ? tw`bg-background-dark` : tw`bg-background`,
      ]}
    >
      <View style={tw`min-h-20 rounded-lg w-full bg-transparent`}>
        {user?.name ? (
          <Text style={tw`text-lg my-3 font-semibold`} lightColor="#000" darkColor="#fff">
            Welcome back {user?.name || ''}
          </Text>
        ) : (
          <>
            <Text style={tw`text-lg my-3 font-semibold`} lightColor="#000" darkColor="#fff">
              Please enter your full name
            </Text>
            <TextInput
              defaultValue=""
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              placeholder="Name"
              style={[
                tw`border rounded-md w-full bg-transparent py-3 px-4`,
                colorScheme === 'dark'
                  ? tw`border-gray-200 text-white`
                  : tw`border-black text-black`,
              ]}
              onChangeText={(text) => setText(text)}
            />
          </>
        )}
        <TouchableOpacity style={tw`w-full rounded-md my-4 bg-purple-light`} onPress={handleText}>
          <Text style={tw`text-md my-3 font-semibold text-white w-full text-center`}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
