// screens/Worker/WorkerProfile.js — minimalist redesign
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { workerApi } from '../../services/api';

const PRIMARY = '#10B981';
const DARK    = '#1A2E3B';
const MUTED   = '#6B7280';
const LIGHT   = '#F9FAFB';

const DAYS     = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TO_FULL  = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const TO_SHORT = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

export default function WorkerProfile({ route }) {
  const insets = useSafeAreaInsets();
  const [profile,   setProfile]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [draft,     setDraft]     = useState(null);

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await workerApi.getProfile();
      const norm = {
        ...data,
        experience_years:      data.years_experience ?? 0,
        daily_rate:            data.declared_rate    ?? 0,
        phone:                 data.contact_number   ?? '',
        service:               data.skill_category_name ?? '—',
        availability_schedule: (data.availability_schedule || []).map(d => TO_SHORT[d] ?? d),
      };
      setProfile(norm); setDraft(norm);
    } catch (err) { Alert.alert('Error', err.message); }
    finally { setLoading(false); }
  }

  function toggleDay(day) {
    setDraft(p => ({
      ...p,
      availability_schedule: p.availability_schedule.includes(day)
        ? p.availability_schedule.filter(d => d !== day)
        : [...p.availability_schedule, day],
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const fullDays = (draft.availability_schedule || []).map(d => TO_FULL[d] ?? d);
      await Promise.all([
        workerApi.updateProfile({ bio: draft.bio, contact_number: draft.phone }),
        workerApi.updateAvailability(fullDays),
      ]);
      setProfile({ ...draft }); setIsEditing(false);
      Alert.alert('Saved!', 'Your profile has been updated.');
    } catch (err) { Alert.alert('Error', err.message); }
    finally { setSaving(false); }
  }

  if (loading) return <View style={s.center}><ActivityIndicator size="large" color={PRIMARY} /></View>;

  const sched = isEditing ? draft.availability_schedule : profile.availability_schedule;

  return (
    <View style={s.root}>
      <StatusBar style="light" />
      <LinearGradient colors={[DARK, '#0D2233']} style={[s.header, { paddingTop: insets.top + 12 }]}>
        <View style={s.headerRow}>
          <Text style={s.headerTitle}>My Profile</Text>
          {isEditing ? (
            <View style={s.headerRight}>
              <TouchableOpacity onPress={() => { setDraft({ ...profile }); setIsEditing(false); }} style={s.cancelBtn}>
                <Text style={s.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} disabled={saving} style={s.saveBtn}>
                {saving ? <ActivityIndicator size="small" color="#fff" /> : <Text style={s.saveText}>Save</Text>}
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={s.editBtn}>
              <Ionicons name="create-outline" size={16} color={PRIMARY} />
              <Text style={s.editText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Avatar + name */}
        <View style={s.avatarRow}>
          <View style={s.avatar}>
            <Ionicons name="person" size={32} color={PRIMARY} />
          </View>
          <View>
            <Text style={s.profileName}>{profile.full_name}</Text>
            <View style={s.serviceRow}>
              <Text style={s.serviceText}>{profile.service} Specialist</Text>
              {profile.is_verified && <Ionicons name="checkmark-circle" size={13} color={PRIMARY} />}
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={s.statRow}>
          {[
            { v: profile.experience_years + ' yrs', l: 'Experience' },
            { v: `₱${profile.daily_rate}`,           l: 'Daily Rate' },
            { v: profile.avg_rating > 0 ? `${parseFloat(profile.avg_rating).toFixed(1)}★` : '—', l: 'Rating' },
          ].map(({ v, l }) => (
            <View key={l} style={s.statPill}>
              <Text style={s.statVal}>{v}</Text>
              <Text style={s.statLbl}>{l}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 90 }]} showsVerticalScrollIndicator={false}>

        {/* Personal Info */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Personal Information</Text>
          {[
            { icon: 'mail-outline',     label: 'Email',   value: profile.email,   editable: false },
            { icon: 'location-outline', label: 'Address', value: profile.address, editable: false },
          ].map(({ icon, label, value }) => (
            <View key={label} style={s.infoRow}>
              <View style={s.infoIcon}><Ionicons name={icon} size={15} color={PRIMARY} /></View>
              <View style={s.infoContent}>
                <Text style={s.infoLabel}>{label}</Text>
                <Text style={s.infoValue}>{value || '—'}</Text>
              </View>
            </View>
          ))}

          {/* Phone — editable */}
          <View style={s.infoRow}>
            <View style={s.infoIcon}><Ionicons name="call-outline" size={15} color={PRIMARY} /></View>
            <View style={s.infoContent}>
              <Text style={s.infoLabel}>Phone</Text>
              {isEditing
                ? <TextInput value={draft.phone} onChangeText={v => setDraft(p => ({ ...p, phone: v }))} keyboardType="phone-pad" style={s.input} placeholder="09XX-XXX-XXXX" />
                : <Text style={s.infoValue}>{profile.phone || '—'}</Text>
              }
            </View>
          </View>

          {/* Bio — editable */}
          <View style={s.infoRow}>
            <View style={s.infoIcon}><Ionicons name="document-text-outline" size={15} color={PRIMARY} /></View>
            <View style={s.infoContent}>
              <Text style={s.infoLabel}>Bio</Text>
              {isEditing
                ? <TextInput value={draft.bio ?? ''} onChangeText={v => setDraft(p => ({ ...p, bio: v }))} multiline numberOfLines={3} style={[s.input, { textAlignVertical: 'top', minHeight: 72 }]} placeholder="Tell residents about yourself..." />
                : <Text style={s.infoValue}>{profile.bio || 'No bio added yet.'}</Text>
              }
            </View>
          </View>
        </View>

        {/* Weekly Schedule */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Weekly Schedule</Text>
          {isEditing && <Text style={s.scheduleSub}>Tap a day to toggle.</Text>}
          <View style={s.daysRow}>
            {DAYS.map(day => {
              const active = (sched || []).includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => isEditing && toggleDay(day)}
                  disabled={!isEditing}
                  style={[s.dayBtn, active && s.dayBtnActive]}
                >
                  <Text style={[s.dayText, active && s.dayTextActive]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={s.scheduleNote}>
            {!sched?.length ? 'No days selected'
              : sched.length === 7 ? 'Available every day'
              : `Available on: ${sched.join(', ')}`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: LIGHT },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },
  headerRight: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  cancelBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  cancelText: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '700' },
  saveBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, backgroundColor: PRIMARY },
  saveText: { color: '#fff', fontSize: 13, fontWeight: '800' },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: PRIMARY + '20', borderWidth: 1, borderColor: PRIMARY + '40' },
  editText: { color: PRIMARY, fontSize: 13, fontWeight: '800' },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  avatar: { width: 56, height: 56, borderRadius: 16, backgroundColor: PRIMARY + '20', justifyContent: 'center', alignItems: 'center' },
  profileName: { color: '#fff', fontSize: 17, fontWeight: '900' },
  serviceRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  serviceText: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
  statRow: { flexDirection: 'row', gap: 8 },
  statPill: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 10, alignItems: 'center' },
  statVal: { color: '#fff', fontSize: 13, fontWeight: '900' },
  statLbl: { color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  scroll: { padding: 16 },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: MUTED, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 },
  infoRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  infoIcon: { padding: 8, backgroundColor: PRIMARY + '10', borderRadius: 10, height: 35, justifyContent: 'center', alignItems: 'center' },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 9, color: MUTED, fontWeight: '800', textTransform: 'uppercase', marginBottom: 3 },
  infoValue: { fontSize: 13, color: DARK, fontWeight: '500', lineHeight: 18 },
  input: { borderWidth: 1.5, borderColor: PRIMARY, borderRadius: 8, padding: 8, fontSize: 13, color: DARK, backgroundColor: LIGHT },
  scheduleSub: { fontSize: 11, color: MUTED, marginBottom: 10 },
  daysRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 10 },
  dayBtn: { flex: 1, minWidth: 36, paddingVertical: 9, borderRadius: 10, alignItems: 'center', backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  dayBtnActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  dayText: { fontSize: 10, fontWeight: '800', color: MUTED },
  dayTextActive: { color: '#fff' },
  scheduleNote: { fontSize: 10, color: MUTED, marginTop: 4 },
});
