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
let animationActive = true;
let animationFrameID = null;
let pingPongAnimation = true;
let animationSpeed = d.getElementById('animationSpeed').value;
d.getElementById('animationSpeedValue').innerHTML = animationSpeed;
d.getElementById('animationSpeed').addEventListener('input', refreshSpeedValue);

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
            pixelhtml.dataset.pingPongLoopRedAdd = true;
            pixelhtml.dataset.pingPongLoopGreenAdd = true;
            pixelhtml.dataset.pingPongLoopBlueAdd = true;
            pixelhtml.classList.add('pixel');
            pixelhtml.style.backgroundColor = 'rgb(0,0,0)';
            //Lo inserto
            canvas.lastChild.append(pixelhtml);
            currentColumnQuantity++;
            if (currentColumnQuantity > columnQuantity) columnQuantity++;
        }
    }

    console.info('cantidad de filas total: ' + rowQuantity);
    console.info('cantidad de columnas total: ' + columnQuantity);

}

/*
 * Funciones generadoras de color. 
 */

// En esta función recorro la matriz y genero el color.
// En el caso de que la animación esté activa, recorre y evalúa si el valor actual del RGB es menor o igual al valor TARGET de RGB.
// En caso de que actual haya superado a TARGET, se resetea el valor de ese canal a 0, y sortea un nuevo target.
function colorize() {
    //console.warn('La animación está: ' + animationActive);
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
            let pingPongLoopRedAdd = currentPixel.dataset.pingPongLoopRedAdd == 'true' ? true : false;
            let pingPongLoopGreenAdd = currentPixel.dataset.pingPongLoopGreenAdd == 'true' ? true : false;
            let pingPongLoopBlueAdd = currentPixel.dataset.pingPongLoopBlueAdd == 'true' ? true : false;

            let currentRed, currentGreen, currentBlue;
            if (animationActive) {
                //Si la animación está activa, tengo que incrementar el valor desde el actual hasta el target

                //Primero detecto el valor actual del rgb
                //console.log('currentBGC es ' + currentBGC);
                currentRed = parseInt(currentBGC.slice(4, currentBGC.indexOf(',', 4)));
                //console.log('Luego del slice, currentRed es ' + currentRed);
                currentGreen = parseInt(currentBGC.slice(currentBGC.indexOf(',', 4) + 2, currentBGC.indexOf(',', currentBGC.indexOf(',', 4) + 1)));
                //console.log('Luego del slice, currentGreen es ' + currentGreen);
                currentBlue = parseInt(currentBGC.slice(currentBGC.lastIndexOf(',') + 2, currentBGC.indexOf(')')));
                //console.log('Luego del slice, currentBlue es ' + currentBlue);
                //console.warn('separador gráfico en consola');


                // Ahora tengo que incrementar o decrementar el current, sin excederme del target
                if (currentRed < 255 && pingPongLoopRedAdd) {
                    currentRed += 1 * animationSpeed;
                } else if (currentRed > 0 && !pingPongLoopRedAdd) {
                    currentRed -= 1 * animationSpeed;
                } else if (currentRed == 0 && !pingPongLoopRedAdd) currentPixel.dataset.pingPongLoopRedAdd = true;
                if (blackAndWhiteActive) {
                    //Si es B&N, entonces cada canal tiene el mismo valor
                    currentGreen = currentBlue = currentRed;
                } else {
                    // No es B&N, cada canal tiene su propio valor
                    if (currentGreen < 255 && pingPongLoopGreenAdd) currentGreen += 1 * animationSpeed;
                    if (currentGreen > 0 && !pingPongLoopGreenAdd) currentGreen -= 1 * animationSpeed;
                    if (currentGreen == 0 && !pingPongLoopGreenAdd) currentPixel.dataset.pingPongLoopGreenAdd = true;
                    if (currentBlue < 255 && pingPongLoopBlueAdd) currentBlue += 1 * animationSpeed;
                    if (currentBlue > 0 && !pingPongLoopBlueAdd) currentBlue -= 1 * animationSpeed;
                    if (currentBlue == 0 && !pingPongLoopBlueAdd) currentPixel.dataset.pingPongLoopBlueAdd = true;
                }


                // En el caso de que los valores current se hayan excedido del target, se vuelven a sortear los target y resetean los current
                if (currentRed >= targetRed) {
                    currentPixel.dataset.targetRed = Math.ceil(Math.random() * 255);
                    //Target no puede ser 0, para evitar problemas con pingpongloop
                    if (pingPongAnimation) {
                        //Si pingponganimation está activo, entonces tengo que decrementar hasta llegar a 0.
                        currentPixel.dataset.pingPongLoopRedAdd = false;
                    } else {
                        currentRed = 0;
                    }

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
                        currentPixel.dataset.targetGreen = Math.ceil(Math.random() * 255);
                        //Target no puede ser 0, para evitar problemas con pingpongloop
                        if (pingPongAnimation) {
                            //Si pingponganimation está activo, entonces tengo que decrementar hasta llegar a 0.
                            currentPixel.dataset.pingPongLoopGreenAdd = false;
                        } else {
                            currentGreen = 0;
                        }
                    }
                    if (currentBlue >= targetBlue) {
                        currentPixel.dataset.targetBlue = Math.ceil(Math.random() * 255);
                        //Target no puede ser 0, para evitar problemas con pingpongloop
                        if (pingPongAnimation) {
                            //Si pingponganimation está activo, entonces tengo que decrementar hasta llegar a 0.
                            currentPixel.dataset.pingPongLoopBlueAdd = false;
                        } else {
                            currentBlue = 0;
                        }
                    }
                }


            } else {
                // Si la animación no está activa, entonces en cada vez que se ejecute esto se debe emitir un nuevo RGB para los pixeles
                currentRed = Math.ceil(Math.random() * 255);
                if (blackAndWhiteActive) {
                    //Si es B&N, entonces cada canal tiene el mismo valor
                    currentGreen = currentBlue = currentRed;
                } else {
                    // No es B&N, cada canal tiene su propio valor
                    currentGreen = Math.ceil(Math.random() * 255);
                    currentBlue = Math.ceil(Math.random() * 255);
                }
                console.error('la animación no está activa. entré acá');
            }



            // Guardo el RGB en el pixel
            currentPixel.style.backgroundColor = `rgb(${currentRed},${currentGreen},${currentBlue})`;
        }
    }

    //console.info(contadorDePixeles + ' pixeles actualmente');

    if (animationActive) {
        // En el caso de que la variable animationActive esté activa, debo loopear

        animationFrameID = window.requestAnimationFrame(colorize);
        //console.info('el animationframe es: ' + animationFrameID);
        //console.info('Black and white on: ' + blackAndWhiteActive);
        //console.info('Color on: ' + colourActive);

    }
}

