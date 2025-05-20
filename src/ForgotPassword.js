import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  Image
} from "react-native";
import auth from "@react-native-firebase/auth";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Check Your Email",
          "A password reset link has been sent to your email."
        );
        navigation.goBack(); // Navigate back to Login screen
      })
      .catch(error => {
        console.error("Password Reset Error:", error);
        if (error.code === "auth/user-not-found") {
          Alert.alert("Error", "No user found with this email.");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Error", "Invalid email format.");
        } else {
          Alert.alert("Error", error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.logoContainer}>
        {/* <Image
          resizeMode="contain"
          style={styles.socialIconlogo}
          source={require('../../../assets/loginbg.png')}
        /> */}
      </View>
      <Text style={styles.heading}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Go back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "black",
    backgroundColor: "#f5f5f5",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#246EE9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backText: {
    color: "#246EE9",
    marginTop: 15,
    fontSize: 14,
  },
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Adds spacing below the logo
  },
  socialIconlogo: {
    height: 60,
    width: 60,
    marginTop: 20,
  },
});

export default ForgotPassword;
