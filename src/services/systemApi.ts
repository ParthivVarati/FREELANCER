
import { API_BASE_URL } from './types';
import { handleApiError } from './apiUtils';
import { toast } from 'sonner';

export const systemApi = {
  // Initialize database
  initDatabase: async () => {
    try {
      console.log('Initializing database...');
      const response = await fetch(`${API_BASE_URL}/init-db`);
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Database initialization failed:', data);
        toast.error(data.error || 'Failed to initialize database');
        return { success: false, error: data.error, details: data.details };
      }
      
      console.log('Database initialized successfully:', data);
      toast.success(data.message || 'Database initialized successfully');
      return { success: true, data };
    } catch (error) {
      console.error('Database initialization error:', error);
      return handleApiError(error, 'Failed to initialize database');
    }
  },
  
  // Test database connection
  testDbConnection: async () => {
    try {
      console.log('Testing database connection...');
      const response = await fetch(`${API_BASE_URL}/test-db-connection`);
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Database connection test failed:', data);
        toast.error(data.error || 'Failed to connect to database');
        return { success: false, error: data.error };
      }
      
      console.log('Database connection successful:', data);
      toast.success(data.message || 'Database connection successful');
      return { success: true, data };
    } catch (error) {
      console.error('Database connection test error:', error);
      return handleApiError(error, 'Failed to test database connection');
    }
  }
};
