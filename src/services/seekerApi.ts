
import { API_BASE_URL, AuthFormFields, Seeker, User } from './types';
import { handleApiError, fetchWithJson } from './apiUtils';
import { toast } from 'sonner';

export const seekerApi = {
  register: async (formData: AuthFormFields) => {
    try {
      console.log('Registering seeker with data:', formData);
      
      // Normalize data to ensure consistent field names
      const apiData = {
        name: formData.name || '',
        phone_number: formData.phone_number || formData.phone || '',
        email: formData.email,
        password: formData.password,
        skill: formData.skill || '',
        years_of_experience: typeof formData.years_of_experience === 'number' 
          ? formData.years_of_experience 
          : (typeof formData.experience === 'number' 
              ? formData.experience 
              : parseInt(String(formData.experience || '0'))),
        location: formData.location || '',
        time_period: formData.time_period || formData.timePeriod || '',
        base_price: typeof formData.base_price === 'number' 
          ? formData.base_price 
          : (typeof formData.basePrice === 'number' 
              ? formData.basePrice 
              : parseFloat(String(formData.basePrice || '0')))
      };
      
      console.log('Normalized API data for registration:', apiData);
      return await fetchWithJson(`${API_BASE_URL}/seeker/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
    } catch (error) {
      console.error('Seeker registration error:', error);
      return handleApiError(error, 'Registration failed');
    }
  },
  
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    try {
      console.log('Logging in seeker with email:', email);
      
      // Check if we are in the development environment or deployed
      const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
      
      // For deployed environments, check if API is accessible
      if (isProduction && API_BASE_URL.includes('localhost')) {
        console.warn('Using localhost API from a deployed environment may cause connectivity issues');
        
        // Simulate login for demonstration purposes when API is not accessible
        // This is a temporary solution until proper backend is configured
        if (email && password) {
          toast.warning('Using mock login as API appears inaccessible');
          
          // Create a mock user for testing purposes
          const mockUser: User = {
            id: 999,
            name: email.split('@')[0],
            email: email,
            skill: 'Web Development',
            experience: 3,
            location: 'Remote',
            timePeriod: 'Full-time',
            basePrice: 50,
            rating: 4.5,
            reviews: 10,
            userType: 'seeker'
          };
          
          return {
            token: 'mock-token-for-testing',
            user: mockUser
          };
        }
      }
      
      // Proceed with normal API login
      const response = await fetchWithJson(`${API_BASE_URL}/seeker/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log('Seeker login response data:', response);
      
      // Ensure the user has the correct format with all required fields
      const userData: User = {
        id: response.user.id,
        name: response.user.name || '',
        email: response.user.email,
        skill: response.user.skill || '',
        experience: response.user.experience || response.user.years_of_experience || 0,
        location: response.user.location || '',
        timePeriod: response.user.timePeriod || response.user.time_period || '',
        basePrice: response.user.basePrice || response.user.base_price || 0,
        rating: response.user.rating || 0,
        reviews: response.user.reviews || 0,
        userType: 'seeker'
      };
      
      return {
        token: response.token,
        user: userData
      };
    } catch (error) {
      console.error('Seeker login error in context:', error);
      
      // Check if the error is related to network connectivity
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error('Unable to connect to the API server. Please ensure your backend is running and accessible.');
      }
      
      throw error; // Let the context handle the error
    }
  },
  
  getProfile: async (seeker_id: string): Promise<Seeker> => {
    try {
      return await fetchWithJson(`${API_BASE_URL}/seeker/${seeker_id}`);
    } catch (error) {
      return handleApiError(error, 'Failed to get seeker profile');
    }
  }
};
