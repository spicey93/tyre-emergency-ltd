// Google Tag Manager initialization with consent mode
// This script sets up GTM with default consent denied, which will be updated by the cookie banner

// Default consent to denied - will be updated when user accepts
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to 'denied' as a placeholder
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});

// Note: The actual GTM script will be loaded by CookieConsent.astro
// only after the user grants analytics consent
