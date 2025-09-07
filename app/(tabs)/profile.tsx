import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Settings, 
  Palette, 
  DollarSign, 
  Calendar, 
  Bell, 
  Shield, 
  FileText, 
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { AppHeader } from '@/components/AppHeader';
import { SettingsItem } from '@/components/SettingsItem';

export default function ProfileScreen() {
  const { theme, toggleTheme, themeMode } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const ThemeIcon = themeMode === 'light' ? Sun : themeMode === 'dark' ? Moon : Smartphone;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Profile" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: 120 }]}
      >
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.surface }]}>JS</Text>
            </View>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>John Smith</Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            john.smith@example.com
          </Text>
        </View>

        {/* Theme Toggle */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <View style={styles.settingsItemLeft}>
              <ThemeIcon size={24} color={colors.text} />
              <View style={styles.settingsItemContent}>
                <Text style={[styles.settingsItemTitle, { color: colors.text }]}>
                  Theme
                </Text>
                <Text style={[styles.settingsItemSubtitle, { color: colors.textSecondary }]}>
                  {themeMode === 'light' ? 'Light' : themeMode === 'dark' ? 'Dark' : 'System'}
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <SettingsItem
            icon={<DollarSign size={24} color={colors.text} />}
            title="Currency"
            subtitle="US Dollar ($)"
          />
          
          <SettingsItem
            icon={<Calendar size={24} color={colors.text} />}
            title="First Day of Week"
            subtitle="Monday"
          />
          
          <SettingsItem
            icon={<Bell size={24} color={colors.text} />}
            title="Notifications"
            subtitle="Enabled"
          />
        </View>

        {/* Legal Section */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal</Text>
          
          <SettingsItem
            icon={<Shield size={24} color={colors.text} />}
            title="Privacy Policy"
          />
          
          <SettingsItem
            icon={<FileText size={24} color={colors.text} />}
            title="Terms of Service"
          />
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            Finora v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  profileCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemContent: {
    marginLeft: 16,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});