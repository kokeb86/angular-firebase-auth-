// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  emailAPI: 'http://XXXXXX.com/contact-form.php',
  database: 'firebase',
  social: {
    role: 'Guest',
    fblink: 'https://www.facebook.com/elishconsulting',
    linkedin: 'https://www.linkedin.com/company/elish-consulting/about/?viewAsMember=true',
    github: 'https://github.com/AmitXShukla',
    emailid: 'info@elishconsulting.com'
  },
  socialAuthEnabled: true,
  firebase:{
              apiKey: "AIzaSyBZ0gx8cny0z8hNGAw_V-43o8m0I-vjDyg",
                  authDomain: "tenant-based-app.firebaseapp.com",
                  projectId: "tenant-based-app",
                  storageBucket: "tenant-based-app.firebasestorage.app",
                  messagingSenderId: "1042117894452",
                  appId: "1:1042117894452:web:ded11d345b3164f6cac561",
                  measurementId: "G-37VCGCCCEY"
            }
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
