import { Tabs } from 'expo-router';
import { useRouter } from 'expo-router';
import { Chrome as Home, Receipt, ChartPie as PieChart, User, Plus } from 'lucide-react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 90,
            paddingBottom: 34,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 2,
            marginBottom: 2,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Home size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: 'Transactions',
            tabBarIcon: ({ size, color }) => (
              <Receipt size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="budgets"
          options={{
            title: 'Budgets',
            tabBarIcon: ({ size, color }) => (
              <PieChart size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={22} color={color} />
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
    bottom: 110,
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