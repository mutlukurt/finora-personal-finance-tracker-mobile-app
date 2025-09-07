import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, Shield, Smartphone } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <TrendingUp size={80} color={colors.primary} />,
      title: 'Smart Financial Tracking',
      subtitle: 'Take control of your money with intelligent expense tracking and budgeting tools',
    },
    {
      icon: <Shield size={80} color={colors.primary} />,
      title: 'Bank-Level Security',
      subtitle: 'Your financial data is encrypted and protected with industry-leading security measures',
    },
    {
      icon: <Smartphone size={80} color={colors.primary} />,
      title: 'Personalized Insights',
      subtitle: 'Receive AI-powered recommendations to optimize your spending and reach your financial goals',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/auth/signin');
    }
  };

  const handleSkip = () => {
    router.replace('/auth/signin');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.primary }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.slideContainer}>
          <View style={styles.iconContainer}>
            {slides[currentSlide].icon}
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            {slides[currentSlide].title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {slides[currentSlide].subtitle}
          </Text>
        </View>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: currentSlide === index ? colors.primary : colors.border,
                  width: currentSlide === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: colors.surface }]}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  slideContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});