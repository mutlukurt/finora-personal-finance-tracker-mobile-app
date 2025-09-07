import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { AppHeader } from '@/components/AppHeader';
import { TransactionItem } from '@/components/TransactionItem';
import { FilterChip } from '@/components/FilterChip';
import { SegmentedControl } from '@/components/SegmentedControl';

export default function TransactionsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [timePeriod, setTimePeriod] = useState('Month');
  const [refreshing, setRefreshing] = useState(false);

  const transactions = [
    {
      id: '1',
      merchant: 'Migros',
      category: 'Groceries',
      amount: -145.50,
      date: new Date('2024-01-15'),
      type: 'expense',
      note: 'Weekly shopping',
    },
    {
      id: '2',
      merchant: 'Salary',
      category: 'Income',
      amount: 8500.00,
      date: new Date('2024-01-01'),
      type: 'income',
      note: 'Monthly salary',
    },
    {
      id: '3',
      merchant: 'Starbucks',
      category: 'Dining',
      amount: -42.75,
      date: new Date('2024-01-14'),
      type: 'expense',
      note: 'Coffee with team',
    },
    {
      id: '4',
      merchant: 'Netflix',
      category: 'Entertainment',
      amount: -29.99,
      date: new Date('2024-01-12'),
      type: 'expense',
      note: 'Monthly subscription',
    },
    {
      id: '5',
      merchant: 'Uber',
      category: 'Transport',
      amount: -28.50,
      date: new Date('2024-01-13'),
      type: 'expense',
      note: 'Airport ride',
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                         (activeFilter === 'Income' && transaction.type === 'income') ||
                         (activeFilter === 'Expense' && transaction.type === 'expense');
    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Transactions" />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search transactions..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {['All', 'Income', 'Expense'].map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            active={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      {/* Time Period Selector */}
      <View style={styles.segmentedContainer}>
        <SegmentedControl
          options={['Day', 'Week', 'Month']}
          selectedOption={timePeriod}
          onOptionPress={setTimePeriod}
        />
      </View>

      {/* Transactions List */}
      <ScrollView 
        style={styles.transactionsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.transactionsContent, { paddingBottom: 120 }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No transactions found
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  filtersContent: {
    paddingRight: 20,
    gap: 8,
  },
  segmentedContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  transactionsList: {
    flex: 1,
  },
  transactionsContent: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    fontWeight: '500',
  },
});