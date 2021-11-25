const BASE_API_URL = 'http://bankapp.aziznal.com:3000';

export const environment = {
  production: true,

  baseApiUrl: BASE_API_URL,

  accessTokenCookieName: 'super_secret_cookie',
  accessTokenCookieDomain: 'bankapp.aziznal.com',

  API: {
    REGISTER: BASE_API_URL + '/auth/register',
    LOGIN: BASE_API_URL + '/auth/login',
    VERIFY_TOKEN: BASE_API_URL + '/auth/verify',

    USERS: {
      GET_USER_DATA: BASE_API_URL + '/u',
      UPDATE_ACCOUNT_INFO: BASE_API_URL + '/u/update-user',
      GET_TRANSACTIONS: BASE_API_URL + '/u/transactions',
      GET_SIMPLIFIED_TRANSACTIONS:
        BASE_API_URL + '/u/transactions?forChart=true',

      GET_ACCOUNTS: BASE_API_URL + '/u/accounts',
      NEW_BANKING_ACCOUNT: BASE_API_URL + '/u/create-account',
      UPDATE_BANKING_ACCOUNT: BASE_API_URL + '/u/update-account',
      DELETE_BANKING_ACCOUNT: BASE_API_URL + '/u/delete-account',
      SEND_MONEY: BASE_API_URL + '/u/send-money',
      BORROW_MONEY: BASE_API_URL + '/u/borrow-money',
    },
  },
};
