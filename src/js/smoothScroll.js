const $ = require("jquery");

let inicio = $("#inicio");

$("#goToInicio").on("click", scrollToElement(ini));


function scrollToElement(inicio) {
    console.log(inicio.getBoundingClientRect());
    var jump = parseInt(inicio.getBoundingClientRect().top * 0.3);
    

    document.body.scrollTop += jump;

    if (!inicio.lastJump || inicio.lastJump > Math.abs(jump)) {
        inicio.lastJump = Math.abs(jump);

        setTimeout(function() {
            scrollToElement(inicio);
        }, 40);
    }
}