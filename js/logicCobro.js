let metrosGastados = prompt('¿Cuántos metros gastaste?');
metrosGastados = parseFloat(metrosGastados); // Asegurar que sea número

let total = 0;
let mantenimiento = 20;

function calcularPrecio(metros) {
    let costo = 0;

    if (metros <= 15) {
        costo = metros * 9;
    } else if (metros <= 30) {
        // primeros 15 a $9, el resto (hasta 30) a $16
        costo = (15 * 9) + ((metros - 15) * 16);
    } else {
        // primeros 15 a $9, los siguientes 15 a $16, el resto a $20
        costo = (15 * 9) + (15 * 16) + ((metros - 30) * 20);
    }

    return costo;
}

total = calcularPrecio(metrosGastados) + mantenimiento;

console.log("Tus metros son: " + metrosGastados);
console.log("Tu pago total es: $" + total);






// 0-15 = $9 pesos
//16-30 = $16 pesos
// 30-> = $20 pesos



//Mas mantenimineto 20 por mes
