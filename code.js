const canvas = document.getElementById('canvas');
//let screenHeight = window.screen.height;
//let screenWidth = window.screen.width;

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;

function develop() {
    console.log('Altura:' + screenHeight);
    console.log('Ancho:' + screenWidth);



    for (let row = 0; row < screenHeight / 4; row++) {
        console.log('iteración fila');

        //Creo el elemento html
        let rowhtml = document.createElement('div');
        rowhtml.classList.add('pixelrow');
        // Lo inserto
        canvas.append(rowhtml);

        for (let column = 0; column < screenWidth / 4; column++) {
            console.log('iteración pixel');

            //Creo el elemento html
            let pixelhtml = document.createElement('div');
            pixelhtml.classList.add('pixel');
            pixelhtml.style.backgroundColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            //pixelhtml.innerHTML = ' ';
            //Lo inserto
            canvas.lastChild.append(pixelhtml);
        }
    }
}

window.onload = develop();