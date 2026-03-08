// components/StatusBadge.js
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/StatusBadge.styles';
import Colors from '../styles/colors';

const STATUS_CONFIG = {
  pending:     { label: 'Pending',     color: Colors.statusPendingColor,   bg: Colors.statusPendingBg,   icon: 'time-outline'             },
  matched:     { label: 'Matched',     color: Colors.statusMatchedColor,   bg: Colors.statusMatchedBg,   icon: 'person-outline'           },
  in_progress: { label: 'In Progress', color: Colors.statusProgressColor,  bg: Colors.statusProgressBg,  icon: 'reload-outline'           },
  completed:   { label: 'Completed',   color: Colors.statusCompletedColor, bg: Colors.statusCompletedBg, icon: 'checkmark-circle-outline' },
  cancelled:   { label: 'Cancelled',   color: Colors.statusCancelledColor, bg: Colors.statusCancelledBg, icon: 'close-circle-outline'     },
};

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Ionicons name={cfg.icon} size={11} color={cfg.color} />
      <Text style={[styles.label, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}