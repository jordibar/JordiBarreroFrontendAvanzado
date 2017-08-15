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

                            <div class="short_text">${article.short_text}</div>

                            <div class="author_info">
                                <img src="${article.author_photo}" alt="${article.author} - imágen" class="author_photo">
                                <div class="author_name">${article.author}</div>
                            </div>

                            <div class="date_container">
                                <div class="date">Publicado: ${article.date}</div>
                                <div class="time">${article.time}h</div>
                            </div>

                            <div class="others_container">
                                <div class="like">
                                    <button type="button" id="likeButton"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
                                </div>
                                <div class="comments">
                                    <button type="button" id="commentButton"><i class="comments_number">2 </i><i class="fa fa-comment-o" aria-hidden="true"></i></button>
                                </div>

                            </div>
                        </article>`;
            }
            
            // Metemos el HTML en el div que contiene los artículos
            $(".articles-list .ui-state.ideal").html(html);

            // Quitamos el mensaje de cargando y ponemos la clase ideal
            $(".articles-list").removeClass("loading").addClass("ideal");
        }
    },

    error: error => {
        // Mostrar el estado de error
        $("articles-list").removeClass("loading").addClass("error");
        console.log("ERROR", error);
    }
});