# Skill-Link CDO — Mobile Application

## Project Description

Skill-Link CDO is a machine learning-assisted, barangay-based skilled worker registry and matching system for Cagayan de Oro City, Philippines. The mobile application is the primary interface for Skilled Workers and Residents on Android and iOS devices. It connects barangay residents with verified skilled workers through an ML-powered matching engine, allowing job requests to be submitted, matched, and managed entirely from a mobile device.

---

## Features

### Resident Portal (Mobile)

- Submit job requests by selecting a skill category, a specific job type tile, a budget range, and a job location
- Location auto-filled from the resident's registered profile address; option to use current GPS location
- Receive a ranked list of ML-matched verified workers with composite match scores
- Send job offers to selected workers and track offer status in real time
- View active and past job requests with a live status pipeline indicator
- Submit ratings for completed jobs

### Skilled Worker Portal (Mobile)

- Register and edit a worker profile including skill category, declared rate, years of experience, and a bio
- Upload certifications and barangay clearances for admin verification
- Toggle online/offline availability
- Receive and respond to incoming job offers (accept or decline)
- Track the currently active job and mark it complete
- View completed job history

### Shared

- JWT-authenticated sessions stored securely via `expo-secure-store`
- In-app notification bell with unread badge count
- Dark mode support
- Login event tracking and new-device security alerts via email

---

## Technology Stack

| Layer                  | Technology                                               |
| ---------------------- | -------------------------------------------------------- |
| Framework              | React Native                                             |
| Runtime / Distribution | Expo Go                                                  |
| Navigation             | React Navigation v6                                      |
| Secure Token Storage   | expo-secure-store                                        |
| HTTP Client            | Fetch API (custom wrapper)                               |
| Authentication         | JWT Bearer tokens via Django REST Framework SimpleJWT    |
| Styling                | StyleSheet API + Tailwind-compatible utility classes     |
| Icons                  | Lucide React Native                                      |
| Deployment             | Expo Go (demo); native builds via EAS Build (production) |

---

## System Architecture

The mobile app is the presentation layer of a multi-tier, service-oriented system.

```
[React Native App — Expo Go / Android / iOS]
        │  HTTPS + JWT (Bearer token)
        ▼
[Django REST API — Render]
        │  HTTP POST + X-Service-Key
        ▼
[FastAPI ML Service — Render]   ←→   [PostgreSQL — Render]
        │
        ▼
[Supabase Storage]
```

- The mobile app communicates exclusively with the Django REST API over HTTPS.
- JWT access tokens are held in memory; refresh tokens are stored in `expo-secure-store`, preventing JavaScript-accessible token theft.
- The ML matching engine is a separate FastAPI microservice — the app never calls it directly.

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your Android or iOS device
- The Django backend (`skill-link-cdo-backend`) must be running locally or deployed

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Quenie-Ann/Skill-Link-Cdo-Mobile.git
cd skill-link-cdo-mobile

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and set:
# EXPO_PUBLIC_API_URL=https://your-backend.onrender.com/api

# 4. Start the Expo development server
npx expo start
```

Scan the QR code in the Expo Go app on your device to launch the application.

### Environment Variables

| Variable              | Description                     | Example                                                    |
| --------------------- | ------------------------------- | ---------------------------------------------------------- |
| `EXPO_PUBLIC_API_URL` | Base URL of the Django REST API | `https://github.com/Quenie-Ann/Skill-Link-Cdo-Backend.git` |

---

## Deployment Link

**Expo Go Demo:** Scan the QR code below or open the Expo link:
`exp://expo.dev/accounts/abragan.quenie/projects/Skill-Link-Cdo-Mobile)`

**APK (Android):****[Download the Android APK]((https://drive.google.com/drive/folders/1yP6lqjRRx24FHsiGGCCfzH02PZA37Iul?usp=drive_link))**

---

## Test Accounts

| Role           | Email                    | Password      |
| -------------- | ------------------------ | ------------- |
| Skilled Worker | worker.bernard.lim.electrician@skilllinkcdo.com | SkillLink2026! | 
| Resident       | resident.maria.santos.1@skilllinkcdo.com | SkillLink2026! |

---

## Team Members and Roles

| Name                     | Role |
| ------------------------ | ---- |
| [Abragan, Quenie Ann H.] |
| [Tubio, Johnlie P.]      |
| [Gaccion, Tirso Louise]  |

---

## Known Limitations

- **Expo Go distribution only.** The application is distributed via Expo Go for demonstration purposes. Native App Store / Play Store publication is not in scope for the pilot.
- **No offline mode.** All features require an active internet connection. The application does not cache job requests or worker profiles locally.
- **Notification polling.** Real-time push notifications are not implemented. The app polls the API for new notifications on screen focus and at a fixed interval.
- **Free-tier cold starts.** The Render-hosted backend services may hibernate after inactivity, causing the first request after a cold start to take up to 30 seconds.
- **GPS accuracy.** On devices where GPS hardware is unavailable or indoors, the location picker falls back to WiFi/IP triangulation, which is accurate to approximately 50–200 metres.

---

## Screenshots

