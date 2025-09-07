import { Tabs } from 'expo-router';
import { useRouter } from 'expo-router';
import { Chrome as Home, Receipt, ChartPie as PieChart, User, Plus } from 'lucide-react-native';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

export default function TabLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  // Responsive calculations
  const isSmallScreen = screenWidth <= 320;
  const isMediumScreen = screenWidth > 320 && screenWidth <= 375;
  
  const tabBarHeight = isSmallScreen ? 75 : 90;
  const paddingBottom = isSmallScreen ? 25 : 34;
  const paddingTop = isSmallScreen ? 4 : 8;
  const iconSize = isSmallScreen ? 18 : 22;
  const fontSize = isSmallScreen ? 10 : 11;
  const labelMarginTop = isSmallScreen ? 2 : 2;
  const iconMarginTop = isSmallScreen ? 1 : 4;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: tabBarHeight,
            paddingBottom: paddingBottom,
            paddingTop: paddingTop,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: fontSize,
            fontWeight: '500',
            marginTop: labelMarginTop,
            marginBottom: isSmallScreen ? 3 : labelMarginTop,
          },
          tabBarIconStyle: {
            marginTop: iconMarginTop,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={iconSize} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: 'Transactions',
            tabBarIcon: ({ size, color }) => (
              <Receipt size={iconSize} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="budgets"
          options={{
            title: 'Budgets',
            tabBarIcon: ({ size, color }) => (
              <PieChart size={iconSize} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={iconSize} color={color} />
            ),
          }}
        />
      </Tabs>
      
      {/* Floating Action Button */}
      <View style={[styles.fabContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[styles.fab, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
          onPress={() => router.push('/add-transaction')}
        >
          <Plus size={24} color={colors.surface} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: screenWidth <= 320 ? 95 : 110,
    right: 20,
    borderRadius: 28,
    padding: 4,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});