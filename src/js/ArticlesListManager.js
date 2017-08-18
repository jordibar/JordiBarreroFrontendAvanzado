// Capa de abstracción para pintar los artículos
// Usamos el patrón de INYECCIÓN DE DEPENDENCIAS (dpendencie inyection),
// lo que hacemos es inyectarle los servicios que necesitamos al instanciarlo,
// se los pasamos como parámetro

const $ = require("jQuery");

import UIManager from "./UIManager";



export default class ArticlesListManager extends UIManager {

    constructor(elementSelector, articleService) {
        super(elementSelector)
        this.articlesService = articleService;

    }

    init() {
        // Cargamos los artículos
        this.loadArticles();
    }


    loadArticles() {
        //Cargar la lista de articles con AJAX
        this.articlesService.list(articles => {
            //Comprovamos si hay artículos
                if(articles.length == 0) {
                    //Mostramos el estado vacío
                    this.setEmpty();
                }else{
                    // Llamamos al método que pinta el html con los artículos
                    this.renderArticles(articles);

                    // Quitamos el mensaje de cargando y ponemos la clase ideal
                    this.setIdeal();
                }
        }, error => {
                // Mostrar el estado de error
                this.uiManager.setError();
                console.log("ERROR", error);
        });
    }


    renderArticles(articles) {
        let html = "";
        for (let article of articles) {
            // Template String de ES6
            //Componemos el HTML con todos los artículos
            html += this.renderArticle(article);
        }
                    
        // Metemos el HTML en el div que contiene los artículos
        this.setIdealHtml(html);
        
    }


    renderArticle(article) {
        let author_photo = article.author_photo;

        // Ponemos imagen por defecto en el caso de que el autor no la incluya
        if (author_photo == "") {
            author_photo = "./img/head.png";
        }

        // Retorna el template string con el renderizado de un artículo
        return `<article class = "article">
                    <img src="${article.image}" alt="${article.title} - ${article.author}" class="imageArticle">
                    <div class="title">${article.title}</div>

                    <div class="short_text">${article.short_text}</div>

                    <div class="author_info">
                        <img src="${author_photo}" alt="foto" class="author_photo">
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
                </article>`;
    }
}