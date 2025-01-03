// Import necessary libraries
import * as Sentry from "@sentry/browser";

// Initialize for Error Tracking
Sentry.init({
  dsn: "YOUR_DSN",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
});
