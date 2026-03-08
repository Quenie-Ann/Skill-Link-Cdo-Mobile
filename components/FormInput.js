// components/FormInput.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/FormInput.styles';
import Colors from '../styles/colors';

export default function FormInput({ icon, error, secureEntry = false, ...rest }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const borderColor = error
    ? Colors.errorText
    : isFocused
    ? Colors.skillPrimary
    : Colors.borderInput;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, { borderColor }, isFocused && styles.inputRowFocused]}>
        <Ionicons
          name={icon}
          size={18}
          color={error ? Colors.errorText : isFocused ? Colors.skillPrimary : Colors.textMuted}
          style={styles.iconLeft}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          selectionColor={Colors.skillPrimary}
          secureTextEntry={secureEntry && !isVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={()  => setIsFocused(false)}
          {...rest}
        />
        {secureEntry && (
          <TouchableOpacity onPress={() => setIsVisible((v) => !v)} activeOpacity={0.7} style={styles.eyeBtn}>
            <Ionicons
              name={isVisible ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle-outline" size={13} color={Colors.errorText} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}