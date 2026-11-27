
'use strict';

export function pintarEquipos(equipos, contenedor) {

    contenedor.replaceChildren();

    if (equipos.length === 0) {

        contenedor.textContent = 'No se han encontrado equipos.';

        return;
    }

    equipos.forEach(function(equipo) {

        let tarjeta = document.createElement('div');

        tarjeta.classList.add('tarjeta-equipo');

        // Escudo del equipo

        if (equipo.teamIconUrl) {

            let imagen = document.createElement('img');

            imagen.src = equipo.teamIconUrl;
            imagen.alt = 'Escudo de ' + equipo.teamName;

            tarjeta.appendChild(imagen);

        }

        // Nombre del equipo

        let nombre = document.createElement('p');

        nombre.textContent = equipo.teamName;

        tarjeta.appendChild(nombre);

        // Añadimos la tarjeta al contenedor

        contenedor.appendChild(tarjeta);

    });

}


export function pintarNombreLiga(nombre) {

    document.getElementById('nombreLiga').textContent = nombre;

}
