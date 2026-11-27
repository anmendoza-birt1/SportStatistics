
'use strict';

import { obtenerDeportes } from '../model/deportes.js';
import { obtenerLigas } from '../model/ligas.js';

import { pintar } from '../view/deportesView.js';
import { pintarEstadisticas } from '../view/estadisticasView.js';
import { ejecutarConCarga } from '../view/cargaView.js';


let barraprincipal = document.getElementById('barra_ppal');
let barrasecundaria = document.getElementById('barra_sec');
let barraterciaria = document.getElementById('barra_ter');
let barracuarta = document.getElementById('barra_cuar');


let deportesDisponibles = [];
let todasLasLigas = [];
let ligasDeporte = [];


// INICIAR APLICACIÓN

export function iniciarAplicacion() {

    ejecutarConCarga(function() {

        return Promise.all([
            obtenerDeportes(),
            obtenerLigas()
        ]);

    })

    .then(function(datos) {

        deportesDisponibles = datos[0].filter(function(deporte) {
            return deporte.sportName !== 'Test';
        });

        todasLasLigas = datos[1];


        pintar(
            deportesDisponibles,
            barraprincipal,

            function(deporte) {
                return deporte.sportName;
            },

            function(deporte) {
                seleccionarDeporte(deporte);
            }
        );


        pintarEstadisticas(
            deportesDisponibles.length,
            todasLasLigas.length,
            deportesDisponibles.length + todasLasLigas.length
        );

    })

    .catch(function(error) {
        console.log('Error al iniciar la aplicación:', error);
    });

}


// SELECCIONAR DEPORTE

function seleccionarDeporte(deporte) {

    ejecutarConCarga(function() {

        barrasecundaria.replaceChildren();
        barraterciaria.replaceChildren();
        barracuarta.replaceChildren();

        ligasDeporte = todasLasLigas.filter(function(liga) {
            return liga.sport.sportId === deporte.sportId;
        });


        let temporadas = [...new Set(

            ligasDeporte.map(function(liga) {
                return liga.leagueSeason;
            })

        )];


        temporadas.sort(function(a, b) {
            return Number(b) - Number(a);
        });


        pintar(
            temporadas,
            barrasecundaria,

            function(temporada) {
                return temporada;
            },

            function(temporada) {
                seleccionarTemporada(temporada);
            }
        );

    })

    .catch(function(error) {
        console.log('Error al seleccionar deporte:', error);
    });

}


// SELECCIONAR TEMPORADA

function seleccionarTemporada(temporada) {

    ejecutarConCarga(function() {

        barraterciaria.replaceChildren();
        barracuarta.replaceChildren();

        let ligasFiltradas = ligasDeporte.filter(function(liga) {
            return liga.leagueSeason === temporada;
        });


        pintar(
            ligasFiltradas,
            barraterciaria,

            function(liga) {
                return liga.leagueName;
            },

            function(liga) {
                    window.location.href =
            'equipos.html?liga=' +encodeURIComponent(liga.leagueShortcut) +
            '&temporada=' +encodeURIComponent(liga.leagueSeason) +
            '&nombre=' +encodeURIComponent(liga.leagueName);
            }
        );

    })

    .catch(function(error) {
        console.log('Error al seleccionar temporada:', error);
    });

}
