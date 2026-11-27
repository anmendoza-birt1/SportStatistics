
'use strict';

export function pintar(datos, barra, obtenerTexto, accion) {

    barra.replaceChildren();

    datos.forEach(function(elemento) {

        let boton = document.createElement('button');

        boton.textContent = obtenerTexto(elemento);

        boton.addEventListener('click', function() {
            accion(elemento);
        });

        barra.appendChild(boton);

    });

}
