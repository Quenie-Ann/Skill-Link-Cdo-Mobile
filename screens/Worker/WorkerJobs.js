// screens/Worker/WorkerJobs.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/colors';

const MOCK_JOBS = [
  { id: 1, title: 'Pipe Leak Repair',      status: 'COMPLETED',   service: 'Plumbing',   zone: 'Zone 1, Bulua', date: '2/25/2026', rate: 450,  rating: 5 },
  { id: 2, title: 'Circuit Breaker Fix',    status: 'COMPLETED',   service: 'Electrical', zone: 'Zone 4, Bulua', date: '2/22/2026', rate: 600,  rating: 4 },
  { id: 3, title: 'Cabinet Installation',   status: 'COMPLETED',   service: 'Carpentry',  zone: 'Zone 3, Bulua', date: '2/20/2026', rate: 800,  rating: 5 },
  { id: 4, title: 'Bathroom Tile Grouting', status: 'CANCELLED',   service: 'Plumbing',   zone: 'Zone 6, Bulua', date: '2/18/2026', rate: null, rating: null },
  { id: 5, title: 'Outlet Replacement',     status: 'COMPLETED',   service: 'Electrical', zone: 'Zone 4, Bulua', date: '2/15/2026', rate: 450,  rating: 4 },
  { id: 6, title: 'Roof Gutter Repair',     status: 'IN_PROGRESS', service: 'Carpentry',  zone: 'Zone 10, Bulua', date: '2/10/2026', rate: 700, rating: null },
];

const STATUS_CONFIG = {
  COMPLETED:   { label: 'Completed',   color: '#059669', bg: '#d1fae5' },
  CANCELLED:   { label: 'Cancelled',   color: '#dc2626', bg: '#fee2e2' },
  IN_PROGRESS: { label: 'In Progress', color: '#7c3aed', bg: '#ede9fe' },
};

export default function WorkerJobs() {
  const insets = useSafeAreaInsets();
  const totalEarned = MOCK_JOBS.filter(j => j.status === 'COMPLETED').reduce((sum, j) => sum + (j.rate || 0), 0);
  const completed = MOCK_JOBS.filter(j => j.status === 'COMPLETED').length;
  const avgRating = (MOCK_JOBS.filter(j => j.rating).reduce((sum, j) => sum + j.rating, 0) / MOCK_JOBS.filter(j => j.rating).length).toFixed(1);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBg, paddingTop: insets.top }}>
      {/* HEADER */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.cardBg, borderBottomWidth: 1, borderBottomColor: Colors.borderBase }}>
        <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.skillPrimary }}>My Jobs</Text>
        <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.skillPrimary, opacity: 0.6, letterSpacing: 2 }}>JOB HISTORY</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* STATS */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, backgroundColor: Colors.skillDark, borderRadius: 12, padding: 16 }}>
            <Text style={{ fontSize: 11, color: Colors.skillPrimary, fontWeight: '700' }}>TOTAL EARNED</Text>
            <Text style={{ fontSize: 24, fontWeight: '900', color: 'white', marginTop: 4 }}>₱{totalEarned.toLocaleString()}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.skillPrimary} />
            <Text style={{ fontSize: 24, fontWeight: '900', color: Colors.textDark }}>{completed}</Text>
            <Text style={{ fontSize: 10, color: '#9ca3af', fontWeight: '700' }}>COMPLETED</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="star" size={24} color="#f59e0b" />
            <Text style={{ fontSize: 24, fontWeight: '900', color: Colors.textDark }}>{avgRating}</Text>
            <Text style={{ fontSize: 10, color: '#9ca3af', fontWeight: '700' }}>AVG RATING</Text>
          </View>
        </View>

        {/* JOB LIST */}
        <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.textMuted }}>{MOCK_JOBS.length} Jobs Found</Text>
        {MOCK_JOBS.map((job) => {
          const s = STATUS_CONFIG[job.status];
          return (
            <View key={job.id} style={{ backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.textDark }}>{job.title}</Text>
                    <View style={{ backgroundColor: s.bg, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 }}>
                      <Text style={{ fontSize: 9, fontWeight: '800', color: s.color }}>{s.label.toUpperCase()}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 11, color: '#9ca3af' }}>⚙ {job.service}</Text>
                    <Text style={{ fontSize: 11, color: '#9ca3af' }}>📍 {job.zone}</Text>
                    <Text style={{ fontSize: 11, color: '#9ca3af' }}>📅 {job.date}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  {job.rate
                    ? <Text style={{ fontSize: 14, fontWeight: '800', color: Colors.textDark }}>₱{job.rate}</Text>
                    : <Text style={{ fontSize: 14, color: '#9ca3af' }}>—</Text>}
                  {job.rating && <Text style={{ fontSize: 11, color: '#f59e0b' }}>{'★'.repeat(job.rating)}</Text>}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}