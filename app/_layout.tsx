import React, { useEffect, useState } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Text } from 'components/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StyleSheet, useColorScheme, TouchableOpacity, LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Constants from 'expo-constants';
import { persistor, store } from 'context';
import tw from 'tailwind';

LogBox.ignoreAllLogs();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line global-require
    // Inter: require('../assets/fonts/Inter-Regular.ttf'),
    // InterLight: require('../assets/fonts/Inter-Light.ttf'),
    // InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    // InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    // InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    // InterExtraBold: require('../assets/fonts/Inter-ExtraBold.ttf'),
    ...FontAwesome.font,
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: false,
            retry: true,
            // staleTime: Number.POSITIVE_INFINITY,
          },
        },
      })
  );
  return (
    <Provider store={store}>
      <PersistGate loading={undefined} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen
                name="welcome"
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                }}
              />

              <Stack.Screen
                name="(quran)/surah"
                redirect={false}
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen
                name="(saved)/saved"
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              <Stack.Screen
                name="(tabs)"
                redirect={false}
                options={{
                  headerShown: false,
                  headerTitleAlign: 'center',
                }}
              />
            </Stack>
            <Toast />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
