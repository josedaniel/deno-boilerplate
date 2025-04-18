# Custom instructions for Copilot

- Este projecto está escrito para deno 2.0 o superior.
- El entrypoint se llama main.ts
- Todos los comentarios en el código deben ser en inglés
- los comentarios en el código pueden utilizar emoji para hacerlos más visuales, pero sin exagerar.

- Usa un archivo deno.jsonc para guardas las configuraciones, que deben ir debidamente documentadas:
    - con la tarea start se corre ```deno run --allow-net --allow-env main.ts```
    - con la tarea dev se corre ```deno run --allow-net --allow-env --watch main.ts```
    - con la tare compile se corre ```deno compile --allow-net main.ts```
    - se usan tabs
    - el import map está en deno-import-map.json

- el proyecto utiliza oak
- se utiliza drizzle orm con sqlite
- el archivo de base de datos se debe guardar en la carpeta assets.
- la carpeta pública es assets/public
- el template engine es handlebars.
- los paquetes deben traerse siempre que se pueda de jsr, o en su defecto de npm
- las variables de entorno se guardan en el archivo .env. Se debe usar este archivo para guardar variables de entorno siempre que sea posible.
- el proyecto corre en el puerto 8080
- se utiliza drizzle studio, que debe escuchar en el puerto 8081