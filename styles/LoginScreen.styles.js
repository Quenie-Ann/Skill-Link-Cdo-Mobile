// styles/LoginScreen.styles.js
// All styles for screens/LoginScreen.js

import { StyleSheet, Dimensions } from 'react-native';
import Colors from './colors';

const { width, height } = Dimensions.get('window');

const LoginStyles = StyleSheet.create({

  // Page 
  root:   { flex: 1, backgroundColor: Colors.pageBg },
  scroll: { flexGrow: 1 },

  // Hero banner
  heroBanner:   { width: '100%', height: height * 0.31, overflow: 'hidden' },
  heroCircle:   { position: 'absolute', borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.06)' },
  heroCircle1:  { width: width * 0.65, height: width * 0.65, top: -width * 0.22, right: -width * 0.15 },
  heroCircle2:  { width: width * 0.5,  height: width * 0.5,  bottom: -width * 0.18, left: -width * 0.08 },
  dotGrid:      { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', flexWrap: 'wrap', padding: 18, opacity: 0.15 },
  dot:          { width: 2, height: 2, borderRadius: 1, backgroundColor: '#fff', margin: 11 },
  heroBranding: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, paddingBottom: 10 },

  // Logo
  logoWrap:    { position: 'relative', marginBottom: 6 },
  logoGrad:    { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  logoRing:    { position: 'absolute', top: -5, left: -5, right: -5, bottom: -5, borderRadius: 21, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)' },

  // Branding text
  heroAppName:  { fontSize: 26, fontWeight: '800', color: '#ffffff', letterSpacing: 0.2 },
  heroTagline:  { fontSize: 13, color: 'rgba(255,255,255,0.75)' },

  // Form card
  formCard: {
    marginHorizontal: 16,
    marginTop: -28,
    backgroundColor: Colors.cardBg,
    borderRadius: 28,
    padding: 24,
    paddingTop: 28,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.skillDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  cardTopLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderTopLeftRadius: 28, borderTopRightRadius: 28 },

  // Form header
  formHeader:   { marginBottom: 15 },
  welcomeTitle: { fontSize: 24, fontWeight: '800', color: Colors.skillDark },
  welcomeSub:   { fontSize: 13, color: Colors.textMuted, marginTop: 4 },

  // Divider
  divider:    { height: 1, backgroundColor: Colors.borderBase, marginVertical: 16 },

  // Field label
  fieldLabel: { fontSize: 12, fontWeight: '700', color: Colors.textBody, marginBottom: 6, letterSpacing: 0.2 },

  // Error box
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.errorBg, borderWidth: 1, borderColor: Colors.errorBorder, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14 },
  errorMsg: { color: Colors.errorText, fontSize: 13, flex: 1 },

  // Submit button 
  submitWrap: { marginTop: 6, borderRadius: 16, overflow: 'hidden', shadowColor: Colors.skillPrimary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  submitBtn:  { height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  btnRow:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },

  // Footer 
  footer: { textAlign: 'center', fontSize: 11, color: Colors.textLight, marginTop: 24, marginBottom: 8, letterSpacing: 0.4 },
});

export default LoginStyles;