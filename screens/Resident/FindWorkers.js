// screens/Resident/FindWorkers.js
// ML match results screen — shown after a resident completes the 3-step booking flow.
// Displays:
//   - ML match results banner (service, problem, location from the submitted request)
//   - Category filter tabs (All + 5 SRS trade filters)
//   - Ranked WorkerCard list (sorted by ml_score desc)
//   - Send Offer action with per-worker sent state
//
// Navigation params expected:
//   request  {object} — the submitted request object from BookingModal (has .service, .issue, .address)

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Animated, FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import WorkerCard from '../../components/resident/WorkerCard';
import { SERVICE_CATEGORIES } from '../../constants/services';
import { MOCK_WORKERS } from '../../constants/staticData';
import styles from '../../styles/FindWorkers.styles';
import Colors from '../../styles/colors';

// "All" tab entry — prepended to the service category list
const ALL_TAB = { value: 'all', label: 'All' };

export default function FindWorkers({ route, navigation }) {
  const insets  = useSafeAreaInsets();
  const request = route.params?.request ?? {
    service:         'plumbing',
    issue:           'Leaking pipe or faucet',
    address:         'Bulua, CDO',
    preferred_start: 'Today',
    budget:          'Under ₱300/day',
  };

  const [activeFilter, setActiveFilter] = useState('all');
  const [sentOffers,   setSentOffers]   = useState({}); // { workerId: true }

  // Entrance animations
  const bannerAnim = useRef(new Animated.Value(0)).current;
  const listAnim   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.spring(bannerAnim, { toValue: 1, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(listAnim,   { toValue: 1, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start();
  }, []);

  const makeSlide = anim => ({
    opacity: anim,
    transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
  });

  // Filter + sort workers: active filter → sort by ml_score descending
  const filteredWorkers = useMemo(() => {
    const pool = activeFilter === 'all'
      ? MOCK_WORKERS
      : MOCK_WORKERS.filter(w => w.service === activeFilter);
    return [...pool].sort((a, b) => b.ml_score - a.ml_score);
  }, [activeFilter]);

  // The filter tabs: All + only trades that have at least one worker in the pool
  const filterTabs = useMemo(() => {
    const tradesInPool = new Set(MOCK_WORKERS.map(w => w.service));
    const tradeTabs = SERVICE_CATEGORIES.filter(c => tradesInPool.has(c.value));
    return [ALL_TAB, ...tradeTabs];
  }, []);

  function handleSendOffer(worker) {
    setSentOffers(prev => ({ ...prev, [worker.id]: true }));
  }

  // Derived display strings for the banner
  const serviceCat = SERVICE_CATEGORIES.find(c => c.value === request.service);
  const bannerService = `${serviceCat?.label ?? request.service} · ${request.issue}`;
  const bannerMeta    = `Workers ranked by ML score · ${request.address}`;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* ── Header bar ── */}
      <View style={[styles.headerBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.75}
        >
          <Ionicons name="chevron-back" size={20} color={Colors.textBody} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matched Workers</Text>
        <View style={styles.workerCountBadge}>
          <Text style={styles.workerCountText}>{filteredWorkers.length} workers</Text>
        </View>
      </View>

      {/* ── ML results banner ── */}
      <Animated.View style={[styles.mlBanner, makeSlide(bannerAnim)]}>
        <View style={styles.mlIconWrap}>
          <Ionicons name="sparkles" size={16} color="#fff" />
        </View>
        <View style={styles.mlInfo}>
          <Text style={styles.mlLabel}>ML MATCH RESULTS</Text>
          <Text style={styles.mlServiceStr} numberOfLines={1}>{bannerService}</Text>
          <Text style={styles.mlMeta}>{bannerMeta}</Text>
          <TouchableOpacity
            style={styles.mlBackLink}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={13} color={Colors.skillPrimary} />
            <Text style={styles.mlBackText}>Back to My Requests</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* ── Filter tab bar ── */}
      <View style={styles.filterWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterTabs.map(tab => {
            const isActive = activeFilter === tab.value;
            const cat = SERVICE_CATEGORIES.find(c => c.value === tab.value);
            return (
              <TouchableOpacity
                key={tab.value}
                style={[styles.filterTab, isActive && styles.filterTabActive]}
                onPress={() => setActiveFilter(tab.value)}
                activeOpacity={0.75}
              >
                {cat && (
                  <Ionicons
                    name={cat.icon}
                    size={13}
                    color={isActive ? Colors.skillPrimary : Colors.textMuted}
                  />
                )}
                <Text style={[styles.filterTabText, isActive && styles.filterTabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Worker list ── */}
      <Animated.View style={[{ flex: 1 }, makeSlide(listAnim)]}>
        {filteredWorkers.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={40} color={Colors.borderBase} />
            <Text style={styles.emptyText}>No workers found</Text>
            <Text style={styles.emptySubText}>Try a different filter.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredWorkers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <WorkerCard
                worker={item}
                onOffer={handleSendOffer}
                offerSent={!!sentOffers[item.id]}
              />
            )}
            contentContainerStyle={[
              styles.scroll,
              { paddingTop: 12, paddingBottom: insets.bottom + 32 },
            ]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Animated.View>

    </View>
  );
}