/*
 * Funciones adicionales 
 */


function rRandom() {
    return Math.floor(Math.random() * screenHeight / pixelSize);
}

function cRandom() {
    return Math.floor(Math.random() * screenWidth / pixelSize);
}

//pixelMap devuelve un array de todos los píxeles en un array
function pixelMap() {
    let aPixels = [];
    for (let row = 0; row < rowQuantity; row++) {
        for (let column = 0; column < columnQuantity; column++) {
            aPixels.push(d.getElementById(`r${row}c${column}`));
        }
    }
    console.info(aPixels);
}

function toggleCheckboxAnimation() {

    // Busco si existe
    let animationConfigs = d.getElementById('animationConfigs');

    while (animationConfigs.lastChild.name != 'animated' && animationConfigs.lastChild.htmlFor != 'checkboxanimation' && animationConfigs.lastChild.tagName != 'LEGEND') {
        animationConfigs.removeChild(animationConfigs.lastChild);
    }

    if (animationActive) {
        // si se activa la animación, entonces creo los config
        animationConfigs.appendChild(d.createElement('br'));

        //Creo el pingpongLoop
        let input = d.createElement('input');
        input.type = 'checkbox';
        input.name = 'pingpongloop';
        input.id = 'checkboxpingpong';
        input.addEventListener('click', togglePingPong);

        animationConfigs.appendChild(input);

        let label = d.createElement('label');
        label.htmlFor = 'checkboxpingpong';
        label.innerHTML = "Ping pong loop";

        animationConfigs.appendChild(label);


        //Creo el slider de velocidad
        let div = d.createElement('div');
        div.classList = 'slider mt-1';

        label = d.createElement('label');
        label.htmlFor = 'animationSpeed';
        label.innerHTML = "Animation Speed factor";
        div.appendChild(label);
        div.appendChild(d.createElement('br'));

        input = d.createElement('input');
        input.type = 'range';
        input.name = 'animationSpeed';
        input.id = 'animationSpeed';
        input.min = '0.5';
        input.max = '5';
        input.step = '0.2';
        input.value = animationSpeed;
        input.addEventListener('input', refreshSpeedValue);
        div.appendChild(input);

        let p = d.createElement('p');
        p.id = 'animationSpeedValue';
        p.classList = 'ml-1'
        p.innerHTML = animationSpeed;
        div.appendChild(p);

        animationConfigs.appendChild(div);
    }

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
    let checkboxanimation = d.getElementById('checkboxanimation');
    if (checkboxanimation.checked != animationActive) checkboxanimation.checked = animationActive;
    if (animationFrameID != null) {
        window.cancelAnimationFrame(animationFrameID);
        animationFrameID = null;
    }

    if (!animationActive) pingPongAnimation = false;

    toggleCheckboxAnimation();

}


function refreshPixelValue() {
    //console.log('estas modificando el tamaño del pixel');
    pixelSize = this.value;
    pixelSizeValue.innerHTML = pixelSize + 'px';
    if (pixelSize < 16) {
        pixelSizeValue.classList.add("warn");
        if (!d.getElementById('pixelSizeWarning')) {
            let pixelSizeWarning = d.createElement('p');
            pixelSizeWarning.innerHTML = 'Too small to auto-develop. Please press "Refresh matrix"';
            pixelSizeWarning.classList.add("warn");
            pixelSizeWarning.id = 'pixelSizeWarning';
            pixelSizeValue.parentElement.append(pixelSizeWarning);
        }
    } else {
        pixelSizeValue.classList.remove("warn");
        let pixelSizeWarning = d.getElementById('pixelSizeWarning');
        if (pixelSizeWarning) pixelSizeValue.parentElement.removeChild(pixelSizeWarning);

    }
    html.style.setProperty('--pixel-size', pixelSize + 'px');

    if (pixelSize >= 16) {
        develop();
    }
}

pixelSizeSlider.addEventListener('input', refreshPixelValue);


function refreshSpeedValue() {
    console.log('estas modificando la velocidad de animación');
    animationSpeed = this.value;
    let animationSpeedValue = d.getElementById('animationSpeedValue');
    animationSpeedValue.innerHTML = animationSpeed;
}



function togglePingPong() {
    pingPongAnimation = !pingPongAnimation;
    let pingpongCheckbox = d.getElementById('checkboxpingpong');
    if (pingpongCheckbox && pingpongCheckbox.checked != pingPongAnimation) pingpongCheckbox.checked = pingPongAnimation;
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