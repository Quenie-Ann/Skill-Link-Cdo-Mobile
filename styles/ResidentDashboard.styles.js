// styles/ResidentDashboard.styles.js
// All styles for screens/Resident/ResidentDashboard.js

import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';

const { width } = Dimensions.get('window');

const ResidentDashboardStyles = StyleSheet.create({

  // Page 
  root:   { flex: 1, backgroundColor: Colors.pageBg },
  scroll: { paddingHorizontal: 20 },

  // Header 
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  greeting:  { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
  userName:  { fontSize: 22, fontWeight: '800', color: Colors.skillDark, marginTop: 2 },
  roleBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6,
    backgroundColor: Colors.emerald100, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, alignSelf: 'flex-start', borderWidth: 1, borderColor: Colors.borderMid,
  },
  roleText:  { fontSize: 10, fontWeight: '700', color: Colors.skillDark, letterSpacing: 0.5 },
  logoutBtn: {
    padding: 10, backgroundColor: Colors.cardBg, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.borderBase,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2,
  },

  // Hero card 
  heroCard:     { borderRadius: 22, padding: 20, marginBottom: 16, overflow: 'hidden', position: 'relative' },
  heroCircle1:  { position: 'absolute', width: width * 0.5, height: width * 0.5, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.06)', top: -width * 0.18, right: -width * 0.12 },
  heroCircle2:  { position: 'absolute', width: width * 0.35, height: width * 0.35, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.04)', bottom: -width * 0.1, left: -width * 0.06 },
  heroPill:     { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(16,185,129,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 10 },
  heroPillText: { fontSize: 10, color: '#6ee7b7', fontWeight: '700' },
  heroContent:  { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  heroTitle:    { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 5 },
  heroSub:      { fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 17 },
  heroIconWrap: { width: 58, height: 58, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  heroBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Colors.skillLight, paddingVertical: 12, borderRadius: 14 },
  heroBtnText:  { color: Colors.skillDark, fontWeight: '800', fontSize: 14 },

  // Stats row 
  statsRow:  { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard:  {
    flex: 1, borderRadius: 16, padding: 14, alignItems: 'center', gap: 4, borderWidth: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3 },

  // Section 
  sectionTitle:  { fontSize: 15, fontWeight: '800', color: Colors.skillDark, marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  countBadge:    { backgroundColor: Colors.emerald100, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, borderWidth: 1, borderColor: Colors.borderMid },
  countText:     { fontSize: 11, fontWeight: '700', color: Colors.skillDark },

  // Quick service chips 
  chip:     { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, marginRight: 8, borderWidth: 1 },
  chipText: { fontSize: 12, fontWeight: '700' },

  // Modal overlay 
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(15,23,42,0.45)' },
  modalSheet:   {
    backgroundColor: Colors.cardBg,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, paddingBottom: 36,
    borderTopWidth: 1, borderColor: Colors.borderBase,
  },
  modalHandle:   { width: 40, height: 4, backgroundColor: '#cbd5e1', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  modalTitle:    { fontSize: 17, fontWeight: '800', color: Colors.skillDark },
  modalSub:      { fontSize: 12, color: Colors.textMuted, marginTop: 3 },
  modalCloseBtn: { padding: 8, backgroundColor: Colors.surfaceAlt, borderRadius: 10, borderWidth: 1, borderColor: Colors.borderBase },

  // Step progress bar
  stepRow:       { flexDirection: 'row', gap: 6, marginBottom: 20 },
  stepBar:       { height: 4, flex: 1, backgroundColor: Colors.borderBase, borderRadius: 2 },
  stepBarActive: { backgroundColor: Colors.skillPrimary },

  // Success state 
  successBlock: { alignItems: 'center', paddingVertical: 28, gap: 8 },
  successTitle: { fontSize: 17, fontWeight: '800', color: Colors.skillDark },
  successSub:   { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },

  // Category grid (Step 1) 
  catGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  catCard:    { width: (width - 88) / 3, backgroundColor: Colors.inputBg, borderRadius: 16, padding: 14, alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: Colors.borderBase, position: 'relative' },
  catIconWrap:{ width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catLabel:   { fontSize: 11, fontWeight: '600', color: Colors.textBody, textAlign: 'center' },
  catCheck:   { position: 'absolute', top: 6, right: 6, width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },

  // Problem form (Step 2) 
  formBlock:         { gap: 2, marginBottom: 8 },
  selectedBadge:     { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginBottom: 14 },
  selectedBadgeText: { fontSize: 12, fontWeight: '700' },
  inputLabel:        { fontSize: 12, fontWeight: '700', color: Colors.textBody, marginBottom: 7, marginTop: 10, letterSpacing: 0.2 },
  textArea:          { backgroundColor: Colors.inputBg, borderRadius: 14, padding: 14, color: Colors.textDark, fontSize: 14, minHeight: 90, textAlignVertical: 'top', borderWidth: 1.5, borderColor: Colors.borderBase },
  inputField:        { backgroundColor: Colors.inputBg, borderRadius: 14, padding: 14, color: Colors.textDark, fontSize: 14, height: 52, borderWidth: 1.5, borderColor: Colors.borderBase },

  // Modal footer buttons 
  modalFooter: { flexDirection: 'row', gap: 10, marginTop: 20 },
  backBtn:     { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 18, paddingVertical: 14, backgroundColor: Colors.surfaceAlt, borderRadius: 14, borderWidth: 1, borderColor: Colors.borderBase },
  backBtnText: { color: Colors.textMuted, fontWeight: '600', fontSize: 13 },
  nextBtn:     { flex: 1, borderRadius: 14, overflow: 'hidden' },
  nextBtnGrad: { paddingVertical: 15, alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  btnRow:      { flexDirection: 'row', alignItems: 'center', gap: 7 },
  nextBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});

export default ResidentDashboardStyles;

