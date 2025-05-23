import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const onboardingData = [
    {
        id: 1,
        title: 'Find Great Work',
        subtitle:
          'Meet clients you’re excited to work with and grow your career.',
        lottie: require('../assets/Animation - 1747891556240.json'),
      },
  {
    id: 2,
    title: 'Find opportunities for evry stage of your freelance career',
    subtitle: 'search and apply for jobs, and more',
    lottie: require('../assets/Animation - 1747979196285.json'),

},
  {
    id: 3,
    title: 'Collaborate on the go',
    subtitle: 'search and apply for jobs, and more',
    lottie: require('../assets/Animation - 1747888877580.json'),
},
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % onboardingData.length;
      setCurrentIndex(nextIndex);
      
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: nextIndex * width,
          animated: true,
        });
      }
    }, 5000); // Auto slide every 3 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderSlide = ({ item }) => (
    <View key={item.id} style={styles.slide}>
      {item.lottie ? (
        <LottieView
          source={item.lottie}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
      ) : (
        <Image
          source={item.image}
          style={styles.slideImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
    </View>
  );
  

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {onboardingData.map((item) => renderSlide({ item }))}
      </ScrollView>

      {renderPagination()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  slideImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
  },
  slideSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#246EE9',
    width: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#246EE9',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#246EE9',
  },
  signupButtonText: {
    color: '#246EE9',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;