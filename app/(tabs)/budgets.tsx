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
import { Plus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { AppHeader } from '@/components/AppHeader';
import { BudgetCard } from '@/components/BudgetCard';

export default function BudgetsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const budgets = [
    {
      id: '1',
      category: 'Groceries',
      budgeted: 1000,
      spent: 650,
      color: colors.success,
      icon: '🛒',
    },
    {
      id: '2',
      category: 'Dining',
      budgeted: 500,
      spent: 420,
      color: colors.warning,
      icon: '🍽️',
    },
    {
      id: '3',
      category: 'Transport',
      budgeted: 300,
      spent: 180,
      color: colors.info,
      icon: '🚗',
    },
    {
      id: '4',
      category: 'Entertainment',
      budgeted: 400,
      spent: 480,
      color: colors.error,
      icon: '🎬',
    },
    {
      id: '5',
      category: 'Bills',
      budgeted: 800,
      spent: 750,
      color: colors.primary,
      icon: '💡',
    },
  ];

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Budgets" />
      
      {/* Summary Card */}
      <View style={[styles.summaryCard, { backgroundColor: colors.surface }]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Budgeted
            </Text>
            <Text style={[styles.summaryAmount, { color: colors.text }]}>
              ${totalBudgeted.toLocaleString('en-US')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Spent
            </Text>
            <Text style={[styles.summaryAmount, { color: colors.text }]}>
              ${totalSpent.toLocaleString('en-US')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Remaining
            </Text>
            <Text style={[styles.summaryAmount, { color: remaining >= 0 ? colors.success : colors.error }]}>
              ${Math.abs(remaining).toLocaleString('en-US')}
            </Text>
          </View>
        </View>
      </View>

      {/* Create Budget Button */}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
          onPress={() => router.push('/add-transaction')}
        >
          <Plus size={20} color={colors.surface} />
          <Text style={[styles.createButtonText, { color: colors.surface }]}>
            Create Budget
          </Text>
        </TouchableOpacity>
      </View>

      {/* Budgets List */}
      <ScrollView 
        style={styles.budgetsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.budgetsContent, { paddingBottom: 120 }]}
      >
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  createButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgetsList: {
    flex: 1,
  },
  budgetsContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
});