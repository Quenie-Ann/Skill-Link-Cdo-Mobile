// styles/FormInput.styles.js
// All styles for components/FormInput.js

import { StyleSheet } from 'react-native';
import Colors from './colors';

const FormInputStyles = StyleSheet.create({
  wrapper: { marginBottom: 16 },

  // Mirrors web: bg-gray-50 border-2 rounded-2xl focus:border-skill-primary
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 56,
  },
  inputRowFocused: { backgroundColor: Colors.cardBg },

  iconLeft: { marginRight: 10 },

  // Mirrors web: dark:text-white outline-none
  input: {
    flex: 1,
    color: Colors.textDark,
    fontSize: 15,
    fontWeight: '500',
  },

  eyeBtn:    { padding: 4, marginLeft: 6 },
  errorRow:  { flexDirection: 'row', alignItems: 'center', marginTop: 5, gap: 4 },
  errorText: { color: Colors.errorText, fontSize: 12, marginLeft: 2 },
});

export default FormInputStyles;