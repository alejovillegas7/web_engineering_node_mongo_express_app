Aplicacion que ayuda a manjear la información de los estudiantes de un curso
* la aplicacion permite agregar estudiantes de un curso, editar su informacion, editar la informacion de varios estudantes por su edad, eliminar estudiante y sacarel promedio de las notas totales del curso, ver perfil de un estudiante.

Para correr la app se deben de seguir los siguientes pasos
* instalar mongoDb en la maquina local
* instalar mongo en la maquina
* descargar el repositorio
* en la carpeta del repositorio correr el comando "npm install" para instalar los paquetes
* poner a correr mongo con el comando "mongod" en una terminal a parte
* en la carpeta del repositorio correr "node app.js"
* la aplicacion empezará a correr en el puerto 3030 como se indica en la consola
* ingresar a "http://localhost:3030" desde el navegador
* interactuar con la app.

Para utilizar la API como endpoints
* abrir el archivo "app.js"
* toda instruccion que este definida como "res.render" cambiarla por "res.send"
* utilizar una app como POSTMAN para probar la API despues del paso anterior, utilziando las rutas definidas en el mismo archivo, ejemplo: "http://localhost:3030/students" (devolverá la info de todos los estudiantes en la base de datos) y asi puede consultar la informacion requerida.