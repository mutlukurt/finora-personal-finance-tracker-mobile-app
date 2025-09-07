import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface SegmentedControlProps {
  options: string[];
  selectedOption: string;
  onOptionPress: (option: string) => void;
}

export function SegmentedControl({ options, selectedOption, onOptionPress }: SegmentedControlProps) {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.segment,
            {
              backgroundColor: selectedOption === option ? colors.primary : 'transparent',
            },
          ]}
          onPress={() => onOptionPress(option)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.segmentText,
              {
                color: selectedOption === option ? colors.surface : colors.text,
              },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
});