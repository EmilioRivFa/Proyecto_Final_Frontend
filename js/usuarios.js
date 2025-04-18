function mostrarTabla(id) {
    const tablas = document.querySelectorAll('.tabla');
    tablas.forEach(tabla => tabla.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }