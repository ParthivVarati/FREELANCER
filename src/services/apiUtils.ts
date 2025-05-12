
import { toast } from 'sonner';

export async function handleApiError(error: unknown, defaultMessage: string): Promise<never> {
  console.error(defaultMessage, error);
  
  // Show more specific error message if available
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(defaultMessage);
  }
  
  throw error;
}

export async function fetchWithJson(url: string, options?: RequestInit) {
  try {
    console.log(`Making API request to: ${url}`, options);
    const response = await fetch(url, options);
    
    // Log response status for debugging
    console.log(`Response status from ${url}:`, response.status);
    
    // Try to parse as JSON even if response is not OK
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
      console.log(`Response data from ${url}:`, data);
    } else {
      const text = await response.text();
      console.log(`Response text from ${url}:`, text);
      try {
        // Try to parse text as JSON anyway
        data = JSON.parse(text);
      } catch (e) {
        // Not JSON, use text as error message
        data = { error: text || 'Unknown error' };
      }
    }
    
    if (!response.ok) {
      console.error('API request failed:', data);
      throw new Error(data.error || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
