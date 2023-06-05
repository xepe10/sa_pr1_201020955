# INGRUP PortalWeb PowerBi

## Installl dependencias

```
$ npm install

```

## Ejecutar en modo desarrollo

```
$ npm run dev

```

## Compilar y ejecutar para producción
```
$ npm run build
$ npm run start

```

# ORM

Sequelize v6.31.0

(Documentación)[https://sequelize.org/]

## Config

## Models

## Seeders

## Migrations

# DB

Postgresql v6.31.0

## Diagrama E-R

# API

```
Ruta: /pages/api
```
Se aprovecha el motor de rutas de nextJs para incluir la api dentro de la aplicación bajo la ruta '/api'

## Autenticación JWT

- Al realizar el login se almacena en almacenamiento global el token generado por la API.
- Se tiene un servicio /services/user.service.js que se encarga de exponer los metodos para obtener los datos del usuario logueado.
- El archivo /helpers/fetch-wrapper.js es el que se utiliza para realizar las llamadas a la API.

## REST

La API implementa el estandar arquitectonico REST para acceder y modificar la información a traves de http.

- Dentro de la carpeta /pages/api se almacenan todos los modelos para los cuales se tendra disponible REST
- Por cada modelo se deben tener dos archivos (index.js, [id].js) para habilitar las siguientes rutas: /model, /model/[id]
- Se tiene la interfaz REST en el archivo /helpers/api/rest.js

# React-admin

# Desing system

(mdbootstrap)[https://mdbootstrap.com/docs/standard/extended/]

# React Admin

(react-admin)[https://codesandbox.io/s/github/marmelab/react-admin/tree/master/examples/tutorial?file=/src/App.tsx]

# Permisos

cada pagina es un permiso y su identificador es la URL