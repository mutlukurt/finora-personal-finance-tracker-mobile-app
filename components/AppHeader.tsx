import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface AppHeaderProps {
  title?: string;
}

export function AppHeader({ title = 'Good Morning' }: AppHeaderProps) {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {title}
        </Text>
        <TouchableOpacity style={styles.notificationButton}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.surface }]}>JS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    flex: 1,
  },
  notificationButton: {
    marginLeft: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
  },
});