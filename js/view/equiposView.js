
'use strict';

export function pintarEquipos(equipos, contenedor, accion) {

    contenedor.replaceChildren();

    if (equipos.length === 0) {
        contenedor.textContent = 'No se han encontrado equipos.';
        return;
    }

    equipos.forEach(function(equipo) {

        let tarjeta = document.createElement('button');
        tarjeta.classList.add('tarjeta-equipo');

        if (equipo.teamIconUrl) {
            let imagen = document.createElement('img');
            imagen.src = equipo.teamIconUrl;
            imagen.alt = 'Escudo de ' + equipo.teamName;
            tarjeta.appendChild(imagen);
        }

        let nombre = document.createElement('p');
        nombre.textContent = equipo.teamName;
        tarjeta.appendChild(nombre);

        tarjeta.addEventListener('click', function() {
            accion(equipo);
        });

        contenedor.appendChild(tarjeta);
    });
}


export function pintarNombreLiga(nombre) {

    document.getElementById('nombreLiga').textContent = nombre;

}


export function pintarEstadisticasEquipo(equipo) {

    let contenedor = document.getElementById('estadisticasEquipo');

    contenedor.replaceChildren();

    if (!equipo) {
        contenedor.textContent =
            'No hay estadísticas disponibles para este equipo.';
        return;
    }

    let titulo = document.createElement('h2');
    titulo.textContent = equipo.teamName;
    contenedor.appendChild(titulo);

    let datos = [
        ['Puntos', equipo.points],
        ['Victorias', equipo.won],
        ['Empates', equipo.draw],
        ['Derrotas', equipo.lost],
        ['Diferencia de goles', equipo.goalDiff]
    ];

    datos.forEach(function(dato) {
        let parrafo = document.createElement('p');
        parrafo.textContent = dato[0] + ': ' + dato[1];
        contenedor.appendChild(parrafo);
    });
}
