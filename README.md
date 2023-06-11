[![pipeline status](https://gitlab.com/satipasala/web-front-end/badges/develop/pipeline.svg)](https://gitlab.com/satipasala/web-front-end/commits/develop)
[![coverage report](https://gitlab.com/satipasala/web-front-end/badges/develop/coverage.svg)](https://gitlab.com/satipasala/web-front-end/commits/develop)

<p align="center"><img src="https://i1.wp.com/www.satipasala.org/wp-content/uploads/2017/06/cropped-Sati-Pasala-Logo.png?fit=281%2C90&ssl=1" width="450"></p>

# Sati Pasala

## Prerequisites

- Download and install [NPM](https://nodejs.org/en/download/) and [Git](https://git-scm.com/downloads)

- Create accounts with [Firebase](https://console.firebase.google.com/) and [GitLab](https://gitlab.com)

- Install Angular, Typescript, tslint, and Firebase tools using the terminal
```
npm install -g @angular/cli tslint typescript firebase-tools
```

* If you are behind a proxy server, [configure proxy settings](https://medium.com/platform-engineer/proxy-config-handbook-for-software-engineers-90de2a95ebdc) on your machine for NPM, Git, and Terminal.

************************************************
## Quick Start

Clone this repository.
```
git clone https://gitlab.com/satipasala/web-front-end.git
cd web-front-end
```

Install NPM dependencies.
```
npm install
```

Run the project locally.
```
npm start admin
npm start client
```

The app will run on `localhost` with the Angular's AoT Compiler. It will automatically reload if you change any of the source files.


************************************************
## Development

On terminal, clone the repository and set your GitLab username and email for the project. Also, change your branch.
```
git clone https://gitlab.com/satipasala/web-front-end.git
cd web-front-end

git config user.name "YOUR_GITLAB_USERNAME"
git config user.email "YOUR_GITLAB_CONNECTED_EMAIL"

git checkout user_ashen
```
On browser, navigate to [Firebase Console](https://console.firebase.google.com/) and create a new Firebase project. Click on the new project card to view the project dashboard.

On Firebase dashboard, enable Database (Go to `Develop` > `Database` > `Create Database` > `Start in test mode` > `Enable`)

On Firebase dashboard, enable Storage (Go to `Develop` > `Storage` > `Get Started` > `Got it`)

On Firebase dashboard, go to `Project Overview` and select the button with `</>` icon. Copy all the API keys and update your `environment.ts` files in the `app` directory: `apps/admin/src/environments/environment.ts`, `apps/client/src/environments/environment.ts`
```
// sample environment.ts file

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDhA3rMfUPF2239EIKUL2TYZV5dOvE6r4A",
    authDomain: "sati-pasala-web.firebaseapp.com",
    databaseURL: "https://sati-pasala-web.firebaseio.com",
    projectId: "sati-pasala-web",
    storageBucket: "sati-pasala-web.appspot.com",
    messagingSenderId: "370793632483"
  }
};
```

At the project root level, on `.firebaserc` file, update `projects.default` property to your firebase project ID shown in Firebase project settings (`Gear` icon next to `Project Overview` > `Project Settings` > `General`).

```
{
  "projects": {
    "default": "YOUR_PROJECT_ID",
    "develop": "......",
    "uat": "......",
    "staging": "......",
    "prod": "......"
  },
  ......
```

On the same `.firebaserc` file, add a new target for your project ID and a site ID for each webapp in our project (`client`, `admin`). If you use the Firebase free plan, both project ID and site ID are the same for you because free plan only allows us to create ony one site at a time. You need to upgrade Firebase plan to Pay-As-You-Go plan in order to create multiple sites for each project, which is not really necessary for development.

```
"targets": {
    "YOUR_PROJECT_ID": {
      "hosting": {
        "client": [
          "YOUR_SITE_ID"
        ]
      }
    },
```

On terminal, login to Firebase and select the `default` alias for your target project.

```
firebase login
firebase use default
firebase list
```
If you are using git bash, login with **--interactive** to force interactive mode.
```
firebase login --interactive
firebase use default
firebase list
```

Now prepare your app for deployment.

```
npm run build
npm run test
npm run compodoc:g
```

If you use a Firebase free plan, run this to deploy a site to Firebase.

```
firebase deploy --only hosting:client,database:client,functions:client,storage:client
```

In case if you have a Pay-As-You-Go plan, run this to deploy all sites of the target project to Forebase.

```
firebase deploy
```

## Ux desgns

* [Admin App](https://gitlab.com/satipasala/web-front-end/wikis/UX-design-admin-web-and-mobile)
* [Mobile App](https://gitlab.com/satipasala/web-front-end/wikis/UX-design-mobile-app)
* [Public Web](https://gitlab.com/satipasala/web-front-end/wikis/UX-design-public-web)
 
