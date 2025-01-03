import { createAuth0Client } from '@auth0/auth0-spa-js';

let identityClient = null;

const configureClient = async () => {
  try {
    identityClient = await createAuth0Client({
      domain: 'YOUR_DOMAIN',
      clientId: 'YOUR_CLIENT_ID',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    });
  } catch (error) {
    alert('Failed to configure authentication. Please try again later.');
  }
};

const handleAuthentication = async () => {
  const query = window.location.search;

  if (query.includes('state=') && query.includes('code=')) {
    try {
      const { appState } = await identityClient.handleRedirectCallback();
      const targetUrl = appState?.targetUrl || localStorage.getItem('auth_returnTo') || '/';
      localStorage.removeItem('auth_returnTo');
      window.location.replace(targetUrl);
    } catch (error) {
      alert('Authentication failed. Please try logging in again.');
    }
  }
};

const checkAuthentication = async () => {
  try {
    const isAuthenticated = await identityClient.isAuthenticated();

    if (!isAuthenticated) {
      const currentUrl = window.location.href;
      localStorage.setItem('auth_returnTo', currentUrl);
      await identityClient.loginWithRedirect({
        appState: { targetUrl: currentUrl }
      });
    } else {
      await getAccessToken();
    }
  } catch (error) {
    alert('An error occurred during authentication. Please refresh the page.');
  }
};

const getAccessToken = async () => {
  try {
    const token = await identityClient.getTokenSilently();
  } catch (error) {
  }
};

const initializeApp = async () => {
  await configureClient();
  await handleAuthentication();
  await checkAuthentication();
};

initializeApp().catch(error => {
  alert('Initialization error. Please try reloading the page.');
});

const logout = () => {
  try {
    identityClient.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  } catch (error) {
  }
};
