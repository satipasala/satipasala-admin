// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyCWKJCl_d43CkR-GPdgZuOpqj2jYR9ISwM",
    authDomain: "admin.satipasala.org",
    databaseURL: "https://satipasala-org.firebaseio.com",
    projectId: "satipasala-org",
    storageBucket: "satipasala-org.appspot.com",
    messagingSenderId: "394335345045",
    appId: "1:394335345045:web:9bea491c390c5dc0037e9c",
    measurementId: "G-06M3TC7W10"
  },
  functions: {
    resetUserPasswordUrl : 'api/resetAuthUserPassword',
  },
  googleCharts:{
    mapsApiKey:'AIzaSyCWKJCl_d43CkR-GPdgZuOpqj2jYR9ISwM'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
