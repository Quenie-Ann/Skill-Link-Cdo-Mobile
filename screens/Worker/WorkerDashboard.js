// screens/Worker/WorkerDashboard.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../styles/colors';
import styles from '../../styles/WorkerDashboard.styles';

const MOCK_WORKER = {
  full_name: 'Juan Dela Cruz',
  service: 'Plumbing',
  is_verified: true,
  rating: '4.8',
  jobs_done: 12,
  daily_rate: 650,
};

const MOCK_JOB_OFFER = {
  id: 'REQ-047',
  problem: 'Burst pipe under kitchen sink',
  description: 'Water is leaking heavily from the pipe under the kitchen sink. Needs immediate repair before it floods the floor.',
  service: 'Plumbing',
  match_score: 94,
  distance: '1.2 km away',
  preferred_start: 'within_3_days',
  schedule: 'Weekdays Only',
  resident: {
    name: 'Maria Santos',
    address: 'Zone 1, Bulua, CDO',
    phone: '09171234567',
  },
};

export default function WorkerDashboard({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('offers');
  const [jobOffer, setJobOffer] = useState(MOCK_JOB_OFFER);
  const [activeJob, setActiveJob] = useState(null);

  function handleAccept() {
    const confirmed = {
      ...jobOffer,
      confirmed_date: 'May 7, 2026',
      confirmed_price: `₱${MOCK_WORKER.daily_rate}/day`,
      accepted_at: '9:00 AM',
    };
    setJobOffer(null);
    setActiveJob(confirmed);
    setActiveTab('inprogress');
  }

  function handleDecline() {
    setJobOffer(null);
  }

  function handleComplete() {
    setActiveJob(null);
    setActiveTab('offers');
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Job Offers</Text>
          <Text style={styles.headerSubtitle}>WORKER PORTAL</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={22} color={Colors.skillPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* WORKER CARD */}
        <View style={styles.workerCard}>
          <View style={styles.workerInfo}>
            <View style={styles.avatarBox}>
              <Ionicons name="person" size={22} color={Colors.skillPrimary} />
            </View>
            <View>
              <View style={styles.nameRow}>
                <Text style={styles.workerName}>{MOCK_WORKER.full_name}</Text>
                {MOCK_WORKER.is_verified && (
                  <Ionicons name="checkmark-circle" size={14} color={Colors.skillPrimary} />
                )}
              </View>
              <Text style={styles.workerService}>{MOCK_WORKER.service} Specialist</Text>
            </View>
          </View>

          {/* STATS - side by side */}
          <View style={styles.statsRow}>
            <View style={[styles.statPill, styles.statPillHighlight]}>
              <Ionicons name="star" size={12} color={Colors.skillPrimary} />
              <View>
                <Text style={styles.statValueHighlight}>{MOCK_WORKER.rating}</Text>
                <Text style={styles.statLabel}>RATING</Text>
              </View>
            </View>
            <View style={styles.statPill}>
              <Ionicons name="checkmark-circle-outline" size={12} color="#9ca3af" />
              <View>
                <Text style={styles.statValue}>{MOCK_WORKER.jobs_done}</Text>
                <Text style={styles.statLabel}>JOBS DONE</Text>
              </View>
            </View>
            <View style={styles.statPill}>
              <Ionicons name="cash-outline" size={12} color="#9ca3af" />
              <View>
                <Text style={styles.statValue}>₱{MOCK_WORKER.daily_rate}</Text>
                <Text style={styles.statLabel}>DAILY RATE</Text>
              </View>
            </View>
          </View>
        </View>

        {/* TAB BAR */}
        <View style={styles.tabBar}>
          {[
            { id: 'offers',     label: 'Job Offers',  icon: 'flash',    badge: !!jobOffer  },
            { id: 'inprogress', label: 'In Progress',  icon: 'briefcase', badge: !!activeJob },
          ].map(({ id, label, icon, badge }) => (
            <TouchableOpacity
              key={id}
              style={[styles.tab, activeTab === id && styles.tabActive]}
              onPress={() => setActiveTab(id)}
            >
              <Ionicons name={icon} size={13} color={activeTab === id ? Colors.skillPrimary : '#9ca3af'} />
              <Text style={[styles.tabLabel, activeTab === id && styles.tabLabelActive]}>{label}</Text>
              {badge && <View style={styles.tabBadge}><Text style={styles.tabBadgeText}>1</Text></View>}
            </TouchableOpacity>
          ))}
        </View>

        {/* OFFERS PANEL */}
        {activeTab === 'offers' && (
          <View>
            {!jobOffer ? (
              <View style={styles.emptyCard}>
                <Ionicons name="flash" size={30} color={Colors.skillPrimary} />
                <Text style={styles.emptyTitle}>Waiting for Offers</Text>
                <Text style={styles.emptyText}>
                  You're visible to residents. When a resident selects you, their offer will appear here.
                </Text>
              </View>
            ) : (
              <View style={styles.offerCard}>
                <View style={styles.offerHeader}>
                  <Text style={styles.offerBadge}>● NEW JOB OFFER</Text>
                  <Text style={styles.offerTitle}>{jobOffer.problem}</Text>
                  <Text style={styles.offerMeta}>{jobOffer.distance}  ·  Request {jobOffer.id}</Text>
                  <View style={styles.offerTags}>
                    <View style={styles.tagMatch}>
                      <Text style={styles.tagMatchText}>⚡ {jobOffer.match_score}% ML Match</Text>
                    </View>
                    <View style={styles.tagService}>
                      <Text style={styles.tagServiceText}>{jobOffer.service}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.offerBody}>
                  <Text style={styles.offerDesc}>{jobOffer.description}</Text>
                  {[
                    { icon: 'person',   iconBg: '#dbeafe', iconColor: '#2563eb', label: 'RESIDENT',            value: jobOffer.resident.name },
                    { icon: 'location', iconBg: '#fee2e2', iconColor: '#dc2626', label: 'SERVICE ADDRESS',     value: jobOffer.resident.address },
                    { icon: 'time',     iconBg: '#ede9fe', iconColor: '#7c3aed', label: 'PREFERRED START',     value: jobOffer.preferred_start.replace(/_/g, ' ') },
                    { icon: 'calendar', iconBg: '#dbeafe', iconColor: '#60a5fa', label: 'PREFERRED SCHEDULE',  value: jobOffer.schedule },
                  ].map(({ icon, iconBg, iconColor, label, value }) => (
                    <View key={label} style={styles.detailRow}>
                      <View style={[styles.detailIcon, { backgroundColor: iconBg }]}>
                        <Ionicons name={icon} size={14} color={iconColor} />
                      </View>
                      <View>
                        <Text style={styles.detailLabel}>{label}</Text>
                        <Text style={styles.detailValue}>{value}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.offerActions}>
                  <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
                    <Ionicons name="close-circle-outline" size={15} color="#9ca3af" />
                    <Text style={styles.declineBtnText}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
                    <Ionicons name="checkmark-circle" size={17} color="white" />
                    <Text style={styles.acceptBtnText}>Accept Offer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* IN PROGRESS PANEL */}
        {activeTab === 'inprogress' && (
          <View>
            {!activeJob ? (
              <View style={styles.emptyCard}>
                <Ionicons name="briefcase-outline" size={30} color="#d1d5db" />
                <Text style={styles.emptyTitle}>No Active Job</Text>
                <Text style={styles.emptyText}>Jobs you accept will appear here.</Text>
              </View>
            ) : (
              <View style={styles.offerCard}>
                <View style={styles.offerHeader}>
                  <Text style={styles.offerBadge}>● JOB IN PROGRESS</Text>
                  <Text style={styles.offerTitle}>{activeJob.problem}</Text>
                  <Text style={styles.offerMeta}>Accepted {activeJob.accepted_at}</Text>
                </View>
                <View style={styles.offerBody}>
                  {[
                    { icon: 'person',   iconBg: '#dbeafe', iconColor: '#2563eb', label: 'CLIENT',          value: activeJob.resident.name    },
                    { icon: 'call',     iconBg: '#d1fae5', iconColor: '#059669', label: 'CONTACT',         value: activeJob.resident.phone   },
                    { icon: 'location', iconBg: '#fee2e2', iconColor: '#dc2626', label: 'ADDRESS',         value: activeJob.resident.address },
                    { icon: 'calendar', iconBg: '#ede9fe', iconColor: '#7c3aed', label: 'CONFIRMED START', value: activeJob.confirmed_date   },
                    { icon: 'cash',     iconBg: '#d1fae5', iconColor: '#059669', label: 'CONFIRMED RATE',  value: activeJob.confirmed_price  },
                  ].map(({ icon, iconBg, iconColor, label, value }) => (
                    <View key={label} style={styles.detailRow}>
                      <View style={[styles.detailIcon, { backgroundColor: iconBg }]}>
                        <Ionicons name={icon} size={14} color={iconColor} />
                      </View>
                      <View>
                        <Text style={styles.detailLabel}>{label}</Text>
                        <Text style={styles.detailValue}>{value}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.completeWrapper}>
                  <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
                    <Ionicons name="checkmark-circle" size={17} color="white" />
                    <Text style={styles.completeBtnText}>Mark Job as Complete</Text>
                  </TouchableOpacity>
                  <Text style={styles.completeNote}>
                    The resident will be prompted to rate you after marking complete.
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

      </ScrollView>
    </View>
  );
}