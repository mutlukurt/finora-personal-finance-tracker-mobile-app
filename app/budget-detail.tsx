import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CreditCard as Edit3, Trash2 } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function BudgetDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const params = useLocalSearchParams();
  
  const [isEditing, setIsEditing] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState('1000');

  // Mock budget data - in real app this would come from params or state
  const budget = {
    id: '1',
    category: 'Groceries',
    budgeted: 1000,
    spent: 650,
    color: colors.success,
    icon: '🛒',
  };

  const progress = budget.spent / budget.budgeted;
  const remaining = budget.budgeted - budget.spent;
  const isOverBudget = progress > 1;

  const handleSave = () => {
    // Save budget changes
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Delete budget
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {budget.category} Budget
        </Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editButton}>
          <Edit3 size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Overview */}
        <View style={[styles.overviewCard, { backgroundColor: colors.surface }]}>
          <View style={styles.budgetIcon}>
            <Text style={styles.iconText}>{budget.icon}</Text>
          </View>
          
          <View style={styles.budgetInfo}>
            <Text style={[styles.categoryName, { color: colors.text }]}>
              ${budget.spent.toLocaleString('en-US')} spent
            </Text>
            <Text style={[styles.remaining, { color: isOverBudget ? colors.error : colors.textSecondary }]}>
              of ${budget.budgeted.toLocaleString('en-US')}
            </Text>
          </View>

          <View style={styles.progressContainer}>
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
                ₺{budget.spent.toLocaleString('tr-TR')} spent
              </Text>
              <Text style={[styles.budgeted, { color: colors.textSecondary }]}>
                of ₺{budget.budgeted.toLocaleString('tr-TR')}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Budget Amount */}
        {isEditing && (
          <View style={[styles.editSection, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Budget Amount
            </Text>
            <View style={styles.amountInputContainer}>
              <Text style={[styles.currencySymbol, { color: colors.text }]}>₺</Text>
              <TextInput
                style={[styles.amountInput, { color: colors.text, borderColor: colors.border }]}
                value={budgetAmount}
                onChangeText={setBudgetAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: colors.primary }]}
                onPress={handleSave}
              >
                <Text style={[styles.saveButtonText, { color: colors.surface }]}>
                  Save Changes
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.deleteButton, { backgroundColor: colors.error }]}
                onPress={handleDelete}
              >
                <Trash2 size={20} color={colors.surface} />
                <Text style={[styles.deleteButtonText, { color: colors.surface }]}>
                  Delete Budget
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Recent Transactions */}
        <View style={[styles.transactionsSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Transactions
          </Text>
          
          {/* Mock transactions */}
          {[
            { merchant: 'Migros', amount: -145.50, date: '15 Jan' },
            { merchant: 'CarrefourSA', amount: -89.25, date: '12 Jan' },
            { merchant: 'A101', amount: -32.75, date: '10 Jan' },
          ].map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={[styles.merchantName, { color: colors.text }]}>
                  {transaction.merchant}
                </Text>
                <Text style={[styles.transactionDate, { color: colors.textSecondary }]}>
                  {transaction.date}
                </Text>
              </View>
              <Text style={[styles.transactionAmount, { color: colors.text }]}>
                ${Math.abs(transaction.amount).toLocaleString('en-US')}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  overviewCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  budgetIcon: {
    marginBottom: 16,
  },
  iconText: {
    fontSize: 48,
  },
  budgetInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  remaining: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spent: {
    fontSize: 16,
    fontWeight: '600',
  },
  budgeted: {
    fontSize: 14,
    fontWeight: '500',
  },
  editSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editButtons: {
    gap: 12,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionsSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  transactionInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});