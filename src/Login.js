import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
// import { WEB_CLIENT_ID } from '@env';

const Login = ({onSwitchToSignup, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    async function init() {
      const has = await GoogleSignin.hasPlayServices();
      if (has) {
        GoogleSignin.configure({
          offlineAccess: true,
          webClientId: Platform.OS === 'ios'
            ? '631419858227-k61quel15pnel3u9rhn4ack6hdjlr28o.apps.googleusercontent.com'
            : '631419858227-lf62i4md7uqadhj8cd2qbr4a2123fntm.apps.googleusercontent.com',
        });
      }
    }
    init();
  }, []);

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.log('No user found for that email.');
        }

        if (error.code === 'auth/wrong-password') {
          console.log('Incorrect password.');
        }

        console.error(error);
      });
  };
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Obtain the user's ID token
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        data?.data.idToken,
      );

      console.log('credential: ', googleCredential);
      // login with credential
      await auth().signInWithCredential(googleCredential);

      //  Handle the linked account as needed in your app
      return;
    } catch (e) {
      console.log('e: ', e);
    }
  };
  const navigateForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/loginbg.png')} />
      </View>

      <Text style={styles.title}>Codeverse</Text>
      <Text style={styles.subtitle}>Welcome back 👋</Text>

      <View style={styles.formContainer}>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />

<View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={{marginHorizontal:10}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#666"
        />
</View>
<View style={{marginHorizontal:10}}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />
</View>
        {/* <TouchableOpacity onPress={navigateForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity> */}
          <TouchableOpacity>
          <View style={{marginHorizontal:10}}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>
        <View style={{marginHorizontal:10}}>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.switchButtonText}>
            Don’t have an account? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  logoContainer: {
    marginBottom: 10,
    marginHorizontal:10
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: Platform.select({
      ios: 'Georgia',
      android: 'serif',
    }),
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    marginLeft: 30,
    alignSelf: 'center',
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    
  },
  googleButton: {
    width: '96%',
    height: 48,
    marginBottom: 15,
    marginHorizontal:10,
    
  },
  orText: {
    marginVertical: 10,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    width: 40,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#246EE9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#246EE9',
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  switchButtonText: {
    marginTop: 20,
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
    fontWeight: '500',
  },
  link: {
    color: '#246EE9',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default Login;
