import React from 'react';
import { useColorScheme } from 'react-native';
import { Tabs, usePathname } from 'expo-router';
import Quran from 'assets/quran.svg';
import Prayers from 'assets/prayer.svg';
import Ideas from 'assets/idea.svg';
import Duas from 'assets/dua.svg';
import Bookmarks from 'assets/bookmark.svg';
import { View } from 'components/themed';
import tw from 'tailwind';

export default function TabsScreen() {
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const tabs = [
    {
      name: 'index',
      key: 'Quran',
      path: '/',
      Icon: Quran,
    },
    {
      name: 'ideas',
      key: 'Ideas',
      Icon: Ideas,
      path: '/ideas',
    },
    {
      name: 'prayers',
      key: 'Prayers',
      Icon: Prayers,
      path: '/prayers',
    },
    {
      name: 'duas',
      key: 'Duas',
      Icon: Duas,
      path: '/duas',
    },
    {
      name: 'bookmarks',
      key: 'Bookmarks',
      Icon: Bookmarks,
      path: '/bookmarks',
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: colorScheme === 'dark' ? '#121931' : '#fff',
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.key}
          redirect={false}
          // Name of the route to hide.
          name={tab.name}
          options={{
            headerShown: false,
            href: tab.path,
            tabBarIconStyle: {
              width: 30,
            },
            tabBarIcon: () => {
              return (
                <View
                  style={[
                    tw`w-full h-full flex flex-row justify-center items-center bg-transparent mt-4`,
                  ]}
                >
                  <tab.Icon
                    stroke={pathname === tab.path ? '#A44AFF' : '#A19CC5'}
                    width={30}
                    height={30}
                    fill={pathname === tab.path ? '#A44AFF' : '#A19CC5'}
                  />
                </View>
              );
            },
            tabBarShowLabel: false,
          }}
        />
      ))}
    </Tabs>
  );
}
