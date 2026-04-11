/**
 * Backend API base URL (no trailing slash).
 * Local: set REACT_APP_API_URL in .env.local (e.g. http://localhost:5000)
 * Vercel: set REACT_APP_API_URL to your Render service URL (e.g. https://your-api.onrender.com)
 */
function getApiBaseUrl() {
  const raw = process.env.REACT_APP_API_URL || "http://localhost:5000";
  return raw.replace(/\/$/, "");
}

export const API_BASE_URL = getApiBaseUrl();

/** @param {string} path - API path starting with / */
export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${p}`;
}
