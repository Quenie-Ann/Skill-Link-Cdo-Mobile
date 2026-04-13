// services/api.js
// Shared API service for Skill-Link CDO mobile app.
// Physical device: change BASE_URL to PC's local IP (e.g. http://192.168.x.x:8000/api)
// Android emulator: use http://10.0.2.2:8000/api

import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for Physical device, change to PC's local IP address
// export const BASE_URL = 'http://192.168.0.103:8081/api';
export const BASE_URL = 'http://10.0.2.2:8000/api';
const SESSION_KEY     = 'skilllink_session';

async function request(method, path, body = null) {
  try {
    // Use AsyncStorage.getItem to retrieve the session data, which contains the access token
    const raw = await AsyncStorage.getItem('skilllink_session');
    const session = raw ? JSON.parse(raw) : null;
    const token = session?.access ?? null;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
    
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${path}`, options);
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.error || data.detail || `Error ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export const sessionService = {
  async save(data)  { await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(data)); },
  async get()       { const r = await AsyncStorage.getItem(SESSION_KEY); return r ? JSON.parse(r) : null; },
  async clear()     { await AsyncStorage.removeItem(SESSION_KEY); },
};

export const authApi = {
    async login(email, password) {
      const res = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.error || 'Invalid credentials');
      }

      // MATCHING WEB LOGIC: Convert role to lowercase here
      const sessionUser = {
        email: data.email || email,
        role: data.role ? data.role.toLowerCase() : 'user', 
        user_id: data.user_id,
        access: data.access,
        refresh: data.refresh,
      };

      await sessionService.save(sessionUser);
      return sessionUser; // Return the user object directly
    },

  async logout(refreshToken) {
    try { await request('POST', '/logout/', { refresh: refreshToken }); } catch (_) {}
    await sessionService.clear();
  },
  async getMe() { return request('GET', '/me/'); },
};

export const workerApi = {
  getProfile:        ()           => request('GET',   '/profile/'),
  updateProfile:     (data)       => request('PUT',   '/profile/', data),
  getStats:          ()           => request('GET',   '/worker/stats/'),
  getJobHistory:     ()           => request('GET',   '/jobs/history/'),
  getPendingOffer:   ()           => request('GET',   '/worker/match/pending/'),
  getActiveJob:      ()           => request('GET',   '/worker/job/active/'),
  acceptOffer:       (id)         => request('POST',  `/worker/match/${id}/accept/`),
  declineOffer:      (id)         => request('POST',  `/worker/match/${id}/decline/`),
  completeJob:       (id)         => request('POST',  `/worker/job/${id}/complete/`),
  setOnlineStatus:   (isOnline)   => request('PATCH', '/worker/status/', { is_online: isOnline }),
  updateAvailability:(days)       => request('PATCH', '/worker/availability-schedule/', { availability_schedule: days }),
  getNotifications:  ()           => request('GET',   '/notifications/'),
  markRead:          (id)         => request('PATCH', `/notifications/${id}/read/`),
  dismiss:           (id)         => request('DELETE', `/notifications/${id}/`),
};

export const residentApi = {
  getProfile:    ()            => request('GET',  '/resident/profile/'),
  getRequests:   ()            => request('GET',  '/resident/requests/'),
  getCategories: ()            => request('GET',  '/skill-categories/'),

  // KEY FIX: resolve category name against DB before filtering
  // Pass the raw service value (e.g. 'carpentry') and this resolves
  // it to the exact DB name (e.g. 'Carpenter') then fetches only those workers
  async getWorkersByCategory(serviceValue) {
    let categoryParam = null;
    try {
      const cats = await request('GET', '/skill-categories/');
      const match = (cats || []).find(
        c => c.category_name.toLowerCase() === serviceValue?.toLowerCase() ||
             c.category_name.toLowerCase().includes(serviceValue?.toLowerCase()) ||
             serviceValue?.toLowerCase().includes(c.category_name.toLowerCase())
      );
      if (match) categoryParam = match.category_name;
    } catch (_) {}
    const path = categoryParam
      ? `/workers/?category=${encodeURIComponent(categoryParam)}`
      : '/workers/';
    return request('GET', path);
  },

  getWorkers:    (cat)         => request('GET',  cat ? `/workers/?category=${encodeURIComponent(cat)}` : '/workers/'),
  createRequest: (body)        => request('POST', '/requests/', body),
  sendOffer:     (reqId, wId)  => request('POST', `/requests/${reqId}/send-offer/${wId}/`),
  submitRating:  (body)        => request('POST', '/ratings/', body),
  getNotifications: ()         => request('GET',  '/notifications/'),
  markRead:      (id)          => request('PATCH', `/notifications/${id}/read/`),
  dismiss:       (id)          => request('DELETE', `/notifications/${id}/`),
};
