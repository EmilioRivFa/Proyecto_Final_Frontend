document.getElementById("usuarios").addEventListener("click", function () {
  fetch("usuarios.html")
    .then(response => response.text())
    .then(data => {
      // Crear contenedor temporal
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      // Extraer solo el body o el contenido principal
      const contenido = tempDiv.querySelector('body')?.innerHTML || tempDiv.innerHTML;

      // Insertar el contenido en el div
      document.getElementById("menu-content").innerHTML = contenido;

      // Cargar el JS de esa sección si es necesario
      const script = document.createElement('script');
      script.src = 'js/usuarios.js';
      document.body.appendChild(script);
    })
    .catch(error => console.error("Error al cargar la sección Usuarios:", error));
});
