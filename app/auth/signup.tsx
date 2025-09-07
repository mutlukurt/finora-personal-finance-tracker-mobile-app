import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SignUpScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string; 
  }>({});

  const handleSignUp = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string; 
      confirmPassword?: string; 
    } = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Join Finora</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Create your account and start your journey to financial freedom
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: errors.name ? colors.error : colors.border }]}>
              <User size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Full name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
              />
            </View>
            {errors.name && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.name}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: errors.email ? colors.error : colors.border }]}>
              <Mail size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email address"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: errors.password ? colors.error : colors.border }]}>
              <Lock size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.password}
              </Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: errors.confirmPassword ? colors.error : colors.border }]}>
              <Lock size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm password"
                placeholderTextColor={colors.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.signUpButton, { backgroundColor: colors.primary }]}
            onPress={handleSignUp}
          >
            <Text style={[styles.signUpButtonText, { color: colors.surface }]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <Text style={[styles.termsText, { color: colors.textSecondary }]}>
            By signing up, you agree to our{' '}
            <Text style={[styles.termsLink, { color: colors.primary }]}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={[styles.termsLink, { color: colors.primary }]}>
              Privacy Policy
            </Text>
            . We'll keep your financial data secure and private.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginLeft: 4,
  },
  signUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footerLink: {
    fontSize: 16,
    fontWeight: '600',
  },
});