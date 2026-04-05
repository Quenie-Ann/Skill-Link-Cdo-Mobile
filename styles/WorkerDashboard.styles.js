import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.pageBg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: Colors.cardBg, borderBottomWidth: 1, borderBottomColor: Colors.borderBase },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.skillPrimary },
  headerSubtitle: { fontSize: 9, fontWeight: '700', color: Colors.skillPrimary, opacity: 0.6, letterSpacing: 2 },
  notifBtn: { padding: 8, backgroundColor: Colors.pageBg, borderRadius: 12, borderWidth: 1, borderColor: Colors.borderBase },
  scroll: { padding: 16, gap: 12 },

  // Worker Card
  workerCard: { backgroundColor: Colors.cardBg, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.borderBase },
  workerInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarBox: { width: 44, height: 44, borderRadius: 10, backgroundColor: Colors.emerald100, borderWidth: 1, borderColor: Colors.skillPrimary + '33', alignItems: 'center', justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  workerName: { fontSize: 14, fontWeight: '900', color: Colors.textDark },
  workerService: { fontSize: 10, color: '#9ca3af', fontWeight: '600' },

  // Stats - side by side
  statsRow: { flexDirection: 'row', gap: 6, marginTop: 14 },
  statPill: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 8, backgroundColor: Colors.pageBg, borderWidth: 1, borderColor: Colors.borderBase },
  statPillHighlight: { backgroundColor: Colors.emerald100, borderColor: Colors.skillPrimary + '33' },
  statValue: { fontSize: 13, fontWeight: '900', color: Colors.textDark },
  statValueHighlight: { fontSize: 13, fontWeight: '900', color: Colors.skillPrimary },
  statLabel: { fontSize: 8, color: '#9ca3af', fontWeight: '700', letterSpacing: 1 },

  // Tab Bar
  tabBar: { flexDirection: 'row', backgroundColor: Colors.cardBg, borderRadius: 12, borderWidth: 1, borderColor: Colors.borderBase, overflow: 'hidden' },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.skillPrimary, backgroundColor: Colors.emerald100 },
  tabLabel: { fontSize: 11, fontWeight: '800', color: '#9ca3af' },
  tabLabelActive: { color: Colors.skillPrimary },
  tabBadge: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.skillPrimary, alignItems: 'center', justifyContent: 'center' },
  tabBadgeText: { fontSize: 9, color: 'white', fontWeight: '900' },

  // Empty State
  emptyCard: { backgroundColor: Colors.cardBg, borderRadius: 12, padding: 40, alignItems: 'center', borderWidth: 1, borderColor: Colors.borderBase },
  emptyTitle: { fontSize: 16, fontWeight: '900', color: Colors.textDark, marginTop: 12, marginBottom: 8 },
  emptyText: { fontSize: 13, color: '#9ca3af', textAlign: 'center', lineHeight: 20 },

  // Offer Card
  offerCard: { borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: Colors.skillPrimary + '33' },
  offerHeader: { backgroundColor: Colors.skillDark, padding: 24 },
  offerBadge: { fontSize: 9, fontWeight: '900', color: Colors.skillPrimary, letterSpacing: 2, marginBottom: 8 },
  offerTitle: { fontSize: 20, fontWeight: '900', color: 'white', marginBottom: 4 },
  offerMeta: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  offerTags: { flexDirection: 'row', gap: 8, marginTop: 12 },
  tagMatch: { backgroundColor: Colors.skillPrimary + '33', borderWidth: 1, borderColor: Colors.skillPrimary + '55', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagMatchText: { fontSize: 10, fontWeight: '900', color: Colors.skillPrimary },
  tagService: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagServiceText: { fontSize: 10, color: 'rgba(255,255,255,0.5)' },

  // Offer Body
  offerBody: { backgroundColor: Colors.cardBg, padding: 20, gap: 12 },
  offerDesc: { fontSize: 12, color: '#6b7280', fontStyle: 'italic', borderLeftWidth: 2, borderLeftColor: Colors.skillPrimary + '55', paddingLeft: 10, marginBottom: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  detailIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  detailLabel: { fontSize: 9, fontWeight: '700', color: '#9ca3af', letterSpacing: 1 },
  detailValue: { fontSize: 14, fontWeight: '600', color: Colors.textDark },

  // Actions
  offerActions: { flexDirection: 'row', gap: 10, padding: 16, backgroundColor: Colors.cardBg, borderTopWidth: 1, borderTopColor: Colors.borderBase },
  declineBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, borderWidth: 2, borderColor: '#e5e7eb' },
  declineBtnText: { fontSize: 13, fontWeight: '700', color: '#9ca3af' },
  acceptBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, backgroundColor: Colors.skillPrimary, borderRadius: 10 },
  acceptBtnText: { fontSize: 13, fontWeight: '900', color: 'white' },

  // Complete
  completeWrapper: { padding: 16, backgroundColor: Colors.cardBg, borderTopWidth: 1, borderTopColor: Colors.borderBase },
  completeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, backgroundColor: Colors.skillPrimary, borderRadius: 10 },
  completeBtnText: { fontSize: 13, fontWeight: '900', color: 'white' },
  completeNote: { fontSize: 10, color: '#9ca3af', textAlign: 'center', marginTop: 8 },
});