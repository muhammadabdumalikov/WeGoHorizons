import React, {createContext} from 'react';

interface AuthContextType {}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
