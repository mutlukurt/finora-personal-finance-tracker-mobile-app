import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { useRouter, router } from 'expo-router';
import { 
  X, 
  Calculator, 
  Calendar, 
  FileText, 
  Camera,
  Wallet,
  ShoppingCart,
  Car,
  Utensils,
  Zap,
  Film,
  Heart,
  DollarSign
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const categories = [
  { id: 'groceries', name: 'Groceries', icon: ShoppingCart, color: '#16A34A' },
  { id: 'transport', name: 'Transport', icon: Car, color: '#3B82F6' },
  { id: 'dining', name: 'Dining', icon: Utensils, color: '#F59E0B' },
  { id: 'bills', name: 'Bills', icon: Zap, color: '#EF4444' },
  { id: 'entertainment', name: 'Entertainment', icon: Film, color: '#8B5CF6' },
  { id: 'health', name: 'Health', icon: Heart, color: '#EC4899' },
  { id: 'income', name: 'Income', icon: DollarSign, color: '#10B981' },
];

const accounts = [
  { id: '1', name: 'Main Checking', balance: 12450 },
  { id: '2', name: 'Savings', balance: 40120 },
  { id: '3', name: 'Crypto Wallet', balance: 3200 },
];

export default function AddTransactionScreen() {
  const { theme } = useTheme();
  const colors = theme.colors;
  
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].id);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);

  const filteredCategories = categories.filter(cat => 
    transactionType === 'income' ? cat.id === 'income' : cat.id !== 'income'
  );

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);

  // Responsive calculations
  const isSmallScreen = screenWidth <= 375;
  const isMediumScreen = screenWidth > 375 && screenWidth <= 425;
  const horizontalMargin = isSmallScreen ? 8 : isMediumScreen ? 12 : 16;
  const contentPadding = isSmallScreen ? 12 : isMediumScreen ? 16 : 20;
  const sectionPadding = isSmallScreen ? 12 : isMediumScreen ? 16 : 20;
  const fontSize = isSmallScreen ? 14 : 16;
  const titleFontSize = isSmallScreen ? 16 : 18;
  const amountFontSize = isSmallScreen ? 24 : isMediumScreen ? 28 : 32;

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleSave = () => {
    if (!amount || !selectedCategory) {
      return;
    }
    
    // Here you would save the transaction
    console.log('Saving transaction:', {
      type: transactionType,
      amount: parseFloat(amount),
      category: selectedCategory,
      account: selectedAccount,
      note,
      date,
    });
    
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={handleClose}
      />
      <View style={[
        styles.bottomSheet, 
        { 
          backgroundColor: colors.background,
          marginHorizontal: horizontalMargin,
          marginBottom: isSmallScreen ? 16 : 20,
          maxHeight: isSmallScreen ? screenHeight * 0.9 : screenHeight * 0.85,
        }
      ]}>
        <View style={[styles.handle, { backgroundColor: colors.border }]} />
        
        {/* Header */}
        <View style={[
          styles.header, 
          { 
            borderBottomColor: colors.border,
            paddingHorizontal: contentPadding,
            paddingVertical: isSmallScreen ? 12 : 16,
          }
        ]}>
          <Text style={[
            styles.headerTitle, 
            { 
              color: colors.text,
              fontSize: titleFontSize,
            }
          ]}>
            Add Transaction
          </Text>
          <TouchableOpacity 
            onPress={handleSave}
            style={[
              styles.saveButton, 
              { 
                backgroundColor: (!amount || !selectedCategory) ? colors.border : colors.primary,
                paddingHorizontal: isSmallScreen ? 12 : 16,
                paddingVertical: isSmallScreen ? 6 : 8,
              }
            ]}
            disabled={!amount || !selectedCategory}
          >
            <Text style={[
              styles.saveButtonText, 
              { 
                color: (!amount || !selectedCategory) ? colors.textSecondary : colors.surface,
                fontSize: fontSize,
              }
            ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content} 
          contentContainerStyle={{
            paddingHorizontal: contentPadding,
            paddingTop: isSmallScreen ? 16 : 20,
            paddingBottom: isSmallScreen ? 16 : 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Transaction Type Toggle */}
          <View style={[
            styles.typeToggle, 
            { 
              backgroundColor: colors.surface,
              marginBottom: isSmallScreen ? 16 : 20,
              padding: isSmallScreen ? 3 : 4,
            }
          ]}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'expense' && { backgroundColor: colors.error },
                { paddingVertical: isSmallScreen ? 10 : 12 }
              ]}
              onPress={() => {
                setTransactionType('expense');
                setSelectedCategory('');
              }}
            >
              <Text style={[
                styles.typeButtonText,
                { 
                  color: transactionType === 'expense' ? colors.surface : colors.text,
                  fontSize: fontSize,
                }
              ]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'income' && { backgroundColor: colors.success },
                { paddingVertical: isSmallScreen ? 10 : 12 }
              ]}
              onPress={() => {
                setTransactionType('income');
                setSelectedCategory('income');
              }}
            >
              <Text style={[
                styles.typeButtonText,
                { 
                  color: transactionType === 'income' ? colors.surface : colors.text,
                  fontSize: fontSize,
                }
              ]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <View style={[
            styles.amountSection, 
            { 
              backgroundColor: colors.surface,
              padding: sectionPadding,
              marginBottom: isSmallScreen ? 12 : 16,
            }
          ]}>
            <View style={styles.amountHeader}>
              <Calculator size={isSmallScreen ? 20 : 24} color={colors.primary} />
              <Text style={[
                styles.sectionTitle, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                }
              ]}>Amount</Text>
            </View>
            <View style={styles.amountInputContainer}>
              <Text style={[
                styles.currencySymbol, 
                { 
                  color: colors.text,
                  fontSize: amountFontSize,
                }
              ]}>$</Text>
              <TextInput
                style={[
                  styles.amountInput, 
                  { 
                    color: colors.text,
                    fontSize: amountFontSize,
                  }
                ]}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                autoFocus
              />
            </View>
          </View>

          {/* Category Selection */}
          <TouchableOpacity 
            style={[
              styles.section, 
              { 
                backgroundColor: colors.surface,
                padding: sectionPadding,
                marginBottom: isSmallScreen ? 12 : 16,
              }
            ]}
            onPress={() => setShowCategoryPicker(true)}
          >
            <View style={styles.sectionHeader}>
              {selectedCategoryData ? (
                <selectedCategoryData.icon size={isSmallScreen ? 20 : 24} color={selectedCategoryData.color} />
              ) : (
                <ShoppingCart size={isSmallScreen ? 20 : 24} color={colors.textSecondary} />
              )}
              <Text style={[
                styles.sectionTitle, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                }
              ]}>Category</Text>
            </View>
            <Text style={[
              styles.sectionValue, 
              { 
                color: selectedCategoryData ? colors.text : colors.textSecondary,
                fontSize: fontSize,
              }
            ]}>
              {selectedCategoryData ? selectedCategoryData.name : 'Select category'}
            </Text>
          </TouchableOpacity>

          {/* Account Selection */}
          <TouchableOpacity 
            style={[
              styles.section, 
              { 
                backgroundColor: colors.surface,
                padding: sectionPadding,
                marginBottom: isSmallScreen ? 12 : 16,
              }
            ]}
            onPress={() => setShowAccountPicker(true)}
          >
            <View style={styles.sectionHeader}>
              <Wallet size={isSmallScreen ? 20 : 24} color={colors.primary} />
              <Text style={[
                styles.sectionTitle, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                }
              ]}>Account</Text>
            </View>
            <Text style={[
              styles.sectionValue, 
              { 
                color: colors.text,
                fontSize: fontSize,
              }
            ]}>
              {selectedAccountData?.name}
            </Text>
          </TouchableOpacity>

          {/* Date Selection */}
          <View style={[
            styles.section, 
            { 
              backgroundColor: colors.surface,
              padding: sectionPadding,
              marginBottom: isSmallScreen ? 12 : 16,
            }
          ]}>
            <View style={styles.sectionHeader}>
              <Calendar size={isSmallScreen ? 20 : 24} color={colors.primary} />
              <Text style={[
                styles.sectionTitle, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                }
              ]}>Date</Text>
            </View>
            <Text style={[
              styles.sectionValue, 
              { 
                color: colors.text,
                fontSize: fontSize,
              }
            ]}>
              {formatDate(date)}
            </Text>
          </View>

          {/* Note Input */}
          <View style={[
            styles.section, 
            { 
              backgroundColor: colors.surface,
              padding: sectionPadding,
              marginBottom: isSmallScreen ? 12 : 16,
            }
          ]}>
            <View style={styles.sectionHeader}>
              <FileText size={isSmallScreen ? 20 : 24} color={colors.primary} />
              <Text style={[
                styles.sectionTitle, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                }
              ]}>Note</Text>
            </View>
            <TextInput
              style={[
                styles.noteInput, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                  minHeight: isSmallScreen ? 50 : 60,
                }
              ]}
              placeholder="Add a note (optional)"
              placeholderTextColor={colors.textSecondary}
              value={note}
              onChangeText={setNote}
              multiline
            />
          </View>

          {/* Receipt Attachment */}
          <TouchableOpacity style={[
            styles.section, 
            { 
              backgroundColor: colors.surface,
              padding: sectionPadding,
            }
          ]}>
            <View style={styles.sectionHeader}>
              <Camera size={isSmallScreen ? 20 : 24} color={colors.primary} />
              <Text style={[
                styles.sectionTitle, 
                { 
                  color: colors.text,
                  fontSize: fontSize,
                }
              ]}>Receipt</Text>
            </View>
            <Text style={[
              styles.sectionValue, 
              { 
                color: colors.textSecondary,
                fontSize: fontSize,
              }
            ]}>
              Attach receipt (optional)
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Category Picker Modal */}
        <Modal
          visible={showCategoryPicker}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            <View style={[
              styles.modalHeader, 
              { 
                borderBottomColor: colors.border,
                paddingHorizontal: contentPadding,
              }
            ]}>
              <TouchableOpacity 
                onPress={() => setShowCategoryPicker(false)}
                style={{ padding: 4 }}
              >
                <X size={isSmallScreen ? 20 : 24} color={colors.text} />
              </TouchableOpacity>
              <Text style={[
                styles.modalTitle, 
                { 
                  color: colors.text,
                  fontSize: titleFontSize,
                }
              ]}>
                Select Category
              </Text>
              <View style={{ width: isSmallScreen ? 20 : 24 }} />
            </View>
            
            <ScrollView 
              style={styles.modalContent}
              contentContainerStyle={{
                paddingHorizontal: contentPadding,
                paddingTop: isSmallScreen ? 16 : 20,
              }}
            >
              {filteredCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    { backgroundColor: colors.surface },
                    selectedCategory === category.id && { backgroundColor: colors.primary + '15' },
                    { 
                      padding: sectionPadding,
                      marginBottom: isSmallScreen ? 6 : 8,
                    }
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.id);
                    setShowCategoryPicker(false);
                  }}
                >
                  <category.icon size={isSmallScreen ? 20 : 24} color={category.color} />
                  <Text style={[
                    styles.categoryName, 
                    { 
                      color: colors.text,
                      fontSize: fontSize,
                    }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>

        {/* Account Picker Modal */}
        <Modal
          visible={showAccountPicker}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
            <View style={[
              styles.modalHeader, 
              { 
                borderBottomColor: colors.border,
                paddingHorizontal: contentPadding,
              }
            ]}>
              <TouchableOpacity 
                onPress={() => setShowAccountPicker(false)}
                style={{ padding: 4 }}
              >
                <X size={isSmallScreen ? 20 : 24} color={colors.text} />
              </TouchableOpacity>
              <Text style={[
                styles.modalTitle, 
                { 
                  color: colors.text,
                  fontSize: titleFontSize,
                }
              ]}>
                Select Account
              </Text>
              <View style={{ width: isSmallScreen ? 20 : 24 }} />
            </View>
            
            <ScrollView 
              style={styles.modalContent}
              contentContainerStyle={{
                paddingHorizontal: contentPadding,
                paddingTop: isSmallScreen ? 16 : 20,
              }}
            >
              {accounts.map((account) => (
                <TouchableOpacity
                  key={account.id}
                  style={[
                    styles.accountItem,
                    { backgroundColor: colors.surface },
                    selectedAccount === account.id && { backgroundColor: colors.primary + '15' },
                    { 
                      padding: sectionPadding,
                      marginBottom: isSmallScreen ? 6 : 8,
                    }
                  ]}
                  onPress={() => {
                    setSelectedAccount(account.id);
                    setShowAccountPicker(false);
                  }}
                >
                  <Wallet size={isSmallScreen ? 20 : 24} color={colors.primary} />
                  <View style={styles.accountInfo}>
                    <Text style={[
                      styles.accountName, 
                      { 
                        color: colors.text,
                        fontSize: fontSize,
                      }
                    ]}>
                      {account.name}
                    </Text>
                    <Text style={[
                      styles.accountBalance, 
                      { 
                        color: colors.textSecondary,
                        fontSize: isSmallScreen ? 12 : 14,
                      }
                    ]}>
                      ${account.balance.toLocaleString('en-US')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 8,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    position: 'relative',
  },
  headerTitle: {
    fontWeight: '600',
  },
  saveButton: {
    position: 'absolute',
    right: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  typeToggle: {
    flexDirection: 'row',
    borderRadius: 12,
  },
  typeButton: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonText: {
    fontWeight: '600',
  },
  amountSection: {
    borderRadius: 12,
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontWeight: '700',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontWeight: '700',
  },
  section: {
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sectionValue: {
    fontWeight: '500',
  },
  noteInput: {
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    gap: 16,
  },
  categoryName: {
    fontWeight: '600',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    gap: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  accountBalance: {
    fontWeight: '500',
  },
});