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

    botonPagar.addEventListener('click', (e) => {
        e.preventDefault(); // Evita el envío del formulario y la recarga de la página

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
        if (asambleaInput.checked) total += 200;
        if (multaInput.checked) total += 50;

        totalCalculado = total;
        resultadoTotal.textContent = `Total a Pagar: $${total.toFixed(2)} MXN`;
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
    });
});