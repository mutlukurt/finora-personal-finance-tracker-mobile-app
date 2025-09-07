import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export function SpendingChart() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const data = [
    { category: 'Groceries', amount: 650, color: colors.success },
    { category: 'Dining', amount: 420, color: colors.warning },
    { category: 'Transport', amount: 180, color: colors.info },
    { category: 'Bills', amount: 750, color: colors.primary },
    { category: 'Entertainment', amount: 320, color: colors.accent },
  ];

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.chartContainer}>
        <View style={styles.donutChart}>
          {data.map((item, index) => (
            <View
              key={item.category}
              style={[
                styles.segment,
                {
                  backgroundColor: item.color,
                  flex: item.amount / total,
                },
              ]}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.legend}>
        {data.map((item) => (
          <TouchableOpacity 
            key={item.category} 
            style={styles.legendItem}
            onPress={() => router.push('/transactions')}
            activeOpacity={0.7}
          >
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={[styles.legendLabel, { color: colors.text }]}>
              {item.category}
            </Text>
            <Text style={[styles.legendAmount, { color: colors.textSecondary }]}>
              ${item.amount}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  donutChart: {
    flexDirection: 'row',
    width: 200,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  legend: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  legendAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
});