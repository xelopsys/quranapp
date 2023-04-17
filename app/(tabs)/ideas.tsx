import React from 'react';
import { View, Text } from 'components/themed';
import tw from 'tailwind';

export default function Tab1() {
  return (
    <View style={tw`min-h-20 border rounded-lg w-full bg-transparent p-6`}>
      <Text>Tab 2</Text>
    </View>
  );
}
