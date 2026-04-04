// components/resident/WorkerCard.js
// Displays a single ML-ranked worker result.
// Shows avatar initial, verified badge, trade, ML match %,
// skill tags, location/availability meta, stats, daily rate,
// and a Send Offer button that transitions to a sent state.
//
// Props:
//   worker    {object}   — worker data from MOCK_WORKERS / API
//   onOffer   {function} — called with worker object when offer is sent
//   offerSent {boolean}  — when true, shows the "Offer Sent" confirmation state

import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { SERVICE_CATEGORIES } from '../../constants/services';
import styles from '../../styles/WorkerCard.styles';
import Colors from '../../styles/colors';

// Maximum skill tags to show before "+N more"
const MAX_TAGS = 3;

// Derive avatar background color from service trade
const AVATAR_COLORS = {
  plumbing:   ['#0ea5e9', '#0284c7'],
  electrical: ['#f59e0b', '#d97706'],
  carpentry:  ['#d97706', '#b45309'],
  mason:      ['#10b981', '#059669'],
  welding:    ['#14b8a6', '#0d9488'],
};

export default function WorkerCard({ worker, onOffer, offerSent }) {
  const cat = SERVICE_CATEGORIES.find(c => c.value === worker.service);
  const avatarColors = AVATAR_COLORS[worker.service] ?? [Colors.skillDark, Colors.skillPrimary];
  const initial = worker.full_name.charAt(0).toUpperCase();

  const visibleTags  = worker.skills.slice(0, MAX_TAGS);
  const extraCount   = worker.skills.length - MAX_TAGS;

  return (
    <View style={styles.card}>

      {/* ── Top row: avatar + name block + ML badge ── */}
      <View style={styles.topRow}>
        {/* Avatar */}
        <LinearGradient
          colors={avatarColors}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.avatarInitial}>{initial}</Text>
        </LinearGradient>

        {/* Name + verified + trade */}
        <View style={styles.nameBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.workerName}>{worker.full_name}</Text>
            {worker.verified && (
              <Ionicons name="checkmark-circle" size={16} color={Colors.skillPrimary} />
            )}
          </View>
          <View style={[styles.tradeBadge, { backgroundColor: cat?.bg ?? Colors.skillLight }]}>
            <Text style={[styles.tradeText, { color: cat?.color ?? Colors.skillDark }]}>
              {cat?.label ?? worker.service}
            </Text>
          </View>
        </View>

        {/* ML match % */}
        <View style={styles.mlBadge}>
          <Ionicons name="trending-up-outline" size={12} color={Colors.skillPrimary} />
          <Text style={styles.mlPercent}>{worker.ml_score}%</Text>
        </View>
      </View>

      {/* ── Skill tags ── */}
      <View style={styles.tagsRow}>
        {visibleTags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {extraCount > 0 && (
          <View style={styles.tagMore}>
            <Text style={styles.tagMoreText}>+{extraCount}</Text>
          </View>
        )}
      </View>

      {/* ── Meta: location · availability ── */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={13} color={Colors.textMuted} />
          <Text style={styles.metaText}>{worker.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={13} color={Colors.textMuted} />
          <Text style={styles.metaText}>Available: {worker.availability}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* ── Footer: stats · rate · CTA ── */}
      <View style={styles.footerRow}>

        {/* Stats */}
        <View style={styles.statsBlock}>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-done-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.statText}>
              {worker.jobs_done} job{worker.jobs_done !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="briefcase-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.statText}>{worker.years_exp} yr exp</Text>
          </View>
          {worker.rating != null && (
            <View style={styles.statItem}>
              <Ionicons name="star" size={12} color={Colors.amber} />
              <Text style={styles.statText}>{worker.rating}</Text>
            </View>
          )}
        </View>

        {/* Daily rate */}
        <View style={styles.rateBlock}>
          <Text style={styles.rateLabel}>RATE</Text>
          <Text style={styles.rateValue}>
            ₱{worker.daily_rate}
            <Text style={styles.rateUnit}>/day</Text>
          </Text>
        </View>

        {/* Send Offer / Sent */}
        {offerSent ? (
          <View style={styles.offerSentBtn}>
            <Ionicons name="checkmark-circle" size={15} color={Colors.skillPrimary} />
            <Text style={styles.offerSentText}>Offer Sent</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.offerBtn}
            onPress={() => onOffer(worker)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.skillPrimary, Colors.emerald700]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.offerBtnGrad}
            >
              <Text style={styles.offerBtnText}>Send Offer</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}