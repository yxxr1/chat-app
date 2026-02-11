export const COMMON_CONFIG = {
  API_URL: __API_URL__ || 'http://localhost:8080',
  WS_URL: __WS_URL__ || 'ws://localhost:8080/ws',
};

export const REFRESH_URL = `${COMMON_CONFIG.API_URL}/api/auth/refresh`;
