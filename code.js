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
let animationActive = false;
var intervalID = null;


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


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

// Defino variables que almacenen el RGB objetivo de los píxeles.
// Lo defino acá porque deben persistir al loop
let targetRed, targetGreen, targetBlue;
targetRed = targetGreen = targetBlue = 0;

function colorize() {
    console.warn('La animación está: ' + animationActive);
    //Recorre la matriz de píxeles y genera colores aleatóreos.

    let contadorDePixeles = 0;

    for (let row = 0; row < screenHeight / pixelSize; row++) {
        for (let column = 0; column < screenWidth / pixelSize; column++) {

            contadorDePixeles++;

            let currentRed, currentGreen, currentBlue;
            if (animationActive) {
                //Si la animación está activa, tengo que incrementar el valor desde el actual hasta el target

                //Primero detecto el valor actual del rgb
                let currentBGC = d.getElementById(`r${row}c${column}`).style.backgroundColor;
                //console.log('currentBGC es ' + currentBGC);
                currentRed = currentBGC.slice(4, currentBGC.indexOf(',', 4));
                //console.log('Luego del slice, currentRed es ' + currentRed);
                currentGreen = currentBGC.slice(currentBGC.indexOf(',', 4) + 1, currentBGC.indexOf(',', currentBGC.indexOf(',', 4) + 1));
                //console.log('Luego del slice, currentGreen es ' + currentGreen);
                currentBlue = currentBGC.slice(currentBGC.lastIndexOf(',') + 1, currentBGC.indexOf(')'));
                //console.log('Luego del slice, currentBlue es ' + currentBlue);
                //console.warn('separador gráfico en consola');

                // Ahora tengo que incrementar el current, sin excederme del target
                if (currentRed < 255) currentRed++;
                if (currentGreen < 255) currentGreen++;
                if (currentBlue < 255) currentBlue++;

                // En el caso de que los valores current se hayan excedido del target, se vuelven a sortear los target
                if (currentRed >= targetRed) {
                    targetRed = Math.floor(Math.random() * 256);
                    //console.log('Resetié targetRed, ahora es ' + targetRed);
                }
                if (currentGreen >= targetGreen) {
                    targetGreen = Math.floor(Math.random() * 256);
                    //console.log('Resetié targetGreen, ahora es ' + targetGreen);
                }
                if (targetBlue >= targetBlue) {
                    targetBlue = Math.floor(Math.random() * 256);
                    //console.log('Resetié targetBlue, ahora es ' + targetBlue);
                }



            } else {
                // Si la animación no está activa, entonces en cada vez que se ejecute esto se debe emitir un nuevo RGB para los pixeles
                currentRed = Math.floor(Math.random() * 256);
                currentGreen = Math.floor(Math.random() * 256);
                currentBlue = Math.floor(Math.random() * 256);
                console.error('la animación no está activa. entré acá');
            }

            if (blackAndWhiteActive) {
                //Si es B&N, entonces cada canal tiene el mismo valor
                currentGreen = currentBlue = currentRed;
            }

            // Guardo el RGB en el pixel
            d.getElementById(`r${row}c${column}`).style.backgroundColor = `rgb(${currentRed},${currentGreen},${currentBlue})`;
        }
    }

    console.warn(contadorDePixeles + ' pixeles actualmente');

    if (animationActive) {
        // En el caso de que la variable animationActive esté activa, debo loopear
        setTimeout(() => {
            window.requestAnimationFrame(colorize);
        }, 3000);

        console.warn('solicité un frame');

        /* Esto sirve con setinterval, con requestanimationframe no 
        // Primero me fijo si ya existía un intervalo
        if (intervalID == null) {
            intervalID = setInterval(colorize, 2000);
            console.warn('se inicia el intervalo' + intervalID);
        }*/
    }
    /* Esto sirve con setinterval, con requestanimationframe no
        if (!animationActive && intervalID != null) {
            clearInterval(intervalID);
            console.log('cerré el intervalo ' + intervalID);
            intervalID = null;
        }*/
}



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
    colourActive = false;
    d.getElementById('checkboxcolour').checked = false;
}

function toggleColour() {
    colourActive = !colourActive;
    blackAndWhiteActive = false;
    d.getElementById('checkboxbw').checked = false;
}

function toggleAnimation() {
    animationActive = !animationActive;
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