# RecipesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deploy in Firebase

Throw the command `firebase deploy` in master branch

## Configure husky and prettier in an Angular application to standardize and automatize the code format

- [Link](https://www.daptontechnologies.com/angular-prettier-husky/)

## Info content course project

- Use Template Driven and Reactive Forms
- Use Firebase Database and Authentication system.
- Use **Resolver** to runs code before some routes is loaded to ensure that certain data the route depends on is there.
- Use **Intercept Service** to add user token to the Database requests
- Use **BehaviourSubject** user to emit the value emit previously even if you are not subscribed at the moment that is emitted and use **take(1)** to subscribe and unsubscribe 1 time.
- Use **Guard** to prevent users not authenticated go to recipes page and redirect usin **URLTree**.

## Info Firebase

- Nos creamos un proyecto en Firebase
- Nos creamos una Realtime Database (en test mode). Haremos las HTTP requests a la URL que nos proporcionan
- En las reglas de la Database pondremos la instrucción de que solo se puede escribir y leer si estas auth
- Habilitaremos la authentication a través de email en la página de authentication
- Para obtener la API_KEY de nuestro backend de Firebase iremos a Configuracón del proyecto dandole a la rueda en la consola de Firebase.
- Las APIs para el manejo de la autenticación estan en su página [oficial](https://firebase.google.com/docs/reference/rest/auth#section-create-email-password)
- Si queremos desplegar nuestro app en un Firebase hosting habrás que seguir estos [pasos](https://firebase.google.com/docs/hosting?hl=es)
