import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const HomeScreen = ({ navigation }) => {
  const user = auth().currentUser;

  // Single signOut function only
  const signOut = async () => {
    try {
      // Just attempt to revoke and sign out from Google without checking
      await GoogleSignin.revokeAccess().catch(() => {});
      await GoogleSignin.signOut().catch(() => {});
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Logout Error', 'Failed to sign out. Please try again.');
    }
  };
  
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profilePlaceholderText}>
              {user?.displayName?.[0] || user?.email?.[0] || 'U'}
            </Text>
          </View>
        )}

        <Text style={styles.welcomeText}>
          Welcome, {user?.displayName || user?.email || 'User'}
        </Text>

        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  profileContainer: { alignItems: 'center', marginTop: 30, marginBottom: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePlaceholderText: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  emailText: { fontSize: 16, color: '#666' },
  logoutButton: {
    height: 50,
    backgroundColor: '#246EE9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
