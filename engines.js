/*
    Randomizer engine
*/

function randomizerEngine() {
    // Randomiza totalmente el valor 
    window.requestAnimationFrame(randomizerStep);
}

function randomizerStep(value) {
    let empty = value == "" || value == null || value == undefined;
    if (!empty) {
        value = Math.floor(Math.random() * 256);
    } else {
        console.warn('No se obtuvo valor para trabajar');
    }

    window.requestAnimationFrame(randomizerStep);
}


function growRandomizerEngine() {
    // Randomiza un valor, decide si lo crece o decrece y lo realiza hasta llegar al valor límite
    // Genera un efecto ease en la transición.

    //Genero un valor inicial
    let startingValue = Math.floor(Math.random() * 256);

    //Decido si es creciente o decreciente
    // Creciente = 1
    // Decreciente = 0
    let orientation = Math.round(Math.random());
    if (orientation) {
        // Orientation es diferente a 0, es creciente.
        growRandomizerStep(startingValue, true);
    } else {
        growRandomizerStep(startingValue, false);
    }



    window.requestAnimationFrame(growRandomizerStep);

}

function growRandomizerStep(value, orientation) {
    let empty = value == "" || value == null || value == undefined;
    if (!empty) {

        if(orientation){
            value++;
            if(value == 255){
                growRandomizerEngine();
            }else{
                window.requestAnimationFrame(growRandomizerStep);
            }
        }else{
            value--;
            if(value == 0){
                growRandomizerEngine();
            }else{
                window.requestAnimationFrame(growRandomizerStep);
            }
        }


    } else {
        console.warn('No se obtuvo valor para trabajar');
    }
}