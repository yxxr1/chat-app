import { createContext, useContext } from 'react';

declare global {
  interface AppContext {}
}

const appContext = createContext<AppContext>({});

export const AppContextProvider = appContext.Provider;
export const useAppContext = () => useContext(appContext);
