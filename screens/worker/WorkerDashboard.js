// screens/Worker/WorkerDashboard.js — minimalist redesign
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { authApi, sessionService } from '../../services/api';
import { useWorkerDashboard } from '../../hooks/worker/useWorkerDashboard';

const PRIMARY = '#10B981';
const DARK    = '#1A2E3B';
const MUTED   = '#6B7280';
const LIGHT   = '#F9FAFB';

export default function WorkerDashboard({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const user   = route.params?.user ?? {};
  const db     = useWorkerDashboard();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!db.loading) Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [db.loading]);

  async function handleLogout() {
    const session = await sessionService.get();
    await authApi.logout(session?.refresh);
    navigation.replace('Login');
  }

  if (db.loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={s.loadingText}>Loading...</Text>
      </View>
    );
  }

  const profile = db.profile;

  return (
    <View style={s.root}>
      <StatusBar style="light" />
      <LinearGradient colors={[DARK, '#0D2233']} style={[s.header, { paddingTop: insets.top + 12 }]}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.headerSub}>WORKER PORTAL</Text>
            <Text style={s.headerName}>{profile?.full_name ?? 'Worker'}</Text>
          </View>
          <View style={s.headerRight}>
            <TouchableOpacity onPress={db.handleToggleOnline} style={[s.onlinePill, db.stats.is_online && s.onlinePillActive]}>
              <View style={[s.dot, db.stats.is_online && s.dotActive]} />
              <Text style={[s.onlineText, db.stats.is_online && s.onlineTextActive]}>
                {db.stats.is_online ? 'Online' : 'Offline'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={{ padding: 8 }}>
              <Ionicons name="log-out-outline" size={18} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.statRow}>
          {[
            { v: db.stats.avg_rating > 0 ? `${db.stats.avg_rating.toFixed(1)}★` : '—', l: 'Rating'     },
            { v: db.stats.total_completed,                                               l: 'Completed'  },
            { v: profile ? `₱${profile.daily_rate}` : '—',                              l: 'Daily Rate' },
          ].map(({ v, l }) => (
            <View key={l} style={s.statPill}>
              <Text style={s.statVal}>{v}</Text>
              <Text style={s.statLbl}>{l}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        contentContainerStyle={[s.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={db.loading} onRefresh={db.refresh} tintColor={PRIMARY} />}
      >
        {db.error && (
          <View style={s.errorBox}>
            <Ionicons name="alert-circle-outline" size={14} color="#DC2626" />
            <Text style={s.errorText}>{db.error}</Text>
          </View>
        )}

        {/* PENDING OFFER */}
        {db.pendingOffer ? (
          <View style={s.offerCard}>
            <LinearGradient colors={[DARK, '#0D4D38']} style={s.offerTop}>
              <View style={s.pulsRow}>
                <View style={s.pulsDot} />
                <Text style={s.pulsLbl}>NEW JOB OFFER</Text>
              </View>
              <Text style={s.offerTitle}>{db.pendingOffer.title}</Text>
              <Text style={s.offerSvc}>{db.pendingOffer.service}</Text>
              {db.pendingOffer.match_score > 0 && (
                <View style={s.scoreBadge}>
                  <Ionicons name="flash" size={10} color={PRIMARY} />
                  <Text style={s.scoreText}>{db.pendingOffer.match_score}% Match</Text>
                </View>
              )}
            </LinearGradient>
            <View style={s.offerBody}>
              {[
                { icon: 'person-outline',   val: db.pendingOffer.resident },
                { icon: 'location-outline', val: db.pendingOffer.location },
              ].map(({ icon, val }) => (
                <View key={icon} style={s.detRow}>
                  <View style={s.detIcon}><Ionicons name={icon} size={15} color={PRIMARY} /></View>
                  <Text style={s.detText}>{val}</Text>
                </View>
              ))}
              <View style={s.btnRow}>
                <TouchableOpacity onPress={db.handleDecline} disabled={db.actionLoading} style={s.btnDec}>
                  <Text style={s.btnDecText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={db.handleAccept} disabled={db.actionLoading} style={s.btnAcc}>
                  {db.actionLoading
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <><Ionicons name="checkmark-circle" size={15} color="#fff" /><Text style={s.btnAccText}>Accept</Text></>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : !db.activeJob ? (
          <View style={s.waitCard}>
            <View style={s.waitIcon}><Ionicons name="flash-outline" size={28} color={PRIMARY} /></View>
            <Text style={s.waitTitle}>Waiting for Offers</Text>
            <Text style={s.waitSub}>Stay online to receive job offers from residents.</Text>
          </View>
        ) : null}

        {/* ACTIVE JOB */}
        {db.activeJob && (
          <View style={s.activeCard}>
            <View style={s.activeHead}>
              <View style={s.activBadge}><View style={s.activDot} /><Text style={s.activText}>In Progress</Text></View>
            </View>
            <View style={{ padding: 16 }}>
              <Text style={s.activeTitle}>{db.activeJob.title}</Text>
              <Text style={s.activeSub}>{db.activeJob.service} · {db.activeJob.resident}</Text>
              <View style={s.activeLoc}>
                <Ionicons name="location-outline" size={13} color={MUTED} />
                <Text style={s.activeLocText}>{db.activeJob.location}</Text>
              </View>
              <TouchableOpacity onPress={db.handleComplete} disabled={db.actionLoading} style={s.doneBtn}>
                <LinearGradient colors={[PRIMARY, '#059669']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.doneBtnIn}>
                  {db.actionLoading
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <><Ionicons name="checkmark-done-circle" size={16} color="#fff" /><Text style={s.doneBtnText}>Mark as Complete</Text></>
                  }
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: LIGHT },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT },
  loadingText: { marginTop: 10, color: MUTED, fontSize: 12, fontWeight: '600' },
  scroll: { padding: 16 },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerSub: { color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: '800', letterSpacing: 2 },
  headerName: { color: '#fff', fontSize: 18, fontWeight: '900', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  onlinePill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.08)' },
  onlinePillActive: { borderColor: PRIMARY + '60', backgroundColor: PRIMARY + '20' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: MUTED },
  dotActive: { backgroundColor: PRIMARY },
  onlineText: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.35)' },
  onlineTextActive: { color: PRIMARY },
  statRow: { flexDirection: 'row', gap: 8 },
  statPill: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 12, alignItems: 'center' },
  statVal: { color: '#fff', fontSize: 14, fontWeight: '900' },
  statLbl: { color: 'rgba(255,255,255,0.35)', fontSize: 9, fontWeight: '700', textTransform: 'uppercase', marginTop: 2 },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FEF2F2', borderRadius: 10, padding: 10, marginBottom: 12 },
  errorText: { color: '#DC2626', fontSize: 12, flex: 1 },
  offerCard: { borderRadius: 16, overflow: 'hidden', marginBottom: 16, shadowColor: DARK, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  offerTop: { padding: 20 },
  pulsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  pulsDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: PRIMARY },
  pulsLbl: { color: PRIMARY, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  offerTitle: { color: '#fff', fontSize: 17, fontWeight: '900', marginBottom: 3 },
  offerSvc: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  scoreBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: PRIMARY + '25', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginTop: 10, alignSelf: 'flex-start' },
  scoreText: { color: PRIMARY, fontSize: 11, fontWeight: '800' },
  offerBody: { backgroundColor: '#fff', padding: 16 },
  detRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  detIcon: { padding: 8, backgroundColor: PRIMARY + '12', borderRadius: 10 },
  detText: { fontSize: 13, color: DARK, fontWeight: '500', flex: 1 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  btnDec: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#E5E7EB', alignItems: 'center' },
  btnDecText: { fontSize: 13, fontWeight: '700', color: MUTED },
  btnAcc: { flex: 2, paddingVertical: 12, borderRadius: 12, backgroundColor: PRIMARY, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  btnAccText: { fontSize: 13, fontWeight: '800', color: '#fff' },
  waitCard: { backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  waitIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: PRIMARY + '15', justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  waitTitle: { fontSize: 16, fontWeight: '800', color: DARK, marginBottom: 6 },
  waitSub: { fontSize: 12, color: MUTED, textAlign: 'center', lineHeight: 18 },
  activeCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  activeHead: { backgroundColor: PRIMARY + '12', padding: 12 },
  activBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  activDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: PRIMARY },
  activText: { fontSize: 10, fontWeight: '900', color: PRIMARY, textTransform: 'uppercase', letterSpacing: 1 },
  activeTitle: { fontSize: 16, fontWeight: '900', color: DARK, marginBottom: 4 },
  activeSub: { fontSize: 12, color: MUTED, marginBottom: 6 },
  activeLoc: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 16 },
  activeLocText: { fontSize: 12, color: MUTED },
  doneBtn: { borderRadius: 12, overflow: 'hidden' },
  doneBtnIn: { paddingVertical: 13, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  doneBtnText: { fontSize: 13, fontWeight: '800', color: '#fff' },
});
