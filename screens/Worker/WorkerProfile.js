// screens/Worker/WorkerProfile.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/colors';

const MOCK_WORKER = {
  full_name: 'Juan Dela Cruz',
  service: 'Plumbing',
  phone: '09171234567',
  address: 'Zone 1, Bulua, CDO',
  bio: 'Experienced plumber with 5+ years of residential and commercial experience.',
  experience: '5 years',
  daily_rate: 650,
  availability: 'Weekdays',
  skills: ['Plumbing', 'Pipe Fitting', 'Water Heater'],
  rating: 4.8,
  jobs_done: 12,
  is_verified: true,
  documents: [
    { label: 'Government ID',     status: 'SUBMITTED' },
    { label: 'Barangay Clearance', status: 'SUBMITTED' },
    { label: 'Account Status',    status: 'VERIFIED'  },
  ],
  schedule: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
};

const DOC_CONFIG = {
  SUBMITTED: { color: '#2563eb', bg: '#dbeafe' },
  VERIFIED:  { color: '#059669', bg: '#d1fae5' },
};

export default function WorkerProfile({ navigation }) {
  const insets = useSafeAreaInsets();
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBg, paddingTop: insets.top }}>
      {/* HEADER */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.cardBg, borderBottomWidth: 1, borderBottomColor: Colors.borderBase }}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.skillPrimary }}>My Profile</Text>
          <Text style={{ fontSize: 9, fontWeight: '700', color: Colors.skillPrimary, opacity: 0.6, letterSpacing: 2 }}>WORKER PROFILE</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#fecaca', backgroundColor: '#fef2f2' }}>
          <Ionicons name="log-out-outline" size={16} color="#dc2626" />
          <Text style={{ fontSize: 12, fontWeight: '700', color: '#dc2626' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>

        {/* PROFILE CARD */}
        <View style={{ backgroundColor: Colors.skillDark, borderRadius: 16, padding: 24, alignItems: 'center' }}>
          <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.skillPrimary + '33', borderWidth: 2, borderColor: Colors.skillPrimary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Ionicons name="person" size={36} color={Colors.skillPrimary} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '900', color: 'white' }}>{MOCK_WORKER.full_name}</Text>
          <Text style={{ fontSize: 11, color: Colors.skillPrimary, fontWeight: '700', letterSpacing: 1, marginTop: 2 }}>SKILLED WORKER</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, backgroundColor: Colors.skillPrimary + '22', borderWidth: 1, borderColor: Colors.skillPrimary + '44', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 }}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.skillPrimary} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.skillPrimary }}>Barangay Verified</Text>
          </View>

          {/* Quick Stats */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' }}>
            {[
              { label: 'YRS EXP',   value: '5'                        },
              { label: 'RATING',    value: `${MOCK_WORKER.rating} ⭐`  },
              { label: 'RATE/DAY',  value: `₱${MOCK_WORKER.daily_rate}` },
              { label: 'JOBS DONE', value: MOCK_WORKER.jobs_done       },
            ].map(({ label, value }) => (
              <View key={label} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: '900', color: 'white' }}>{value}</Text>
                <Text style={{ fontSize: 8, color: Colors.skillPrimary, fontWeight: '700', letterSpacing: 1, marginTop: 2 }}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* DOCUMENTS */}
        <View style={{ backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#9ca3af', letterSpacing: 1, marginBottom: 12 }}>DOCUMENTS & VERIFICATION</Text>
          {MOCK_WORKER.documents.map(({ label, status }) => {
            const d = DOC_CONFIG[status];
            return (
              <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.borderBase }}>
                <Text style={{ fontSize: 13, color: Colors.textDark, fontWeight: '500' }}>{label}</Text>
                <View style={{ backgroundColor: d.bg, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 }}>
                  <Text style={{ fontSize: 10, fontWeight: '800', color: d.color }}>✓ {status}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* PERSONAL INFO */}
        <View style={{ backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#9ca3af', letterSpacing: 1, marginBottom: 12 }}>PERSONAL INFORMATION</Text>
          {[
            { label: 'Full Name',    value: MOCK_WORKER.full_name  },
            { label: 'Phone Number', value: MOCK_WORKER.phone      },
            { label: 'Address',      value: MOCK_WORKER.address    },
            { label: 'Bio',          value: MOCK_WORKER.bio        },
          ].map(({ label, value }) => (
            <View key={label} style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#9ca3af', letterSpacing: 1 }}>{label.toUpperCase()}</Text>
              <Text style={{ fontSize: 14, color: Colors.textDark, fontWeight: '500', marginTop: 2 }}>{value}</Text>
            </View>
          ))}
        </View>

        {/* SERVICE DETAILS */}
        <View style={{ backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#9ca3af', letterSpacing: 1, marginBottom: 12 }}>SERVICE DETAILS</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
            {[
              { label: 'EXPERIENCE', value: MOCK_WORKER.experience },
              { label: 'DAILY RATE', value: `₱${MOCK_WORKER.daily_rate}/day` },
              { label: 'AVAILABILITY', value: MOCK_WORKER.availability },
            ].map(({ label, value }) => (
              <View key={label} style={{ flex: 1, backgroundColor: Colors.pageBg, borderRadius: 8, padding: 10, borderWidth: 1, borderColor: Colors.borderBase }}>
                <Text style={{ fontSize: 9, fontWeight: '700', color: '#9ca3af', letterSpacing: 1 }}>{label}</Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.textDark, marginTop: 2 }}>{value}</Text>
              </View>
            ))}
          </View>
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#9ca3af', letterSpacing: 1, marginBottom: 8 }}>SKILLS</Text>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {MOCK_WORKER.skills.map((skill) => (
              <View key={skill} style={{ backgroundColor: Colors.emerald100, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: Colors.skillDark }}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* WEEKLY SCHEDULE */}
        <View style={{ backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#9ca3af', letterSpacing: 1, marginBottom: 12 }}>WEEKLY SCHEDULE</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {days.map((day) => {
              const active = MOCK_WORKER.schedule.includes(day);
              return (
                <View key={day} style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8, backgroundColor: active ? Colors.skillPrimary : Colors.pageBg, borderWidth: 1, borderColor: active ? Colors.skillPrimary : Colors.borderBase }}>
                  <Text style={{ fontSize: 9, fontWeight: '800', color: active ? 'white' : '#9ca3af' }}>{day}</Text>
                  {active && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'white', marginTop: 4 }} />}
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}