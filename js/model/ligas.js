'use strict';

const urlligas = 'https://api.openligadb.de/getavailableleagues';

export function obtenerLigas() {

    return fetch(urlligas)

        .then(function(response) {

            if (!response.ok) {
                throw new Error('Error en ligas: ' + response.status);
            }

            return response.json();

        });
}