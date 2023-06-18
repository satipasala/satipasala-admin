// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDq7wkS8ljAGLbRMe0K52iExNGkKJvr_zw",
    authDomain: "satipasala-develop-cbc9a.firebaseapp.com",
    databaseURL: "https://satipasala-develop-cbc9a.firebaseio.com",
    projectId: "satipasala-develop-cbc9a",
    storageBucket: "satipasala-develop-cbc9a.appspot.com",
    messagingSenderId: "69737142593",
    appId: "1:69737142593:web:5d3cb6e8f30750b67a29c0",
    measurementId: "G-GSW6VB7K1B"
  },
  functions: {
    resetUserPasswordUrl : 'api/resetAuthUserPassword',
  },
  googleCharts:{
    mapsApiKey:'AIzaSyDZ-Y3B25JTvQQ-C_eHoqE6-Lf93eMz_fg'
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
