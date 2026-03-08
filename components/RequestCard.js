// components/RequestCard.js
// Reusable request card — light theme version.
// Props: req { id, title, service, status, date, worker }

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from './StatusBadge';

const SERVICE_META = {
  electrical: { icon: 'flash-outline',         color: '#d97706', bg: '#fef3c7' },
  plumbing:   { icon: 'water-outline',          color: '#2563eb', bg: '#dbeafe' },
  carpentry:  { icon: 'construct-outline',      color: '#92400e', bg: '#fef3c7' },
  painting:   { icon: 'color-palette-outline',  color: '#7c3aed', bg: '#ede9fe' },
  cleaning:   { icon: 'sparkles-outline',       color: '#0891b2', bg: '#cffafe' },
  masonry:    { icon: 'layers-outline',         color: '#065f46', bg: '#d1fae5' },
};

export default function RequestCard({ req }) {
  const meta = SERVICE_META[req.service] || SERVICE_META.electrical;
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: meta.bg }]}>
        <Ionicons name={meta.icon} size={20} color={meta.color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{req.title}</Text>
        <View style={styles.metaRow}>
          {req.worker && (
            <>
              <Ionicons name="person-outline" size={11} color="#64748b" />
              <Text style={styles.metaText}>{req.worker}</Text>
              <Text style={styles.metaDot}>·</Text>
            </>
          )}
          <Ionicons name="calendar-outline" size={11} color="#64748b" />
          <Text style={styles.metaText}>{req.date}</Text>
        </View>
      </View>
      <StatusBadge status={req.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 14, marginBottom: 10, gap: 12, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  info:     { flex: 1 },
  title:    { fontSize: 14, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  metaRow:  { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: '#64748b' },
  metaDot:  { fontSize: 11, color: '#94a3b8' },
});