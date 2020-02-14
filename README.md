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

## Info content project

- Use Template Driven and Reactive Forms
- Use Firebase Database and Authentication system.
- Use **Resolver** to runs code before some routes is loaded to ensure that certain data the route depends on is there.
- Use **Intercept Service** to add user token to the Database requests
- Use **BehaviourSubject** user to emit the value emit previously even if you are not subscribed at the moment that is emitted and use **take(1)** to subscribe and unsubscribe 1 time.
- Use **Guard** to prevent users not authenticated go to recipes page and redirect usin **URLTree**.


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

## Info Firebase

- Nos creamos un proyecto en Firebase
- Nos creamos una Realtime Database (en test mode). Haremos las HTTP requests a la URL que nos proporcionan
- En las reglas de la Database pondremos la instrucción de que solo se puede escribir y leer si estas auth
- Habilitaremos la authentication a través de email en la página de authentication
- Para obtener la API_KEY de nuestro backend de Firebase iremos a Configuracón del proyecto dandole a la rueda en la consola de Firebase.
- Si queremos desplegar nuestro app en un Firebase hosting habrás que seguir estos [pasos](https://firebase.google.com/docs/hosting?hl=es)




## Puntos presentación proyecto
Aplicación para guardar recetas e ingredientes para la lista de la compra
# Firebase
- Creamos un proyecto en Firebase e integraremos la parte de:
  database (guardar las recipes)
  authentication (tipo de authentication email, usando API generada automaticamente)
  hosting (sincronizando tu proyecto con Firebase y poder desplegar.)

# Parte login
- Componente **auth.Guard** para:
   · redireccionarte a /auth cuando no estas logueado
   · impedir acceder a ciertas rutas (recipes) si no estas
- Componente **auth.service** para:
   · peticiones http para Login y SignUp usando la API de nuestro proyecto de Firebase
   · autologin cuando refrescas guardando token y manejo de errores
- **AuthInterceptorService** para interceptar todas las peticiones http a la base de datos 
  y añadir los headers de cuando te has autenticado
- El propio **AuthComponent** para manejar la parte la autenticación según des al boton de login o signup y
  navegues a /recipes si es correcto o te muestre un mensaje de error si es incorrecto

  ## Parte Header
  - Acceder a dos bloques principales (Recipes y shopping list)
  - Logout (remueve el token del localStorage y redirecciona a ruta /auth)
  - Save Data (Guardar en la database) y Fetch Data (que recoge las recetas guardadas en la database de Firebase). A traves del **data-storage.service**


  ## Parte bloque Recipes
  Esta formado por el componente general recipes, el cual esta dividido en dos componentes:
  · RecipeList. El cual genera un array de recipe-item component por cada receta
  · RecipeDetail. Que muestra los detalles de la recipe en la que hagas click recogiendo el id de la URL que 
    esta asociado a cierta receta y te muestra los detalles
    

  - El **recipes-service** es el que permite la comunicación entre los componentes del bloque Recipes
  - El componente **recipes-resolver.service** para estar subscrito al metodo FetchRecipes que te devuelve las 
    recetas y poder navegar al id de ciertas recetas sin tener que recoger las recetas antes de la base de datos

  - Luego en el RecipeDetail component tienes las funcionalidades de Editar una receta, eliminarla o añadir los 
    ingredientes a la shopping list (un array de ingredientes)


## Parte bloque Shopping list
  Esta formado por dos componentes:
  - El componente shopping-list principal que muestra una lista de los ingredientes que estarian añadidos para la compra 
  - Y dentro de este estaria metido el shopping-edit componente que se trata basicamente de un formulario, con el cual puedes 
    en un primer momento añadir ingredientes, pero si haces click sobre uno de los ingredientes del listado te da la opción de hacerle un update o eliminarlo.
