
'use strict';

const urlBase = 'https://api.openligadb.de/getavailableteams';

export function obtenerEquipos(liga, temporada) {

    let url = urlBase + '/' +
        encodeURIComponent(liga) + '/' +
        encodeURIComponent(temporada);

    return fetch(url)

        .then(function(response) {

            if (!response.ok) {
                throw new Error(
                    'Error al consultar los equipos: ' + response.status
                );
            }

            return response.json();

        });

}

export function obtenerEstadisticasEquipo(liga, temporada, idEquipo) {

    let url = 'https://api.openligadb.de/getbltable/' +
        encodeURIComponent(liga) + '/' +
        encodeURIComponent(temporada);

    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error al consultar las estadísticas');
            }

            return response.json();
        })
        .then(function(clasificacion) {
            return clasificacion.find(function(equipo) {
                return equipo.teamInfoId === idEquipo;
            });
        });
}