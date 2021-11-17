const BASE_API_URL = 'http://bankapp.aziznal.com:3000';

export const environment = {
  production: false,

  baseApiUrl: BASE_API_URL,

  accessTokenCookieName: 'super_secret_cookie',

  API: {
    REGISTER: BASE_API_URL + '/register',
    LOGIN_URL: BASE_API_URL + '/auth/login',
    VERIFY_TOKEN: BASE_API_URL + '/auth/verify',
  },
};
