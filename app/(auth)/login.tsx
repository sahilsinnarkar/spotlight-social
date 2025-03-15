import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useSSO } from "@clerk/clerk-expo";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    '(tabs)': undefined;
  };

export default function login() {
  
    const { startSSOFlow } = useSSO();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
    const handleGoogleSignIn = async () => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: "oauth_google",
        });
    
        if (setActive && createdSessionId) {
          setActive({ session: createdSessionId });
          navigation.replace("(tabs)");
        }
      } catch (error) {
        console.log("OAuth error: ", error);
      }
    };

  return (
    <View style={styles.container}>
      {/* Brand section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>spotlight</Text>
        <Text style={styles.tagline}>don't miss anything</Text>
      </View>

      {/* illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/auth-png.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>

      {/* login section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to terms and Privacy Policy.
        </Text>
      </View>
    </View>
  );
}
