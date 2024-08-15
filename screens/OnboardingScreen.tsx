import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../reactNativeAppForTest/screens/types';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Swiper loop={false}>
      <View style={styles.slide}>
        <Text style={styles.text}>Welcome to the App!</Text>
        <Button title="Next" onPress={() => navigation.navigate('Login')} />
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Get Started Now</Text>
        <Button title="Next" onPress={() => navigation.navigate('Login')} />
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Let’s Begin</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
