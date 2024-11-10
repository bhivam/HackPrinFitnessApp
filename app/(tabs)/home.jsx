import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
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

const StreakCalendar = () => {
  const [markedDates, setMarkedDates] = useState({});
  const streakDays = 7; 

  useEffect(() => {
    const today = new Date();
    let dates = {};

    for (let i = 0; i < streakDays; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const formattedDate = date.toISOString().split('T')[0];
      dates[formattedDate] = {
        marked: true,
        dotColor: 'orange', 
        selected: true,
        selectedColor: 'orange', 
      };
    }

    setMarkedDates(dates);
  }, []);

  return (
    <View style={styles.streakCalendarContainer}>
      <Text style={styles.streakMessage}>Keep it up, you're on a {streakDays} Day Streak!</Text>
      <Calendar
        markingType={'multi-dot'}
        markedDates={markedDates}
        theme={{
          backgroundColor: 'black',
          calendarBackground: 'black',
          textSectionTitleColor: 'white',
          selectedDayBackgroundColor: 'orange',
          selectedDayTextColor: 'white',
          todayTextColor: 'orange',
          dayTextColor: 'white',
          monthTextColor: 'white',
          arrowColor: 'white',
          textDisabledColor: 'gray',
          dotColor: 'orange',
          selectedDotColor: 'white',
        }}
        style = {{borderRadius: 15, width: 300, height: 300, alignSelf: 'center'}}
      />
    </View>
  );
};

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
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text className="text-white font-psemibold text-4xl text-center">Welcome back, John!</Text>
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
                <Text className='absolute font-pbold text-secondary text-[2rem] mt-5'>
                  {item.title}
                </Text>
                <Text className='absolute font-pbold text-secondary text-[1.5rem] mt-5 bottom-36'>
                  Difficulty: easy
                </Text>
                <CustomButton
                  title={'Select Pose'}
                  handlePress={() => router.push(item.route)}
                  containerStyles='items-center w-auto p-2 m-7'
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
          <View>
            <StreakCalendar />
            <Text className="text-center text-secondary font-pregular">Days Logged</Text>
          </View>
        </ScrollView>
        <Image
          source={images.orb}
          className='max-h-[30vh] w-full m-0 p-0 absolute bottom-0 -z-10'
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
  },
  gradientBackground: {
    flex: 1,
    height: '100vh',
  },
  searchContainer: {
    zIndex: 10,
    marginTop: 40,
    width: imageW * 1.2,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  searchInputContainer: {
    backgroundColor: '#232533',
    borderColor: 'transparent',
    borderRadius: 16,
    height: 10,
    width: 170,
    alignSelf: 'center',
  },
  searchInput: {
    fontSize: 16,
    borderColor: 'transparent',
  },
  flatListContent: {
    alignItems: 'flex-start',
    paddingTop: 40,
  },
  imageContainer: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
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
  streakCalendarContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    width: '20px'
  },
  streakMessage: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 40
  },
});

export default Home;
