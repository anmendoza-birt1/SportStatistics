
'use strict';

// URLs para lanzar las consultas get
var urldeportes = 'https://api.openligadb.de/getavailablesports';
var urlligas = 'https://api.openligadb.de/getavailableleagues';

// Acceso a los elementos del dom
let barraprincipal = document.getElementById('barra_ppal');
let barrasecundaria = document.getElementById('barra_sec');
let barraterciaria = document.getElementById('barra_ter');
let barracuarta = document.getElementById('barra_cuar');

//Elemento para almacenar las ligas
let ligasDeporte = [];

//Consulta automática al iniciar la aplicación
obtenerDeportes()
    .then(function(deportes) {
        let deportesFiltrados = deportes.filter(function(deporte) {
            return deporte.sportName !== 'Test';
        });

        pintar(
            deportesFiltrados,
            barraprincipal,
            function(deporte) {
                return deporte.sportName;
            },
            function(deporte) {
                seleccionarDeporte(deporte);
            }
        );
    })
    .catch(function(error) {
        console.log(error);
    });


// CONSULTA GET DE DEPORTES
function obtenerDeportes() {
    return fetch(urldeportes)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error en la consulta: ' + response.status);
            }

            return response.json();
        });
}


// CONSULTA GET DE LIGAS
function obtenerLigas() {
    return fetch(urlligas)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Error en la consulta: ' + response.status);
            }

            return response.json();
        });
}


// 2. SELECCIONAR DEPORTE Y MOSTRAR TEMPORADAS
function seleccionarDeporte(deporte) {

    // Limpiamos las barras inferiores
    barrasecundaria.replaceChildren();
    barraterciaria.replaceChildren();

    obtenerLigas()
        .then(function(ligas) {

            // Filtramos las ligas del deporte seleccionado
            ligasDeporte = ligas.filter(function(liga) {
                return liga.sport.sportId === deporte.sportId;
            });

            // Extraemos las temporadas sin repetir
            let temporadas = [...new Set(
                ligasDeporte.map(function(liga) {
                    return liga.leagueSeason;
                })
            )];

            // Ordenamos de más reciente a más antigua
            temporadas.sort(function(a, b) {
                return Number(a) - Number(b);
            });

            // Pintamos las temporadas en la segunda barra
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
            console.log(error);
        });
}


// 3. SELECCIONAR TEMPORADA Y MOSTRAR LIGAS
function seleccionarTemporada(temporada) {

    barraterciaria.replaceChildren();

    // Filtramos por la temporada seleccionada
    let ligasFiltradas = ligasDeporte.filter(function(liga) {
        return liga.leagueSeason === temporada;
    });

    // Pintamos las ligas en la tercera barra
    pintar(
        ligasFiltradas,
        barraterciaria,
        function(liga) {
            return liga.leagueName;
        },
        function(liga) {
            console.log('Liga seleccionada:', liga);
            // Aquí podrás añadir después la consulta de partidos
        }
    );
}


// FUNCIÓN GENÉRICA PARA PINTAR BOTONES
function pintar(datos, barra, obtenerTexto, accion) {

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