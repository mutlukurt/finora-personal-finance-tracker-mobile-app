import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export function SettingsItem({ icon, title, subtitle, onPress }: SettingsItemProps) {
  const { theme } = useTheme();
  const colors = theme.colors;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert('Coming Soon', `${title} settings will be available in a future update.`);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        {icon}
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <ChevronRight size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
});