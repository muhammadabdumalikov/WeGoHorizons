import React, {createContext, useState, useEffect, useContext} from 'react';
import storage, {IS_ADMIN_KEY} from '../shared/storage';

interface AuthContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const loadAdminStatus = () => {
      const storedValue = storage.getString(IS_ADMIN_KEY);
      setIsAdmin(storedValue === 'true');
    };
    loadAdminStatus();
  }, []);

  const toggleAdmin = () => {
    const newValue = !isAdmin;
    storage.set(IS_ADMIN_KEY, newValue.toString());
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
