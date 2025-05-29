import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_ADMIN_KEY = 'isAdmin';

interface AuthContextType {
  isAdmin: boolean;
  toggleAdmin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loadAdminStatus = async () => {
      const storedValue = await AsyncStorage.getItem(IS_ADMIN_KEY);
      setIsAdmin(storedValue === 'true');
    };
    loadAdminStatus();
  }, []);

  const toggleAdmin = async () => {
    const newValue = !isAdmin;
    await AsyncStorage.setItem(IS_ADMIN_KEY, newValue.toString());
    setIsAdmin(newValue);
  };

  return (
    <AuthContext.Provider value={{isAdmin, toggleAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
