let datosOriginales = [];

let endpointActual = ''; // variable global

async function mostrarTabla(endpoint) {
  endpointActual = endpoint; // guardar para poder usarlo después
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`);
    if (!response.ok) throw new Error("Error en la respuesta del servidor");

    const data = await response.json();
    datosOriginales = data;
    renderizarTabla(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("No se pudieron cargar los datos.");
  }
}

function obtenerEndpointActual() {
  return endpointActual;
}

//Reenderizar la tabla con los datos obtenidos
// y filtrar los resultados según la búsqueda
function renderizarTabla(usuarios) {
  const tbody = document.querySelector('#tablaDatos tbody');
  tbody.innerHTML = '';

  usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.id_Usuarios}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.Apellido_1}</td>
      <td>${usuario.Apellido_2}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="habilitarEdicion(this)">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${obtenerEndpointActual()}', '${usuario.id_Usuarios}')">Eliminar</button>

      </td>
    `;
    tbody.appendChild(fila);
  });
}
function filtrarTabla() {
  const filtro = document.getElementById('busqueda').value.toLowerCase();
  const filtrados = datosOriginales.filter(u =>
    u.nombre.toLowerCase().includes(filtro) || 
    u.id_Usuarios.toLowerCase().includes(filtro)
  );
  renderizarTabla(filtrados);
}

// Funciones para habilitar la edición de un usuario y guardar los cambios
function habilitarEdicion(botonEditar) {
  const fila = botonEditar.closest('tr');
  const celdas = fila.querySelectorAll('td');
  const id = celdas[0].textContent;

  // Guardamos valores actuales
  const valoresActuales = {
    id_Usuarios: celdas[0].textContent,
    nombre: celdas[1].textContent,
    Apellido_1: celdas[2].textContent,
    Apellido_2: celdas[3].textContent,
  };

  // Convertimos celdas a inputs
  for (let i = 1; i <= 3; i++) {
    const valor = celdas[i].textContent;
    celdas[i].innerHTML = `<input type="text" value="${valor}" class="form-control form-control-sm">`;
  }

  // Cambiar botones
  celdas[4].innerHTML = `
    <button class="btn btn-sm btn-success me-1" onclick="guardarCambios(this, '${id}')">Guardar</button>
    <button class="btn btn-sm btn-secondary" onclick="cancelarEdicion(this, ${JSON.stringify(valoresActuales).replace(/"/g, '&quot;')})">Cancelar</button>
  `;
}


// Función para eliminar un usuario
async function eliminarUsuario(endpoint, id) {
  if (!confirm(`¿Estás seguro de eliminar al usuario con ID ${id}?`)) return;

  try {
    const response = await fetch(`http://localhost:3000/${endpoint}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Error al eliminar el usuario');

    alert('Usuario eliminado correctamente');
    mostrarTabla(endpoint); // Recargar tabla
  } catch (error) {
    console.error('Error al eliminar:', error);
    alert('No se pudo eliminar el usuario');
  }
}


//Formulario Para Agregar Usuarios
document.getElementById('formularioAgregar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const colonia = document.getElementById('coloniaSeleccionada').value;
  const endpoint = `usuarios${colonia}`;

  const datos = {
    id_Usuarios: document.getElementById('idInput').value,
    nombre: document.getElementById('nombreInput').value,
    Apellido_1: document.getElementById('apellido1Input').value,
    Apellido_2: document.getElementById('apellido2Input').value
  };

  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!response.ok) throw new Error('Error al agregar el usuario');

    alert('Usuario agregado correctamente');
    mostrarTabla(endpoint); // Actualiza la tabla de la colonia seleccionada
    e.target.reset(); // Limpia el formulario
  } catch (error) {
    console.error("Error:", error);
    alert("Error al agregar el usuario");
  }
});


