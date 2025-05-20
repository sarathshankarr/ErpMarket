import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your components
import Signup from './src/Signup';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import ForgotPassword from './src/ForgotPassword';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Configure Google Sign-In
  useEffect(() => {
    async function configureGoogleSignIn() {
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        GoogleSignin.configure({
          offlineAccess: true,
          webClientId: Platform.OS === 'ios'
            ? '631419858227-k61quel15pnel3u9rhn4ack6hdjlr28o.apps.googleusercontent.com'
            : '631419858227-lf62i4md7uqadhj8cd2qbr4a2123fntm.apps.googleusercontent.com',
        });
      } catch (error) {
        console.log('Google Sign-In configuration error:', error);
      }
    }
    configureGoogleSignIn();
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Show nothing while initializing
  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // User is not signed in
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;