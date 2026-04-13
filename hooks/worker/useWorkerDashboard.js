// hooks/worker/useWorkerDashboard.js
import { useState, useEffect, useCallback } from 'react';
import { workerApi } from '../../services/api';

export function useWorkerDashboard() {
  const [profile,       setProfile]       = useState(null);
  const [stats,         setStats]         = useState({ total_completed: 0, avg_rating: 0, is_online: false });
  const [pendingOffer,  setPendingOffer]  = useState(null);
  const [activeJob,     setActiveJob]     = useState(null);
  const [loading,       setLoading]       = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error,         setError]         = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const [profileData, statsData, offerData, activeData] = await Promise.all([
        workerApi.getProfile(),
        workerApi.getStats(),
        workerApi.getPendingOffer(),
        workerApi.getActiveJob(),
      ]);
      setProfile({
        ...profileData,
        service:          profileData.skill_category_name ?? 'Specialist',
        daily_rate:       profileData.declared_rate       ?? 0,
        phone:            profileData.contact_number      ?? '—',
        experience_years: profileData.years_experience    ?? 0,
        avg_rating:       parseFloat(profileData.avg_rating) || 0,
      });
      setStats({
        total_completed: statsData?.total_completed ?? 0,
        avg_rating:      parseFloat(statsData?.avg_rating) || 0,
        is_online:       statsData?.is_online ?? false,
      });
      if (offerData?.has_offer && offerData?.offer?.id) {
        const o = offerData.offer;
        setPendingOffer({
          id: o.id, title: o.request_title ?? 'Job Request',
          description: o.request_description ?? '—',
          service: o.category_name ?? '—',
          location: o.request_location ?? '—',
          resident: o.resident_name ?? '—',
          match_score: o.match_score ?? 0,
        });
      } else { setPendingOffer(null); }
      if (activeData?.has_offer && activeData?.offer?.id) {
        const a = activeData.offer;
        setActiveJob({ id: a.id, title: a.request_title ?? 'Active Job', location: a.request_location ?? '—', resident: a.resident_name ?? '—', service: a.category_name ?? '—' });
      } else { setActiveJob(null); }
    } catch (err) { setError(err.message || 'Failed to load.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAccept() {
    if (!pendingOffer) return;
    setActionLoading(true);
    try { await workerApi.acceptOffer(pendingOffer.id); setActiveJob({ ...pendingOffer }); setPendingOffer(null); }
    catch (err) { setError(err.message); }
    finally { setActionLoading(false); }
  }
  async function handleDecline() {
    if (!pendingOffer) return;
    setActionLoading(true);
    try { await workerApi.declineOffer(pendingOffer.id); setPendingOffer(null); }
    catch (err) { setError(err.message); }
    finally { setActionLoading(false); }
  }
  async function handleComplete() {
    if (!activeJob) return;
    setActionLoading(true);
    try { await workerApi.completeJob(activeJob.id); setActiveJob(null); }
    catch (err) { setError(err.message); }
    finally { setActionLoading(false); }
  }
  async function handleToggleOnline() {
    const next = !stats.is_online;
    try { await workerApi.setOnlineStatus(next); setStats(p => ({ ...p, is_online: next })); }
    catch (err) { setError(err.message); }
  }

  return { profile, stats, pendingOffer, activeJob, loading, actionLoading, error, handleAccept, handleDecline, handleComplete, handleToggleOnline, refresh: load };
}
