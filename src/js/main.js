//Hace jQuery accesible públicamente
window.$ = window.jQuery = require("jquery");

import transitions from "./transitions";

//Cargar la lista de articles con AJAX
$.ajax ({
    url: "/articles/",
    success: articles => {
        console.log("SUCCESS", articles);

        //Comprovamos si hay artículos
        if(articles.length == 0) {
            //Mostramos el estado vacío
            $(".articles-list").removeClass("loading").addClass("empty");
        }else{
            //Componemos el HTML con todos los artículos
            let html = "";
            for (let article of articles) {
                html += `<article class = "article">
                            <img src="${article.image}" alt="${article.title} - ${article.author}" class="imageArticle">
                            <div class="title">${article.title}</div>
                        </article>`;
            }
            
            // Metemos el HTML en el div que contiene los artículos
            $(".articles-list .ui-state.ideal").html(html);

            // Quitamos el mensaje de cargando y ponemos la clase ideal
            $(".articles-list").remove("loading").addClass("ideal");
        }
    },

    error: error => {
        // Mostrar el estado de error
        $("articles-list").removeClass("loading").addClass("error");
        console.log("ERROR", error);
    }
});