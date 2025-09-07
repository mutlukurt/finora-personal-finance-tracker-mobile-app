import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart, Car, Utensils, Zap, Film, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  note?: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const getCategoryIcon = () => {
    switch (transaction.category.toLowerCase()) {
      case 'groceries':
        return <ShoppingCart size={20} color={colors.text} />;
      case 'transport':
        return <Car size={20} color={colors.text} />;
      case 'dining':
        return <Utensils size={20} color={colors.text} />;
      case 'bills':
        return <Zap size={20} color={colors.text} />;
      case 'entertainment':
        return <Film size={20} color={colors.text} />;
      case 'income':
        return <DollarSign size={20} color={colors.text} />;
      default:
        return <ShoppingCart size={20} color={colors.text} />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const isPositive = transaction.amount > 0;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface }]}
      activeOpacity={0.7}
      onPress={() => router.push('/add-transaction')}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
        {getCategoryIcon()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <Text style={[styles.merchant, { color: colors.text }]}>
            {transaction.merchant}
          </Text>
          <Text style={[styles.amount, { color: isPositive ? colors.success : colors.text }]}>
            {isPositive ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US')}
          </Text>
        </View>
        
        <View style={styles.subContent}>
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {transaction.category}
          </Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {formatDate(transaction.date)}
          </Text>
        </View>
        
        {transaction.note && (
          <Text style={[styles.note, { color: colors.textSecondary }]}>
            {transaction.note}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  subContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
  },
  note: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    fontStyle: 'italic',
  },
});