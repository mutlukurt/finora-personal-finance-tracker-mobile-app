import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, Scan, CirclePlus as PlusCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { AccountCard } from '@/components/AccountCard';
import { QuickActionButton } from '@/components/QuickActionButton';
import { SpendingChart } from '@/components/SpendingChart';
import { BudgetSummary } from '@/components/BudgetSummary';
import { AppHeader } from '@/components/AppHeader';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [balanceVisible, setBalanceVisible] = React.useState(true);

  const accounts = [
    { id: '1', name: 'Main Checking', balance: 12450, type: 'checking' },
    { id: '2', name: 'Savings', balance: 40120, type: 'savings' },
    { id: '3', name: 'Crypto Wallet', balance: 3200, type: 'crypto' },
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const monthlyChange = 12.5; // percentage

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Balance Overview */}
        <View style={[styles.balanceCard, { backgroundColor: colors.surface }]}>
          <View style={styles.balanceHeader}>
            <Text style={[styles.balanceLabel, { color: colors.textSecondary }]}>
              Total Balance
            </Text>
            <TouchableOpacity
              onPress={() => setBalanceVisible(!balanceVisible)}
              style={styles.visibilityButton}
            >
              {balanceVisible ? (
                <Eye size={20} color={colors.textSecondary} />
              ) : (
                <EyeOff size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.balanceAmount}>
            <Text style={[styles.balance, { color: colors.text }]}>
              {balanceVisible ? `$${totalBalance.toLocaleString('en-US')}` : '••••••'}
            </Text>
            <View style={[styles.changeBadge, { backgroundColor: colors.success + '15' }]}>
              <ArrowUpRight size={16} color={colors.success} />
              <Text style={[styles.changeText, { color: colors.success }]}>
                +{monthlyChange}%
              </Text>
            </View>
          </View>
        </View>

        {/* Accounts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Accounts</Text>
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickActionButton
              icon={<ArrowDownRight size={24} color={colors.error} />}
              label="Add Expense"
              onPress={() => router.push('/add-transaction')}
            />
            <QuickActionButton
              icon={<ArrowUpRight size={24} color={colors.success} />}
              label="Add Income"
              onPress={() => router.push('/add-transaction')}
            />
            <QuickActionButton
              icon={<Scan size={24} color={colors.primary} />}
              label="Scan Receipt"
              onPress={() => router.push('/add-transaction')}
            />
          </View>
        </View>

        {/* Spending Chart */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Monthly Spending</Text>
          <SpendingChart />
        </View>

        {/* Budgets Summary */}
        <View style={[styles.section, { marginBottom: 120 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Budgets</Text>
          <BudgetSummary />
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
  balanceCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  visibilityButton: {
    padding: 4,
  },
  balanceAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    flex: 1,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});