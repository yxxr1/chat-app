const TOKEN_KEY = '__api_access_token';

export const setToken = (token: string | undefined) => {
  if (token) {
    localStorage[TOKEN_KEY] = token;
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};
export const getToken = () => localStorage[TOKEN_KEY];
