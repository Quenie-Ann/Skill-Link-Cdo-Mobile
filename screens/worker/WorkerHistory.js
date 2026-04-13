// screens/Worker/WorkerHistory.js — minimalist redesign
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { workerApi } from '../../services/api';

const PRIMARY = '#10B981';
const DARK    = '#1A2E3B';
const MUTED   = '#6B7280';
const LIGHT   = '#F9FAFB';

const STATUS_CFG = {
  completed:   { label: 'Completed',   color: PRIMARY,    bg: '#ECFDF5', icon: 'checkmark-circle' },
  in_progress: { label: 'In Progress', color: '#3B82F6',  bg: '#EFF6FF', icon: 'time'             },
  cancelled:   { label: 'Cancelled',   color: '#EF4444',  bg: '#FEF2F2', icon: 'close-circle'     },
};

export default function WorkerHistory() {
  const insets = useSafeAreaInsets();
  const [jobs,       setJobs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error,      setError]      = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      setLoading(true); setError(null);
      const data = await workerApi.getJobHistory();
      setJobs((data || []).map(o => ({
        id:       o.id,
        title:    o.request_title    ?? 'Job Request',
        service:  o.category_name   ?? '—',
        location: o.request_location ?? '—',
        resident: o.resident_name   ?? '—',
        date:     o.created_at,
        status:   o.request_status === 'completed' ? 'completed'
                : o.status === 'accepted'           ? 'in_progress'
                : 'cancelled',
      })));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); setRefreshing(false); }
  }

  const completed = jobs.filter(j => j.status === 'completed').length;

  function renderJob({ item }) {
    const cfg = STATUS_CFG[item.status] || STATUS_CFG.cancelled;
    return (
      <View style={s.jobCard}>
        <View style={[s.jobIcon, { backgroundColor: cfg.bg }]}>
          <Ionicons name={cfg.icon} size={20} color={cfg.color} />
        </View>
        <View style={s.jobInfo}>
          <Text style={s.jobTitle}>{item.title}</Text>
          <Text style={s.jobMeta}>{item.service} · {item.resident}</Text>
          <View style={s.jobFooter}>
            <View style={[s.statusBadge, { backgroundColor: cfg.bg }]}>
              <Text style={[s.statusText, { color: cfg.color }]}>{cfg.label}</Text>
            </View>
            {item.date && (
              <Text style={s.dateText}>
                {new Date(item.date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={s.root}>
      <StatusBar style="light" />
      <LinearGradient colors={[DARK, '#0D2233']} style={[s.header, { paddingTop: insets.top + 12 }]}>
        <Text style={s.headerSub}>WORKER PORTAL</Text>
        <Text style={s.headerTitle}>My Jobs</Text>
        <View style={s.statRow}>
          {[
            { v: jobs.length, l: 'Total'    },
            { v: completed,   l: 'Completed' },
          ].map(({ v, l }) => (
            <View key={l} style={s.statPill}>
              <Text style={s.statVal}>{v}</Text>
              <Text style={s.statLbl}>{l}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {loading ? (
        <View style={s.center}><ActivityIndicator size="large" color={PRIMARY} /></View>
      ) : error ? (
        <View style={s.center}>
          <Ionicons name="alert-circle-outline" size={36} color="#D1D5DB" />
          <Text style={{ color: MUTED, marginTop: 10, textAlign: 'center' }}>{error}</Text>
        </View>
      ) : jobs.length === 0 ? (
        <View style={s.center}>
          <View style={s.emptyIcon}><Ionicons name="briefcase-outline" size={28} color={PRIMARY} /></View>
          <Text style={s.emptyTitle}>No jobs yet</Text>
          <Text style={s.emptySub}>Completed jobs will appear here.</Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => String(item.id)}
          renderItem={renderJob}
          contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 90 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={PRIMARY} />
          }
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: LIGHT },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerSub:   { color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '900', marginTop: 2, marginBottom: 16 },
  statRow:  { flexDirection: 'row', gap: 8 },
  statPill: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 12, alignItems: 'center' },
  statVal:  { color: '#fff', fontSize: 20, fontWeight: '900' },
  statLbl:  { color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  scroll:   { padding: 16 },
  jobCard:  { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', gap: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  jobIcon:  { padding: 10, borderRadius: 12 },
  jobInfo:  { flex: 1 },
  jobTitle: { fontSize: 14, fontWeight: '800', color: DARK, marginBottom: 2 },
  jobMeta:  { fontSize: 11, color: MUTED, marginBottom: 8 },
  jobFooter:    { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge:  { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusText:   { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  dateText:     { fontSize: 10, color: MUTED },
  emptyIcon:    { width: 60, height: 60, borderRadius: 30, backgroundColor: PRIMARY + '15', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  emptyTitle:   { fontSize: 16, fontWeight: '800', color: DARK, marginBottom: 6 },
  emptySub:     { fontSize: 12, color: MUTED, textAlign: 'center' },
});
