import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Signup = ({onSwitchToLogin}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainerlogo}>
        <Image
          style={styles.logo}
          source={require('../assets/loginbg.png')}
        />
      </View>
       <View style={styles.logoContainer}>
              <LottieView
                source={require('../assets/Animation - 1747981972433.json')}
                autoPlay
                loop
                style={{width: 150, height: 150}}
              />
            </View>
  <View style={{marginVertical:10}}>
      <Text style={styles.title}>Create Account</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
  
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />
  
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.switchText}>
            Already have an account? <Text style={styles.link}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Adds spacing below the logo
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainerlogo: {
    flexDirection: 'row',
    marginBottom: 20, // Adds spacing below the logo
    marginHorizontal: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
    marginHorizontal  : 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    marginHorizontal  : 10, 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#246EE9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchText: {
    marginTop: 20,
    fontSize: 14,
    color: '#444',
  },
  link: {
    color: '#246EE9',
    fontWeight: '600',
  },
});


export default Signup;