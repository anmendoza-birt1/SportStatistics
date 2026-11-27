
'use strict';

import { obtenerEquipos } from '../model/equipos.js';

import {
    pintarEquipos,
    pintarNombreLiga
} from '../view/equiposView.js';

import { ejecutarConCarga } from '../view/cargaView.js';


// CONTENEDOR DE EQUIPOS

let contenedorEquipos = document.getElementById('contenedorEquipos');


// RECUPERAR LOS PARÁMETROS DE LA URL

let parametros = new URLSearchParams(window.location.search);

let liga = parametros.get('liga');
let temporada = parametros.get('temporada');
let nombre = parametros.get('nombre');


// INICIAR LA PÁGINA

export function iniciarEquipos() {

    // Comprobamos que tenemos los parámetros necesarios

    if (!liga || !temporada) {

        contenedorEquipos.textContent =
            'No se ha especificado una liga o temporada válida.';

        return;
    }


    // Mostramos el nombre de la liga

    pintarNombreLiga(nombre || liga);


    // Consultamos los equipos

    ejecutarConCarga(function() {

        return obtenerEquipos(liga, temporada);

    })

    .then(function(equipos) {

        pintarEquipos(equipos, contenedorEquipos);

    })

    .catch(function(error) {

        console.log('Error al obtener los equipos:', error);

        contenedorEquipos.textContent =
            'No se han podido cargar los equipos.';

    });

}
