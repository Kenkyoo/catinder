🐱 Catinder

Catinder es una aplicación web que utiliza TheCatAPI para mostrar imágenes aleatorias de gatos, donde los usuarios pueden interactuar seleccionando "Me gusta" o rechazándolas, similar al funcionamiento de Tinder. Las imágenes favoritas se almacenan y se pueden visualizar en una galería.

🚀 Funcionalidades

    Explorar Gatos: Se muestra una imagen aleatoria de un gato.
    Interacción: Los usuarios pueden hacer clic en "Me gusta" para guardar la imagen en favoritos o en "Rechazar" para mostrar una nueva.
    Galería de Favoritos: Una sección para visualizar las imágenes de gatos guardadas.
    Eliminación de Favoritos: Posibilidad de eliminar todas las imágenes guardadas de la galería.

🛠️ Tecnologías utilizadas

    Frontend:
        HTML5, CSS3
        PureCSS (Framework CSS ligero)
        JavaScript ES6+
        Fancybox (Visualización de imágenes)
        Tabby.js (Sistema de pestañas)
        SweetAlert2 (Alertas personalizadas)

    API:
        TheCatAPI (Para obtener imágenes de gatos y gestionar favoritos)

    Herramientas:
        Parcel (Bundler de aplicaciones)
        Vercel (Hosting y despliegue)

 🌐 Despliegue en Vercel

    Subir a GitHub: Asegúrate de subir tu proyecto a un repositorio público o privado.

    Configurar Vercel:
        Ve a Vercel y crea un nuevo proyecto.
        Selecciona el repositorio de GitHub y despliega el proyecto.

    Configurar rutas (opcional): Si encuentras problemas de enrutamiento, crea un archivo vercel.json con la siguiente configuración:

       {
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}


👨‍💻 Uso

    Navega por imágenes de gatos: Al abrir la aplicación, verás una imagen aleatoria de un gato.

    Interacción:
        Haz clic en "Me gusta" (❤️) para guardar la imagen en favoritos.
        Haz clic en "Rechazar" (❌) para mostrar una nueva imagen.

    Galería de favoritos:
        Haz clic en la pestaña "Favoritos" para ver las imágenes guardadas.
        Usa el botón "Borrar Favoritos" para eliminar todas las imágenes de la galería.

📂 Estructura del proyecto

catinder/
├── css/
│   ├── grid.css
│   ├── style.css
│   └── tabby-ui.min.css
├── js/
│   ├── script.js
│   ├── tabby.polyfills.min.js
│   └── ...
├── app.js
├── index.html
├── package.json
├── README.md
└── vercel.json

📜 Licencia

Este proyecto está licenciado bajo la MIT License. Puedes usarlo y modificarlo como quieras. ¡Espero que te diviertas explorando gatos!
