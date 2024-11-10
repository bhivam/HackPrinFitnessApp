import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';
import { shadows } from '../../constants/shadow';
import { images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const { width } = Dimensions.get('screen');
const imageW = width * 0.7;
const imageH = imageW * 1.3;

const data = [
  { image: images.lotusPose, title: 'Lotus Pose', route: '/lotus' },
  { image: images.treePose, title: 'Tree Pose', route: '/tree' },
  {
    image: images.downwardDogPose,
    title: 'Downward Dog Pose',
    route: '/downward-dog',
  },
  { image: images.squatPose, title: 'Squat Pose', route: '/squat' },
  { image: images.warriorPose, title: 'Warrior Pose', route: '/warrior' },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <LinearGradient
        colors={[
          'hsl(240, 94%, 7%)',
          'hsl(244, 95%, 8%)',
          'hsl(248, 95%, 9%)',
          'hsl(252, 96%, 10%)',
          'hsl(256, 96%, 11%)',
          'hsl(259, 97%, 13%)',
          'hsl(263, 97%, 14%)',
          'hsl(267, 98%, 15%)',
          'hsl(271, 98%, 16%)',
          'hsl(275, 99%, 17%)',
          'hsl(279, 99%, 18%)',
          'hsl(283, 100%, 19%)',
          'hsl(287, 100%, 20%)',
        ]}
        style={styles.gradientBackground}
      >
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder='Search poses...'
            onChangeText={handleSearch}
            value={search}
            platform='default'
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
          />
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.title}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.flatListContent}
          snapToOffsets={[...Array(filteredData.length)].map(
            (_, i) => i * width
          )}
          snapToAlignment='center'
          decelerationRate='fast'
          renderItem={({ item }) => (
            <View style={[styles.imageContainer, shadows.high]}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode='cover'
              />
              <CustomButton
                title={item.title}
                handlePress={() => router.push(item.route)}
                containerStyles='w-1/2 mt-7'
              />
            </View>
          )}
        />

        <View style={styles.indicatorContainer}>
          {filteredData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === activeIndex ? styles.activeIndicator : null,
              ]}
            />
          ))}
        </View>

        <Image
          source={images.orb}
          className='max-h-[30vh] w-full m-0 p-0 absolute bottom-0 -z-10'
        />
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
  searchContainer: {
    zIndex: 10,
    marginTop: 40,
    width: imageW * 1.2,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  searchInputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    height: 45,
  },
  searchInput: {
    fontSize: 16,
  },
  flatListContent: {
    alignItems: 'flex-start',
    paddingTop: 40
  },
  imageContainer: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: imageW,
    height: imageH,
    borderRadius: 16,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: 10,
    height: 10,
  },
});

export default Home;
