
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User } from '../services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  providerLogin: (email: string, password: string) => Promise<void>;
  seekerLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userType: 'provider' | 'seeker' | null;
  checkAuthentication: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        console.log('User restored from localStorage:', userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  // New function to check authentication status
  const checkAuthentication = () => {
    const authenticated = !!user;
    if (!authenticated) {
      toast.error("Please login first");
    }
    return authenticated;
  };

  const providerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('AuthContext: Starting provider login process');
      const { token, user } = await api.providerLogin(email, password);
      
      if (!token || !user) {
        throw new Error('Invalid response from server');
      }
      
      // Ensure the user has the correct userType
      const providerUser = {
        ...user,
        userType: 'provider' as const
      };
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(providerUser));
      setUser(providerUser);
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Provider login error in context:', error);
      
      // Check if the error message exists and provide a more helpful message
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          toast.error('Unable to connect to the login server. Please check your network or ensure the backend server is running.');
        } else {
          toast.error(`Login failed: ${error.message}`);
        }
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const seekerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('AuthContext: Starting seeker login process');
      const { token, user } = await api.seekerLogin(email, password);
      
      // Ensure we have a valid user object
      if (!user || !token) {
        throw new Error('Invalid response from server');
      }
      
      // Ensure the user has the correct userType
      const seekerUser = {
        ...user,
        userType: 'seeker' as const
      };
      
      console.log('Seeker login successful, saving user data:', seekerUser);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(seekerUser));
      setUser(seekerUser);
      
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Seeker login error in context:', error);
      
      // Provide more helpful error messages based on the error type
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          toast.error('Unable to connect to the login server. Please check your network or ensure the backend server is running.');
        } else {
          toast.error(`Login failed: ${error.message}`);
        }
      } else {
        toast.error('Login failed. Please check your credentials and try again.');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        providerLogin, 
        seekerLogin, 
        logout, 
        isAuthenticated: !!user,
        userType: user ? (user.userType as 'provider' | 'seeker') : null,
        checkAuthentication
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
