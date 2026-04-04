// styles/WorkerCard.styles.js
// All styles for components/resident/WorkerCard.js

import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({

  // Card shell 
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderBase,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  // Top row: avatar · name block · ML badge 
  topRow:    { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  avatar: {
    width: 46, height: 46, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: { fontSize: 18, fontWeight: '800', color: '#fff' },

  nameBlock:   { flex: 1 },
  nameRow:     { flexDirection: 'row', alignItems: 'center', gap: 5 },
  workerName:  { fontSize: 15, fontWeight: '800', color: Colors.textDark },
  tradeBadge:  {
    alignSelf: 'flex-start', marginTop: 4,
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 6,
  },
  tradeText:   { fontSize: 11, fontWeight: '700' },

  // ML match % badge (top-right)
  mlBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.skillLight,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10, alignSelf: 'flex-start',
  },
  mlPercent: { fontSize: 13, fontWeight: '800', color: Colors.skillDark },
  mlLabel:   { fontSize: 10, fontWeight: '600', color: Colors.skillPrimary },

  // Skill tags row 
  tagsRow:  { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: {
    paddingHorizontal: 8, paddingVertical: 4,
    backgroundColor: Colors.inputBg,
    borderRadius: 8, borderWidth: 1,
    borderColor: Colors.borderBase,
  },
  tagText:  { fontSize: 11, color: Colors.textBody, fontWeight: '600' },
  tagMore:  {
    paddingHorizontal: 8, paddingVertical: 4,
    backgroundColor: Colors.borderBase,
    borderRadius: 8,
  },
  tagMoreText: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },

  // Meta row: location · availability 
  metaRow:     { flexDirection: 'row', gap: 16, marginBottom: 14 },
  metaItem:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText:    { fontSize: 12, color: Colors.textMuted },

  // Divider  
  divider:     { height: 1, backgroundColor: Colors.borderBase, marginBottom: 12 },

  // Footer row: stats · rate · CTA 
  footerRow:   { flexDirection: 'row', alignItems: 'center' },
  statsBlock:  { flex: 1, gap: 2 },
  statItem:    { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText:    { fontSize: 11, color: Colors.textMuted },
  rateBlock:   { marginRight: 12, alignItems: 'flex-end' },
  rateLabel:   { fontSize: 10, color: Colors.textMuted, fontWeight: '600' },
  rateValue:   { fontSize: 18, fontWeight: '800', color: Colors.skillDark },
  rateUnit:    { fontSize: 11, color: Colors.textMuted },

  // Send Offer button (default state)
  offerBtn: {
    borderRadius: 12, overflow: 'hidden',
    shadowColor: Colors.skillPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  offerBtnGrad: {
    paddingVertical: 10, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 12,
  },
  offerBtnText: { color: '#fff', fontSize: 13, fontWeight: '800' },

  // Offer sent confirmation state
  offerSentBtn: {
    paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: 12, borderWidth: 1.5,
    borderColor: Colors.skillPrimary,
    backgroundColor: Colors.skillLight,
    flexDirection: 'row', alignItems: 'center', gap: 6,
  },
  offerSentText: { fontSize: 13, fontWeight: '700', color: Colors.skillPrimary },
});