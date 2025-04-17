document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const nombreInput = document.getElementById('nombreUsuario');
    const metrosInput = document.getElementById('metrosConsumidos');
    const medidorInput = document.getElementById('numeroMedidor');
    const lecturaAnteriorInput = document.getElementById('lecturaAnterior');
    const lecturaActualInput = document.getElementById('lecturaActual');
    const fechaInput = document.getElementById('fecha')
    const asambleaInput = document.getElementById('faltaAsamblea')
    const multaInput = document.getElementById('multaRetraso')
    const resultadoTotal = document.getElementById('resultadoTotal');
    const botonPagar = document.getElementById('button')
    


    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaActual = `${año}-${mes}-${dia}`;
    
    // Asignar la fecha al input
    document.getElementById('fecha').value = fechaActual;




    //OPERACION DEL PAGO


    botonPagar.addEventListener('click', (e) => {
        e.preventDefault();

        let lecturaActual = parseFloat(lecturaActualInput.value);
        let total = 0;
        const mantenimiento = 20;

        function calcularPrecio(metros) {
            let costo = 0;
            if (metros <= 15) {
                costo = metros * 9;
            } else if (metros <= 30) {
                costo = (15 * 9) + ((metros - 15) * 16);
            } else {
                costo = (15 * 9) + (15 * 16) + ((metros - 30) * 20);
            }
            return costo;
        }

        total = calcularPrecio(lecturaActual) + mantenimiento;

        if (asambleaInput.checked) total += 200;
        if (multaInput.checked) total += 50;

        // Mostrar el resultado en pantalla
        resultadoTotal.textContent = `Total a Pagar: $${total.toFixed(2)}`;
    });
});





// 0-15 = $9 pesos
//16-30 = $16 pesos
// 30-> = $20 pesos



//Mas mantenimineto 20 por mes

    
    
    

