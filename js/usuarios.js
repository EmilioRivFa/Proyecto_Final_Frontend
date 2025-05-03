function mostrarTabla(id) {
    const tablas = document.querySelectorAll('.tabla');
    tablas.forEach(tabla => tabla.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  const filas = document.querySelectorAll("tbody tr");

filas.forEach(fila => {
  const celdas = fila.querySelectorAll("td");

  const numero = celdas[0].textContent;
  const nombre = celdas[1].textContent;
  const apellido = celdas[2].textContent;
  const apellido_materno=celdas[3].textContent;
  const Direccion=celdas[4].textContent;
  const Edad=celdas[5].textContent;
  const No_Telefono=celdas[6].textContent;


  const eneroInput = celdas[3].querySelector(".metros-input");
  const eneroCheck = celdas[3].querySelector(".mantenimiento-check");

  console.log(`${nombre} - Enero: ${eneroInput.value} m³, Mantenimiento: ${eneroCheck.checked}`);
});
