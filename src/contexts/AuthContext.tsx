import React, { useEffect } from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { getItem, removeItem, storeItem } from '../utilities/asyncStorage';

type Props = {
  children: ReactNode;
};

export interface AuthContext {
  setCredentials: (username?: string) => void;
  logOut: ()=>void;
  username: string | null;
}

export const AuthContext = createContext<AuthContext>({
  setCredentials(token?: string) {
    return;
  },
  logOut(){
    return;
  },
  username: null,
});

export const AuthContextProvider = ({ children }: Props) => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const username = await getItem('username');
      if (username) {
        setUsername(username);
      }
    };
    asyncEffect();
  }, []);

  const setCredentials = (username?: string) => {
    if (username) {
      setUsername(username);
      storeItem('username', username);
    }
  };

  const logOut = () =>{
    if (username) {
      setUsername(null);
      removeItem('username');
    }
  };

  return <AuthContext.Provider value={{ username, setCredentials,logOut }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
