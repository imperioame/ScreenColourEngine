/*
 * Definiciones 
 */

const d = document;
const canvas = d.getElementById('canvas');
const html = d.querySelector('html');
//let screenHeight = window.screen.height;
//let screenWidth = window.screen.width;

const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

const pixelSizeSlider = d.getElementById('pixelSizeSlider');
const pixelSizeValue = d.getElementById('pixelSizeValue');
let pixelSize = pixelSizeSlider.value;
html.style.setProperty('--pixel-size', pixelSize + 'px');
pixelSizeValue.innerHTML = pixelSize + 'px';


let blackAndWhiteActive = true;
let colourActive = false;
let animationActive = false;
var animationFrameID = null;

let rowQuantity, columnQuantity;


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

/*
 * Función constructora 
 */

function construct() {
    rowQuantity = 0;
    columnQuantity = 0;
    // Función que arma la matríz de píxeles
    // calculando el alto y ancho de la pantalla

    //console.log('Altura:' + screenHeight);
    //console.log('Ancho:' + screenWidth);


    // Primero, vacío el canvas
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }

    // Luego paro todas las posibles animaciones
    if (animationFrameID != null) {
        window.cancelAnimationFrame(animationFrameID);
        animationFrameID = null;
    }

    for (let row = 0; row < screenHeight / pixelSize; row++) {
        //Recorro y creo fila por fila, hasta llegar al alto total de la pantalla
        //console.log('iteración fila');

        //Creo el elemento html
        let rowhtml = d.createElement('div');
        rowhtml.classList.add('pixelrow');
        // Lo inserto
        canvas.append(rowhtml);
        rowQuantity++;

        let currentColumnQuantity = 0;

        for (let column = 0; column < screenWidth / pixelSize; column++) {
            //Recorro y creo columna por columna, hasta llegar al ancho total de la pantalla
            //console.log('iteración pixel');

            //Creo el elemento html
            let pixelhtml = d.createElement('span');
            pixelhtml.setAttribute('id', `r${row}c${column}`);
            pixelhtml.dataset.targetRed = 0;
            pixelhtml.dataset.targetGreen = 0;
            pixelhtml.dataset.targetBlue = 0;
            pixelhtml.classList.add('pixel');
            pixelhtml.style.backgroundColor = '';
            //Lo inserto
            canvas.lastChild.append(pixelhtml);
            currentColumnQuantity++;
            if (currentColumnQuantity > columnQuantity) columnQuantity++;
        }
    }

    console.log('cantidad de filas total: ' + rowQuantity);
    console.log('cantidad de columnas total: ' + columnQuantity);

}

/*
 * Funciones generadoras de color. 
 */

// Defino variables que almacenen el RGB objetivo de los píxeles.
// Lo defino acá porque deben persistir al loop
function colorize() {
    console.warn('La animación está: ' + animationActive);
    //Recorre la matriz de píxeles y genera el color correspondiente (B&N o colorizado).

    let contadorDePixeles = 0;

    for (let row = 0; row < rowQuantity; row++) {
        for (let column = 0; column < columnQuantity; column++) {
            contadorDePixeles++;

            let currentPixel = d.getElementById(`r${row}c${column}`);
            let currentBGC = currentPixel.style.backgroundColor;
            let targetRed = currentPixel.dataset.targetRed;
            let targetGreen = currentPixel.dataset.targetGreen;
            let targetBlue = currentPixel.dataset.targetBlue;

            let currentRed, currentGreen, currentBlue;
            if (animationActive) {
                //Si la animación está activa, tengo que incrementar el valor desde el actual hasta el target

                //Primero detecto el valor actual del rgb
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
                if (blackAndWhiteActive) {
                    //Si es B&N, entonces cada canal tiene el mismo valor
                    currentGreen = currentBlue = currentRed;
                } else {
                    // No es B&N, cada canal tiene su propio valor
                    if (currentGreen < 255) currentGreen++;
                    if (currentBlue < 255) currentBlue++;
                }


                // En el caso de que los valores current se hayan excedido del target, se vuelven a sortear los target y resetean los current
                if (currentRed >= targetRed) {
                    currentPixel.dataset.targetRed = Math.floor(Math.random() * 256);
                    currentRed = 0;

                    if (blackAndWhiteActive) {
                        // Si es B&N entonces todos los target son iguales
                        currentPixel.dataset.targetGreen = currentPixel.dataset.targetBlue = currentPixel.dataset.targetRed;
                        // Y para no tener un flash cyan, acá mismo le pongo a todos el mismo valor de brillo
                        currentGreen = currentBlue = currentRed;
                    }
                }
                if (!blackAndWhiteActive) {
                    // Si no es B&N, entonces cada canal puede tener su target, y se debe evaluar por separado.
                    if (currentGreen >= targetGreen) {
                        currentPixel.dataset.targetGreen = Math.floor(Math.random() * 256);
                        currentGreen = 0;
                    }
                    if (currentBlue >= targetBlue) {
                        currentPixel.dataset.targetBlue = Math.floor(Math.random() * 256);
                        currentBlue = 0;
                    }
                }


            } else {
                // Si la animación no está activa, entonces en cada vez que se ejecute esto se debe emitir un nuevo RGB para los pixeles
                currentRed = Math.floor(Math.random() * 256);
                if (blackAndWhiteActive) {
                    //Si es B&N, entonces cada canal tiene el mismo valor
                    currentGreen = currentBlue = currentRed;
                } else {
                    // No es B&N, cada canal tiene su propio valor
                    currentGreen = Math.floor(Math.random() * 256);
                    currentBlue = Math.floor(Math.random() * 256);
                }
                console.error('la animación no está activa. entré acá');
            }



            // Guardo el RGB en el pixel
            currentPixel.style.backgroundColor = `rgb(${currentRed},${currentGreen},${currentBlue})`;
        }
    }

    console.warn(contadorDePixeles + ' pixeles actualmente');

    if (animationActive) {
        // En el caso de que la variable animationActive esté activa, debo loopear

        animationFrameID = window.requestAnimationFrame(colorize);
        console.log('el animationframe es: ' + animationFrameID);

        console.log('Black and white on: ' + blackAndWhiteActive);
        console.log('Color on: ' + colourActive);

    }
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
    colourActive = !colourActive;
    d.getElementById('checkboxcolour').checked = !(d.getElementById('checkboxcolour').checked);
    //console.log('color: ' + colourActive + ', black and white: ' + blackAndWhiteActive);
}

function toggleColour() {
    colourActive = !colourActive;
    blackAndWhiteActive = !blackAndWhiteActive;
    d.getElementById('checkboxbw').checked = !(d.getElementById('checkboxbw').checked);
    //console.log('color: ' + colourActive + ', black and white: ' + blackAndWhiteActive);
}

function toggleAnimation() {
    animationActive = !animationActive;
    if (animationFrameID != null) {
        window.cancelAnimationFrame(animationFrameID);
        animationFrameID = null;
    }

}

pixelSizeSlider.oninput = function () {
    console.log('estas modificando el tamaño del pixel');
    pixelSize = this.value;
    pixelSizeValue.innerHTML = pixelSize + 'px';
    html.style.setProperty('--pixel-size', pixelSize + 'px');
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