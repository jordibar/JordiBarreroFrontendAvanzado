const $ = require("jquery");

let buttonUp = document.getElementById('goToInicio');
buttonUp.addEventListener('click', scrollToElement);


function scrollToElement() {
    let inicio = document.getElementById('ini');

    //Para saber cuantos px tenemos que saltar para llegar a la sección deseada
    let jump = inicio.getBoundingClientRect().top * 1 / 3;
    
    //Cambiamos la propiedad scrollTop
    document.body.scrollTop += jump;

    if (!inicio.lastJump || inicio.lastJump > Math.abs(jump)) {
        inicio.lastJump = Math.abs(jump);

    //función recursiva
        setTimeout(function() {
            scrollToElement(inicio);
        }, 40);
    }else{
		inicio.lastJump = null;
	}
}