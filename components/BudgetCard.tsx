import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Budget {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  color: string;
  icon: string;
}

interface BudgetCardProps {
  budget: Budget;
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const progress = budget.spent / budget.budgeted;
  const remaining = budget.budgeted - budget.spent;
  const isOverBudget = progress > 1;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface }]}
      activeOpacity={0.7}
      onPress={() => router.push('/budget-detail')}
    >
      <View style={styles.header}>
        <View style={styles.categoryInfo}>
          <Text style={styles.icon}>{budget.icon}</Text>
          <View style={styles.categoryContent}>
            <Text style={[styles.categoryName, { color: colors.text }]}>
              {budget.category}
            </Text>
            <Text style={[styles.remaining, { color: isOverBudget ? colors.error : colors.textSecondary }]}>
              {isOverBudget ? `$${Math.abs(remaining)} over` : `$${remaining} left`}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: isOverBudget ? colors.error : budget.color,
                width: `${Math.min(progress * 100, 100)}%`,
              },
            ]}
          />
        </View>
        
        <View style={styles.amounts}>
          <Text style={[styles.spent, { color: colors.text }]}>
            ${budget.spent.toLocaleString('en-US')}
          </Text>
          <Text style={[styles.budgeted, { color: colors.textSecondary }]}>
            of ${budget.budgeted.toLocaleString('en-US')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  remaining: {
    fontSize: 14,
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
  progressSection: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  amounts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  spent: {
    fontSize: 16,
    fontWeight: '700',
  },
  budgeted: {
    fontSize: 14,
    fontWeight: '500',
  },
});