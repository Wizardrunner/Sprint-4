Para evitar error CORS (Cross-Origin Resource Sharing) 

Opción 1:
Instalar live-server localmente. Abre la terminal, navega hasta el directorio de tu proyecto y ejecuta:

npm install live-server --save-dev


Opción 2:
Arreglar permisos globales: Si quieres instalar paquetes globalmente, es posible que debas corregir tus permisos globales de npm. Sin embargo, generalmente se recomienda evitar el uso de sudo con npm. Puedes utilizar un administrador de paquetes como nvm (Node Version Manager) para administrar las instalaciones de Node.js sin requerir permisos elevados.

Si está utilizando nvm, puedes reinstalar live-server sin -g:

npm install -g npx
npx live-server


Opción 3: Usa otro servidor de desarrollo: si tienes problemas con el servidor en vivo, puedes probar con otros servidores de desarrollo, como el servidor http. Instálalo localmente en tu proyecto:

npm install http-server --save-dev


Luego, usa npx http-server para iniciar el servidor desde el directorio de tu proyecto.


Elige la opción que mejor se adapte a tus preferencias y requisitos del proyecto. Si no estás seguro, la instalación local en tu proyecto es una opción segura y evita posibles problemas de permisos globales de npm.
