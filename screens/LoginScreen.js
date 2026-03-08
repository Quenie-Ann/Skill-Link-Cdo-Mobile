// screens/LoginScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
  Animated, ActivityIndicator, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FormInput from '../components/FormInput';
import styles from '../styles/LoginScreen.styles';
import Colors from '../styles/colors';

// Static accounts — mirrors web app localAuth
const STATIC_USERS = [
  { email: 'worker@skilllink.com',   password: 'worker123',   full_name: 'Juan Dela Cruz', role: 'worker'   },
  { email: 'resident@skilllink.com', password: 'resident123', full_name: 'Maria Santos',   role: 'resident' },
];

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [formData,   setFormData]   = useState({ email: '', password: '' });
  const [errors,     setErrors]     = useState({});
  const [loginError, setLoginError] = useState('');
  const [isLoading,  setIsLoading]  = useState(false);

  // Animations
  const heroAnim  = useRef(new Animated.Value(0)).current;
  const cardAnim  = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(36)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(cardAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(cardSlide, { toValue: 0, tension: 60, friction: 11, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  // Handlers — mirror web Login.jsx logic
  function handleInput(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (loginError)    setLoginError('');
  }

  function validate() {
    const e = {};
    if (!formData.email.trim())    e.email    = 'Email is required.';
    if (!formData.password.trim()) e.password = 'Password is required.';
    return e;
  }

  async function handleSubmit() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    setIsLoading(true);
    try {
      const user = STATIC_USERS.find(
        (u) => u.email === formData.email.trim() && u.password === formData.password
      );
      if (!user) throw new Error('Invalid email or password.');
      await new Promise((r) => setTimeout(r, 800));
      navigation.replace('Dashboard', { user });
    } catch (err) {
      setLoginError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ── Hero banner ── */}
          <Animated.View style={[styles.heroBanner, { opacity: heroAnim }]}>
            <LinearGradient
              colors={[Colors.skillDark, '#054d38', '#043d2d']}
              style={{ ...{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            />
            <View style={[styles.heroCircle, styles.heroCircle1]} />
            <View style={[styles.heroCircle, styles.heroCircle2]} />

            <View style={{ height: insets.top + 10 }} />

            <View style={styles.heroBranding}>
              <View style={styles.logoWrap}>
                <Image source={require('../assets/logo.png')} style={{ width: 50, height: 50 }} />
              </View>
              <Text style={styles.heroAppName}>Skill-Link CDO</Text>
              <Text style={styles.heroTagline}>Connecting Skills to Opportunities.</Text>
            </View>
          </Animated.View>

          {/* ── Form card ── */}
          <Animated.View style={[styles.formCard, { opacity: cardAnim, transform: [{ translateY: cardSlide }] }]}>
            <LinearGradient
              colors={[Colors.skillPrimary, Colors.emerald600]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.cardTopLine}
            />

            <View style={styles.formHeader}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSub}>Sign in to your account</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.fieldLabel}>Email Address</Text>
            <FormInput
              icon="mail-outline"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.email}
              onChangeText={(v) => handleInput('email', v)}
              error={errors.email}
            />

            <Text style={styles.fieldLabel}>Password</Text>
            <FormInput
              icon="lock-closed-outline"
              placeholder="••••••••"
              secureEntry
              value={formData.password}
              onChangeText={(v) => handleInput('password', v)}
              error={errors.password}
            />

            {loginError ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.errorText} />
                <Text style={styles.errorMsg}>{loginError}</Text>
              </View>
            ) : null}

            <TouchableOpacity onPress={handleSubmit} disabled={isLoading} activeOpacity={0.85} style={[styles.submitWrap, isLoading && { opacity: 0.75 }]}>
              <LinearGradient colors={[Colors.skillPrimary, Colors.emerald700]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitBtn}>
                {isLoading ? (
                  <View style={styles.btnRow}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.submitText}>Authenticating...</Text>
                  </View>
                ) : (
                  <View style={styles.btnRow}>
                    <Text style={styles.submitText}>Sign In</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.footer}>Barangay Digital Services · Cagayan de Oro</Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}