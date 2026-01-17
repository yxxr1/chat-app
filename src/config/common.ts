export const COMMON_CONFIG = {
  API_URL: process.env.API_URL || 'http://localhost:8080',
  WS_URL: process.env.WS_URL || 'ws://localhost:8080/ws',
};

export const REFRESH_URL = `${COMMON_CONFIG.API_URL}/api/auth/refresh`;
