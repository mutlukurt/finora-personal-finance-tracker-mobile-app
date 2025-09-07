import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export function BudgetSummary() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const budgets = [
    { category: 'Groceries', budgeted: 1000, spent: 650, color: colors.success },
    { category: 'Dining', budgeted: 500, spent: 420, color: colors.warning },
    { category: 'Transport', budgeted: 300, spent: 180, color: colors.info },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {budgets.map((budget, index) => {
        const progress = budget.spent / budget.budgeted;
        const remaining = budget.budgeted - budget.spent;
        
        return (
          <TouchableOpacity 
            key={budget.category} 
            style={[styles.budgetItem, index < budgets.length - 1 && styles.budgetItemBorder]}
            onPress={() => router.push('/budget-detail')}
            activeOpacity={0.7}
          >
            <View style={styles.budgetHeader}>
              <Text style={[styles.budgetCategory, { color: colors.text }]}>
                {budget.category}
              </Text>
              <Text style={[styles.budgetAmount, { color: colors.textSecondary }]}>
                ${remaining} left
              </Text>
            </View>
            
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: progress > 1 ? colors.error : budget.color,
                    width: `${Math.min(progress * 100, 100)}%`,
                  },
                ]}
              />
            </View>
            
            <Text style={[styles.budgetProgress, { color: colors.textSecondary }]}>
              ${budget.spent} of ${budget.budgeted}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  budgetItem: {
    paddingVertical: 16,
  },
  budgetItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetCategory: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgetAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  budgetProgress: {
    fontSize: 12,
    fontWeight: '500',
  },
});