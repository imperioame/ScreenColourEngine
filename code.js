const canvas = document.getElementById('canvas');
//let screenHeight = window.screen.height;
//let screenWidth = window.screen.width;

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;

let pixelSize = 4;

let blackAndWhiteActive = true;
let colourActive = false;



function construct() {
    console.log('Altura:' + screenHeight);
    console.log('Ancho:' + screenWidth);



    for (let row = 0; row < screenHeight / pixelSize; row++) {
        //console.log('iteración fila');

        //Creo el elemento html
        let rowhtml = document.createElement('div');
        rowhtml.classList.add('pixelrow');
        // Lo inserto
        canvas.append(rowhtml);

        for (let column = 0; column < screenWidth / pixelSize; column++) {
            //console.log('iteración pixel');

            //Creo el elemento html
            let pixelhtml = document.createElement('span');
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
            document.getElementById(`r${row}c${column}`).style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor( Math.random() * 256)},${Math.floor( Math.random() * 256)})`;
        }
    }
}

function blackAndWhite() {
    // Recorre la matriz de píxeles y genera píxeles en escala de grises.
    for (let row = 0; row < screenHeight / pixelSize; row++) {
        for (let column = 0; column < screenWidth / pixelSize; column++) {
            let brightness =  Math.floor(Math.random() * 256);
            document.getElementById(`r${row}c${column}`).style.backgroundColor = `rgb(${brightness},${brightness},${brightness})`;
        }
    }
    
    /*
    // El requestanimationframe con una función callback ANONIMA para poder pasarle parámetros
    // Usar función anónima es la única forma de poder llamar funciones con parámetros
    // (la función anónima lo único que hace es llamar a la función que me itneresa, pasando parámetro)
    window.requestAnimationFrame(function(){
        blackAndWhite()
    });*/
}



/*
 * Funciones adicionales 
 */

function timer() {
    return false;
}

function rRandom() {
    return Math.floor( Math.random() * screenHeight / pixelSize);
}

function cRandom() {
    return Math.floor( Math.random() * screenWidth / pixelSize);
}



/*
 * Funciones de interfaz 
 */
function toggleAside(){
    document.getElementById('aside').classList.toggle('hidden');
    document.getElementById('rendericon').classList.toggle('hidden');
}

function toggleBW(){
    blackAndWhiteActive = !blackAndWhiteActive;
    colourActive = false
    document.getElementById('checkboxcolour').checked = false;
}

function toggleColour(){
    colourActive = !colourActive; blackAndWhiteActive = false
    document.getElementById('checkboxbw').checked = false;
}






/*
* Funciones constructoras.
* Se deben ajustar a posterior, por ahora se ejecutan cuando se actualiza la página
*/


function render(){
// La ejecuta el usuario cuando presiona el botón del aside.
// Genera los colores en la pantalla
    if(blackAndWhiteActive){
        blackAndWhite();
    }else{
        colorize();
    }
}


function develop(){
    construct();
    blackAndWhite();

    //Esto de acá abajo es el randomizer para el black&white
    //window.requestAnimationFrame(blackAndWhite);
}

window.onload = develop();