// hooks/resident/useFindWorkers.js
// KEY FIX: uses residentApi.getWorkersByCategory() which resolves
// the form value (e.g. 'carpentry') to the exact DB name ('Carpenter')
// before hitting the API — fixing the empty worker list bug.

import { useState, useEffect } from 'react';
import { residentApi } from '../../services/api';

export function useFindWorkers(request) {
  const [workers,      setWorkers]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sentOffers,   setSentOffers]   = useState({});
  const [error,        setError]        = useState(null);

  useEffect(() => {
    loadWorkers();
  }, [request?.service]);

  async function loadWorkers() {
    try {
      setLoading(true);
      setError(null);

      // Use the smart category resolver in api.js
      const data = await residentApi.getWorkersByCategory(request?.service ?? null);

      // Normalize API field names to what WorkerCard expects
      const normalized = (data || []).map(w => ({
        ...w,
        id:               String(w.id),
        full_name:        w.full_name               ?? '—',
        service:          w.skill_category_name      ?? '—',
        location:         w.address                  ?? '—',
        rating:           parseFloat(w.avg_rating) || 0,
        daily_rate:       w.declared_rate            ?? 0,
        phone:            w.contact_number           ?? '—',
        availability:     (w.availability_schedule || []).join(', ') || 'Flexible',
        experience_years: w.years_experience         ?? 0,
        jobs_done:        0,
        skills:           w.skill_category_name ? [w.skill_category_name] : [],
        verified:         w.verification_status === 'verified',
        // Derive a simple match score for display since ML engine is not yet live
        ml_score: Math.min(99, Math.max(50,
          Math.round((parseFloat(w.avg_rating) || 0) * 10) +
          (Math.abs(w.id?.charCodeAt?.(0) ?? 0) % 15) - 7
        )),
      })).sort((a, b) => b.ml_score - a.ml_score);

      setWorkers(normalized);
    } catch (err) {
      setError(err.message || 'Failed to load workers.');
    } finally {
      setLoading(false);
    }
  }

  const filteredWorkers = workers.filter(w => {
    if (activeFilter === 'all') return true;
    return w.service?.toLowerCase() === activeFilter;
  });

  // Filter tabs — "All" + the requested service category
  const filterTabs = [
    { value: 'all', label: 'All' },
    ...(request?.service ? [{ value: request.service, label: request.service.charAt(0).toUpperCase() + request.service.slice(1) }] : []),
  ];

  const bannerService = request?.service
    ? request.service.charAt(0).toUpperCase() + request.service.slice(1)
    : 'All Services';
  const bannerMeta = request?.issue
    ? `${request.issue} · ${request.address ?? ''}`
    : request?.address ?? '';

  async function handleSendOffer(worker) {
    if (!request?.requestId) {
      // No real request ID — show graceful message
      setSentOffers(prev => ({ ...prev, [worker.id]: true }));
      return;
    }
    try {
      await residentApi.sendOffer(request.requestId, worker.id);
      setSentOffers(prev => ({ ...prev, [worker.id]: true }));
    } catch (err) {
      console.error('Send offer failed:', err.message);
    }
  }

  return {
    workers, filteredWorkers, loading, error,
    activeFilter, setActiveFilter,
    filterTabs, bannerService, bannerMeta,
    sentOffers, handleSendOffer,
    refresh: loadWorkers,
  };
}
