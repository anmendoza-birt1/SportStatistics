
'use strict';

const urldeportes = 'https://api.openligadb.de/getavailablesports';

export function obtenerDeportes() {

    return fetch(urldeportes)

        .then(function(response) {

            if (!response.ok) {
                throw new Error('Error en deportes: ' + response.status);
            }

            return response.json();

        });
}
