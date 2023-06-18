// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {  
    databaseURL: "https://satipasala-dev.firebaseio.com",    
    measurementId: "G-GSW6VB7K1B",
    apiKey: "AIzaSyDAJU-Vt8BC_GbTkK4DSEiNux36AkslgiM",
    authDomain: "satipsala-dev.firebaseapp.com",
    projectId: "satipsala-dev",
    storageBucket: "satipsala-dev.appspot.com",
    messagingSenderId: "1004489113608",
    appId: "1:1004489113608:web:fdd80d701ccbbc8fe311bd"
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
