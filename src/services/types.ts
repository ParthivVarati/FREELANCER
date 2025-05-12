// Types for authentication and users
export interface AuthFormFields {
  email: string;
  password: string;
  name?: string;
  phone_number?: string;
  phone?: string; // For backward compatibility
  skill?: string;
  years_of_experience?: number;
  experience?: number | string; // Updated to accept string from forms
  location?: string;
  time_period?: string;
  timePeriod?: string; // For backward compatibility
  base_price?: number;
  basePrice?: number | string; // Updated to accept string from forms
}

export interface User {
  id: number;
  name: string;
  email: string;
  skill?: string;
  experience?: number;
  years_of_experience?: number; // Added for API compatibility
  location?: string;
  timePeriod?: string;
  time_period?: string; // Added for API compatibility
  basePrice?: number;
  base_price?: number; // Added for API compatibility
  rating?: number;
  reviews?: number;
  userType: 'provider' | 'seeker';
}

export interface Seeker {
  id: string | number;
  name: string;
  skill: string;
  experience: number;
  location: string;
  timePeriod: string;
  basePrice: number;
  rating: number;
  reviews: number;
}

export interface SearchCriteria {
  skill: string;
  location: string;
  timePeriod: string;
  rating: string | number;
}

// API Base URL - Make sure this points to your running backend server
export const API_BASE_URL = 'http://localhost:5000/api';
