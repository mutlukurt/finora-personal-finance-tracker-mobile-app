import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function IndexScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme.colors;

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});