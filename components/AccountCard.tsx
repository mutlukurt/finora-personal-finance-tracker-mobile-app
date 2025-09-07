import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Wallet, PiggyBank as Piggybank, Bitcoin } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'crypto';
}

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const getAccountIcon = () => {
    switch (account.type) {
      case 'checking':
        return <Wallet size={24} color={colors.primary} />;
      case 'savings':
        return <Piggybank size={24} color={colors.success} />;
      case 'crypto':
        return <Bitcoin size={24} color={colors.warning} />;
      default:
        return <Wallet size={24} color={colors.primary} />;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.surface }]}
      activeOpacity={0.7}
      onPress={() => router.push('/transactions')}
    >
      <View style={styles.iconContainer}>
        {getAccountIcon()}
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{account.name}</Text>
        <Text style={[styles.balance, { color: colors.text }]}>
          ${account.balance.toLocaleString('en-US')}
        </Text>
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
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  balance: {
    fontSize: 18,
    fontWeight: '700',
  },
});