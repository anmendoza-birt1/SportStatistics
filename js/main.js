'use strict'

var url = 'https://api.openligadb.de/getavailablesports';

let barraprincipal = document.getElementById('barra_ppal');

let barrasecundaria = document.getElementById('barra_secundaria');

obtenerDeportes()
    .then (function (data){
        let datos = data
        pintar(datos)
    })
    .catch(function (error){
        console.log(error)
    })

function obtenerDeportes() {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error en la consulta: ' + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            console.log('Consulta correcta');
            return data;
        })
        .catch(function(error) {
            throw error;
        });
}

function pintar(datos) {
    datos.forEach(function(deporte) {
        let botonppal = document.createElement('button');
            botonppal.addEventListener('click', function() {
            mostrarOpciones(deporte);
            });
        if (deporte.sportName != 'Test') {
            botonppal.textContent = deporte.sportName;
            barraprincipal.appendChild(botonppal);
        }
    });
}

function mostrarOpciones(deporte) {
    let botonsec = document.createElement('button');
    console.log('Has entrado en las segunda función');
}