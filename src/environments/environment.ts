// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
	apiKey: "AIzaSyBCiaiTbxYb-KAgi7dR36qwpnEAfCscsgs",
    authDomain: "music-store-87d22.firebaseapp.com",
    databaseURL: "https://music-store-87d22.firebaseio.com",
    projectId: "music-store-87d22",
    storageBucket: "music-store-87d22.appspot.com",
    messagingSenderId: "243088971993"
  }
};
