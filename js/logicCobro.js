//Logica Cobro.js
document.addEventListener('DOMContentLoaded', () => {
    const fechaInput = document.getElementById('fecha');
    const nombreInput = document.getElementById('nombreUsuario');
    const medidorInput = document.getElementById('numeroMedidor');
    const lecturaAnteriorInput = document.getElementById('lecturaAnterior');
    const lecturaActualInput = document.getElementById('lecturaActual');
    const asambleaInput = document.getElementById('faltaAsamblea');
    const multaInput = document.getElementById('multaRetraso');
    const resultadoTotal = document.getElementById('resultadoTotal');
    const botonPagar = document.getElementById('button');
    const botonImprimir = document.getElementById('btnImprimirPDF');

    fechaInput.value = new Date().toISOString().split('T')[0];

    let totalCalculado = 0;

    botonPagar.addEventListener('click', async (e) => {
    e.preventDefault();

    const lecturaAnterior = parseFloat(lecturaAnteriorInput.value);
    const lecturaActual = parseFloat(lecturaActualInput.value);

    if (isNaN(lecturaAnterior) || isNaN(lecturaActual) || lecturaActual < lecturaAnterior) {
        alert("Por favor ingresa lecturas válidas.");
        return;
    }

    const metros = lecturaActual - lecturaAnterior;
    const mantenimiento = 20;

    function calcularPrecio(metros) {
        if (metros <= 15) return metros * 9;
        if (metros <= 30) return (15 * 9) + ((metros - 15) * 16);
        return (15 * 9) + (15 * 16) + ((metros - 30) * 20);
    }

    let total = calcularPrecio(metros) + mantenimiento;
    const faltaAsamblea = asambleaInput.checked;
    const multa = multaInput.checked;

    if (faltaAsamblea) total += 200;
    if (multa) total += 50;

    totalCalculado = total;
    resultadoTotal.textContent = `Total a Pagar: $${total.toFixed(2)} MXN`;

    // 💾 GUARDAR EN BASE DE DATOS
    const medidor = medidorInput.value.trim();
    let endpoint = "";
    if(medidor.startsWith("VE")) {
        endpoint = 'lecturasVega';
    }else if(medidor.startsWith("CE")) {
        endpoint = 'lecturasCerrito';
    }else if(medidor.startsWith("EN")) {
        endpoint = 'lecturasEncinos';
    }else if(medidor.startsWith("OX")) {
        endpoint = 'lecturasOxthoc';
    }else if(medidor.startsWith("CO")) {
        endpoint = 'lecturasColonia';
    } else {
        alert("Número de medidor no válido. Por favor, verifica el prefijo del medidor.");
    }   
        
    const data = {
        NumeroMedidor: medidorInput.value.trim(),
        Fecha: fechaInput.value,
        LecturaAnterior: lecturaAnterior,
        LecturaActual: lecturaActual,
        Consumo: metros,
        Monto: total,
        FaltaAsamblea: faltaAsamblea,
        MultaRtraso: multa
    };

    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const msg = await response.text();
            alert('Error al guardar en la base de datos:\n' + msg);
            return;
        }

        const resData = await response.json();
        console.log('Lectura guardada:', resData);
        alert('Lectura guardada correctamente');
    } catch (error) {
        console.error('Error al enviar datos al backend:', error);
        alert('Error al guardar lectura en el servidor');
    }

});


    botonImprimir.addEventListener('click', () => {
        if (totalCalculado === 0) {
            alert("Por favor, calcula el total antes de intentar imprimir.");
            return;
        }

        const fecha = fechaInput.value;
        const nombre = nombreInput.value.trim();
        const medidor = medidorInput.value.trim();
        const lecturaAnterior = lecturaAnteriorInput.value;
        const lecturaActual = lecturaActualInput.value;
        const metros = parseFloat(lecturaActual) - parseFloat(lecturaAnterior);
        const faltaAsamblea = asambleaInput.checked ? "Sí" : "No";
        const multa = multaInput.checked ? "Sí" : "No";
        const total = totalCalculado.toFixed(2);

        if (!nombre || !medidor || isNaN(metros)) {
            alert("Completa todos los datos antes de intentar imprimir.");
            return;
        }

        const queryParams = new URLSearchParams({
            fecha,
            nombre,
            medidor,
            lecturaAnterior,
            lecturaActual,
            metros,
            asamblea: faltaAsamblea,
            multa,
            total
        });

        window.open(`ticket.html?${queryParams.toString()}`, '_blank');
        //Limpiar campos después de imprimir
        lecturaAnteriorInput.value = '';
        lecturaActualInput.value = '';
        medidorInput.value = '';
        nombreInput.value = '';
        resultadoTotal.textContent = '';
    });
});
window.cargarUsuario = async function () {
    const numeroMedidor = document.getElementById('numeroMedidor').value.trim();
    const nombreInput = document.getElementById('nombreUsuario');
    const lecturaAnteriorInput = document.getElementById('lecturaAnterior');

    if (!numeroMedidor) return;

    try {
        // Cargar nombre del usuario
        const response = await fetch(`http://localhost:3000/usuariosTotal/${numeroMedidor}`);
        if (response.ok) {
            const data = await response.json();
            nombreInput.value = data.NombreCompleto || 'Nombre no registrado';
        } else {
            nombreInput.value = '';
            console.warn('Medidor no encontrado');
        }

        // Cargar última lectura actual como lectura anterior
        const lecturaRes = await fetch(`http://localhost:3000/ultimaLectura/${numeroMedidor}`);
        if (lecturaRes.ok) {
            const lecturaData = await lecturaRes.json();
            if (lecturaData.LecturaActual) {
                lecturaAnteriorInput.value = lecturaData.LecturaActual;
            }
        } else {
            lecturaAnteriorInput.value = '';
        }

    } catch (error) {
        console.error('Error al buscar usuario o lectura:', error);
        nombreInput.value = '';
        lecturaAnteriorInput.value = '';
    }
};
