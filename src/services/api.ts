
// Re-export all API functionality from separate modules
export * from './types';
export * from './apiUtils';

import { systemApi } from './systemApi';
import { providerApi } from './providerApi';
import { seekerApi } from './seekerApi';

// Combine all API methods under a single export
export const api = {
  ...systemApi,
  
  // Provider methods
  providerRegister: providerApi.register,
  providerLogin: providerApi.login,
  searchSeekers: providerApi.searchSeekers,
  
  // Seeker methods
  seekerRegister: seekerApi.register,
  seekerLogin: seekerApi.login,
  getSeekerProfile: seekerApi.getProfile,
};
