// Import necessary libraries
import posthog from 'posthog-js';

// Initialize for Product Analytics
posthog.init('YOUR_PROJECT_API_KEY', {
  api_host:'YOUR_REVERSE_PROXY',
  person_profiles: 'identified_only'
});
