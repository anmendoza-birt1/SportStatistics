
'use strict';

const loading = document.getElementById('loading');

let operacionesActivas = 0;

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


function mostrarCarga() {
    loading.classList.remove('oculto');
}


function ocultarCarga() {
    loading.classList.add('oculto');
}


export async function ejecutarConCarga(operacion) {

    operacionesActivas++;

    mostrarCarga();

    let inicio = Date.now();

    try {

        return await operacion();

    } finally {

        let transcurrido = Date.now() - inicio;

        if (transcurrido < 1000) {
            await delay(1000 - transcurrido);
        }

        operacionesActivas--;

        if (operacionesActivas === 0) {
            ocultarCarga();
        }

    }

}
