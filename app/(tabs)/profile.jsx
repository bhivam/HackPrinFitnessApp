import React from 'react';

import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { ScrollView, View, Image, Text } from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView className='bg-primary h-[100vh]  p-6'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex flex-row gap-3 justify-start items-center'>
          <Image source={images.man} className='rounded-full w-20 h-20' />
          <View>
            <Text className='text-4xl text-white font-psemibold mt-4'>
              John Stamos
            </Text>
            <Text className='text-1xl font-pregular mt-2 text-gray-500'>
              Member since Nov. 10, 2024
            </Text>
          </View>
        </View>
        <View className='bg-white h-[1px] mt-2 mb-2'></View>
        <View>
          <Text className='font-psemibold text-2xl text-white mt-4'>
            General
          </Text>
          <View>
            <CustomButton
              title='Profile'
              handlePress={null}
              containerStyles='w-full mt-2 pl-3'
            />
            <CustomButton
              title='Data & Privacy'
              handlePress={null}
              containerStyles='w-full mt-2  pl-3'
            />
            <CustomButton
              title='Password'
              handlePress={null}
              containerStyles='w-full mt-2  pl-3'
            />
            <CustomButton
              title='Expenditure'
              handlePress={null}
              containerStyles='w-full mt-2 pl-3 '
            />
          </View>
        </View>

        <Text className='font-psemibold text-2xl text-white mt-4'>
          Community & Support
        </Text>
        <View>
          <CustomButton
            title='Terms of Service'
            handlePress={null}
            containerStyles='w-full mt-2  pl-3'
          />
          <CustomButton
            title='Privacy Policy'
            handlePress={null}
            containerStyles='w-full mt-2 pl-3'
          />
          <CustomButton
            title='Health Disclaimer'
            handlePress={null}
            containerStyles='w-full mt-2 pl-3'
          />
          <CustomButton
            title='About'
            handlePress={null}
            containerStyles='w-full mt-2  pl-3'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
