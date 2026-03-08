// styles/StatusBadge.styles.js
// All styles for components/StatusBadge.js

import { StyleSheet } from 'react-native';

const StatusBadgeStyles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default StatusBadgeStyles;