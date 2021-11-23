// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_API_URL = 'http://localhost:3000';
// const BASE_API_URL = 'http://bankapp.aziznal.com:3000';

export const environment = {
  production: false,

  baseApiUrl: BASE_API_URL,

  accessTokenCookieName: 'super_secret_cookie',

  API: {
    REGISTER: BASE_API_URL + '/register',
    LOGIN: BASE_API_URL + '/auth/login',
    VERIFY_TOKEN: BASE_API_URL + '/auth/verify',

    USERS: {
      GET_USER_DATA: BASE_API_URL + '/u',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
