import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  const words = ["life", "health", "fitness", "habits", "mindset"];
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 200 : 100; 
    const pauseDuration = 1000; 

    if (!isDeleting && displayText === currentWord) {
      setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    } else {
      const nextText = isDeleting
        ? currentWord.substring(0, displayText.length - 1)
        : currentWord.substring(0, displayText.length + 1);

      setTimeout(() => setDisplayText(nextText), typingSpeed);
    }
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='w-full justify-center items-center h-full px-4 min-h-[85vh]'>
          <Image
            source={images.logo}
            className='w-[75vw] h-auto'
            resizeMode='contain'
          />
          <Image 
            source={images.mascot}
            style={{ width: 300, height: 300 }}
            resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Revolutionize your{' '}
              <Text className='text-secondary-200'>{displayText}</Text>
              <Text className='text-secondary-200'>|</Text> 
            </Text>
          </View>
          <CustomButton
            title='Continue'
            handlePress={() => {router.push('/home')}}
            containerStyles='w-full mt-7'
          />
          <Text className="text-xs text-gray-50 mt-2 font-pextralight">Est. 2024</Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
