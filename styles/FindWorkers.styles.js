// styles/FindWorkers.styles.js
// All styles for screens/Resident/FindWorkers.js

import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({

  // Page 
  root:   { flex: 1, backgroundColor: Colors.pageBg },
  scroll: { paddingHorizontal: 16 },

  // Header bar 
  headerBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingBottom: 12,
    backgroundColor: Colors.pageBg,
    borderBottomWidth: 1, borderBottomColor: Colors.borderBase,
    gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.cardBg,
    borderWidth: 1, borderColor: Colors.borderBase,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle:    { flex: 1, fontSize: 17, fontWeight: '800', color: Colors.skillDark },
  workerCountBadge: {
    backgroundColor: Colors.emerald100,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, borderColor: Colors.borderMid,
  },
  workerCountText: { fontSize: 11, fontWeight: '700', color: Colors.skillDark },

  // ML Results banner 
  mlBanner: {
    marginHorizontal: 16,
    marginTop: 12, marginBottom: 0,
    backgroundColor: Colors.skillLight,
    borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    borderWidth: 1, borderColor: Colors.borderMid,
  },
  mlIconWrap: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: Colors.skillPrimary,
    alignItems: 'center', justifyContent: 'center',
  },
  mlInfo:       { flex: 1 },
  mlLabel:      { fontSize: 10, fontWeight: '800', color: Colors.skillPrimary, letterSpacing: 0.5 },
  mlServiceStr: { fontSize: 14, fontWeight: '800', color: Colors.skillDark, marginTop: 2 },
  mlMeta:       { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  mlBackLink:   {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    marginTop: 8, alignSelf: 'flex-start',
  },
  mlBackText: { fontSize: 12, color: Colors.skillPrimary, fontWeight: '700' },

  // Filter tab bar 
  filterWrap:   { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 },
  filterScroll: { paddingBottom: 2 },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, marginRight: 8,
    borderWidth: 1.5, borderColor: Colors.borderBase,
    backgroundColor: Colors.cardBg,
  },
  filterTabActive: {
    borderColor: Colors.skillPrimary,
    backgroundColor: Colors.skillLight,
  },
  filterTabText:       { fontSize: 12, fontWeight: '700', color: Colors.textMuted },
  filterTabTextActive: { color: Colors.skillPrimary },

  // Empty state 
  emptyState: {
    alignItems: 'center', paddingVertical: 60, gap: 10,
  },
  emptyText:    { fontSize: 15, fontWeight: '700', color: Colors.textBody },
  emptySubText: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },
});