// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC-gONTXQlSuIwc6W6_mwlI0KHV057sKgA",
    authDomain: "ng-fitness-tracker-aa337.firebaseapp.com",
    databaseURL: "https://ng-fitness-tracker-aa337.firebaseio.com",
    projectId: "ng-fitness-tracker-aa337",
    storageBucket: "ng-fitness-tracker-aa337.appspot.com",
    messagingSenderId: "873850565063"
  }
};
