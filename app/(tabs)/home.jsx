import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { images } from '../../constants';

const treePose = images.treePose;

const Home = () => {
  return (
    <SafeAreaView className='relative h-full' style={styles.container} edges={[]}>
      <LinearGradient
        colors={[
          'hsl(240, 100%, 20%)',
          'hsl(274, 100%, 21%)',
          'hsl(293, 100%, 21%)',
          'hsl(309, 100%, 24%)',
          'hsl(320, 100%, 29%)',
          'hsl(327, 100%, 34%)',
          'hsl(333, 100%, 38%)',
          'hsl(338, 100%, 41%)',
          'hsl(343, 96%, 45%)',
          'hsl(358, 84%, 56%)',
          'hsl(10, 92%, 57%)',
          'hsl(20, 97%, 55%)',
          'hsl(30, 100%, 50%)',
        ]}
        style={styles.gradientBackground}
      >
        <View className='h-full absolute bottom-0 left-0 right-0 align-middle w-full'>
          <Text className="text-3xl mt-16 font-psemibold text-white text-center">Choose an Exercise</Text>
          <Image source={images.orb} className='max-h-[30vh] w-full m-0 p-0 absolute bottom-0' />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
});

export default Home;

