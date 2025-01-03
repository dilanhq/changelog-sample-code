// Import necessary libraries
import { datadogRum } from '@datadog/browser-rum';

// Initialize for Real User Monitoring
datadogRum.init({
  applicationId: 'YOUR_APPLICATION_ID',
  clientToken: 'YOUR_CLIENT_TOKEN',
  site: 'YOUR_DATADOG_SITE',
  service: 'YOUR_SERVICE',
  env: 'YOUR_ENV',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});
