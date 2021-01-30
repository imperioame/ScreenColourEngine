/*
 * Definiciones 
 */

const d = document;
const canvas = d.getElementById('canvas');
//let screenHeight = window.screen.height;
//let screenWidth = window.screen.width;

const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

let pixelSize = 4;

let blackAndWhiteActive = true;
let colourActive = false;

/*
 * Función constructora 
 */

function construct() {
    // Función que arma la matríz de píxeles
    // calculando el alto y ancho de la pantalla

    //console.log('Altura:' + screenHeight);
    //console.log('Ancho:' + screenWidth);

    for (let row = 0; row < screenHeight / pixelSize; row++) {
        //Recorro y creo fila por fila, hasta llegar al alto total de la pantalla
        //console.log('iteración fila');

        //Creo el elemento html
        let rowhtml = d.createElement('div');
        rowhtml.classList.add('pixelrow');
        // Lo inserto
        canvas.append(rowhtml);

        for (let column = 0; column < screenWidth / pixelSize; column++) {
            //Recorro y creo columna por columna, hasta llegar al ancho total de la pantalla
            //console.log('iteración pixel');

            //Creo el elemento html
            let pixelhtml = d.createElement('span');
            pixelhtml.setAttribute('id', `r${row}c${column}`);;
            pixelhtml.classList.add('pixel');
            //Lo inserto
            canvas.lastChild.append(pixelhtml);
        }
    }

}

/*
 * Funciones generadoras de color. 
 */

function colorize() {
    //Recorre la matriz de píxeles y genera colores aleatóreos.

    for (let row = 0; row < screenHeight / pixelSize; row++) {
        for (let column = 0; column < screenWidth / pixelSize; column++) {
            let red, green, blue;
            if (blackAndWhiteActive) {
                //Si es B&N, entonces cada canal tiene el mismo valor
                red = Math.floor(Math.random() * 256);
                green = blue = red;
            } else {
                // Si es a color, cada canal tiene valores fdiferentes
                red = Math.floor(Math.random() * 256);
                green = Math.floor(Math.random() * 256);
                blue = Math.floor(Math.random() * 256);
            }

            d.getElementById(`r${row}c${column}`).style.backgroundColor = `rgb(${red},${green},${blue})`;
        }
    }

}

/*
// El requestanimationframe con una función callback ANONIMA para poder pasarle parámetros
// Usar función anónima es la única forma de poder llamar funciones con parámetros
// (la función anónima lo único que hace es llamar a la función que me interesa, pasando parámetro)
window.requestAnimationFrame(function(){
    blackAndWhite()
});
*/



/*
 * Funciones adicionales 
 */

function timer() {
    return false;
}

function rRandom() {
    return Math.floor(Math.random() * screenHeight / pixelSize);
}

function cRandom() {
    return Math.floor(Math.random() * screenWidth / pixelSize);
}



/*
 * Funciones de interfaz 
 */
function toggleAside() {
    d.getElementById('aside').classList.toggle('hidden');
    d.getElementById('rendericon').classList.toggle('hidden');
}

function toggleBW() {
    blackAndWhiteActive = !blackAndWhiteActive;
    colourActive = false
    d.getElementById('checkboxcolour').checked = false;
}

function toggleColour() {
    colourActive = !colourActive;
    blackAndWhiteActive = false
    d.getElementById('checkboxbw').checked = false;
}






/*
 * Funciones constructoras.
 * Se deben ajustar a posterior, por ahora se ejecutan cuando se actualiza la página
 */

function develop() {
    construct();
    colorize();

    //Esto de acá abajo es el randomizer para el black&white
    //window.requestAnimationFrame(blackAndWhite);
}

window.onload = develop();