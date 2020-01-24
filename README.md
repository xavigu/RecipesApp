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


## Pasos a seguir para añadir las rutas
- Creamos el fichero app-routing module con las rutas
- Importamos la clase de dichero fichero al app.module
- Sustituimos la referencia a los dos componentes por la directica router-outlet
- Añadimos a los anchor(href) del navbar sus respectivos routerLink
- Añadimos el routerLinkActive al contenedor de los anchor para que añada la clase activa al elemento cuando este activado
- Eliminar ref elements to dont reload page
- Añadir children routes para cargar los componentes hijos de recipes
  (habrá que crear uno nuevo que sea el de por defecto cuando accedes al componente recipes (recipe-start))
  (otro sera el que al dar a un elemento del recipe-list component 
   comunique el id del recipe-item clickado (a través de un Input recoge el index del ngfor)
   utilizamos el routerLink para que vaya al recipe-detail component con la id especifica
   (creamos un metodo en el service que obtenga la recipe por id y en el recipe-detail este siempre escuchando por cambios en la URL
   para cargar la nueva receta con el metodo del servicio) 