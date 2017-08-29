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

        let self = this;

        //Manejador de eventos, al hacer clic en el botón activamos o desactivamos "me gusta"
        this.element.on("click", ".fa-heart-o", function() {
            //Con jQuery accedemos a los atributos data para saber el id
            let parentObject = this.parentNode.parentNode.parentNode.parentNode;
            let articleId = parentObject.dataset.id;
            self.setLike(articleId);
            
        });
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
                this.setError();
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


        // Local Storage
        if (typeof(Storage) !== "undefined") {
            var likeChecked;

            if(this.checkLike(article.id)) {
                likeChecked = "liked";
            }else{
                likeChecked = "noLiked";
            }
            
        }else{
            alert("Tu navegador no soporta Web Storage, puede que algunas funcionalidades no funcionen correctamente.");
        }


        // Calcular el tiempo desde la publicación del artículo
        let elapsedTimeDate = this.calculateTime(article.date);
        
        

        // Retorna el template string con el renderizado de un artículo
        return `<article class = "article" data-id="${article.id}">
                    <img src="${article.image}" alt="${article.title} - ${article.author}" class="imageArticle">
                    <div class="title">${article.title}</div>

                    <div class="short_text">${article.short_text}</div>

                    <div class="seguir_leyendo"><a href="./articulo.html">Seguir leyendo...</a></div>

                    <div class="author_info">
                        <img src="${author_photo}" alt="foto" class="author_photo">
                        <div class="author_name">${article.author}</div>
                    </div>

                    <div class="date_container">
                        <div class="date">Publicado: ${elapsedTimeDate}</div>
                    </div>

                    <div class="others_container">
                        <div class="like">
                            <button type="button" id="likeButton"><i class="fa fa-heart-o  ${likeChecked}" aria-hidden="true"></i></button>
                        </div>
                    
                        <div class="comments">
                            <button type="button" id="commentButton">
                                <a href="../articulo.html">
                                    <i class="comments_number">2 </i><i class="fa fa-comment-o" aria-hidden="true"></i>
                                </a>
                            </button>
                        </div>
                    </div>
                </article>`;
    }
  
/* Like Functionality________________________________*/

    checkLike(article) {
        let idArticle = String(article);

        let result = localStorage.getItem(idArticle);

        if(result == 'checked') {
            return true;
        }else{
            return false;
        }

    }

    setLike(article) {
        let idArticle = String(article);

        let result = localStorage.getItem(idArticle);

        if(result == 'checked') {
            this.setOffLike(idArticle);
        }else{
            localStorage.setItem(idArticle, 'checked');
            
            // Buscamos el artículo para cambiar el css del botón 
        let art = $('article[data-id = '+idArticle+']');

        art.find('.fa-heart-o').removeClass('noLiked').addClass('liked');
        }    
    }

    setOffLike(idArticle) {
        localStorage.setItem(idArticle, 'noChecked');

        // Buscamos el artículo para cambiar el css del botón 
        let art = $('article[data-id = '+idArticle+']');

        art.find('.fa-heart-o').removeClass('liked').addClass('noLiked');
        
    }


/* Date functionality_____________________________*/
    calculateTime(date) {
        // Constantes para calcular los valores en milisegundos
        const msecPerSeconds = 1000;
        const msecPerMinute = msecPerSeconds * 60;
        const msecPerHour = msecPerMinute * 60;
        const msecPerDay = msecPerHour * 24;


        // Fechas con las que trabajamos 
        this.date = date;
        const publishedDate = new Date(this.date);
        const actualDate = new Date('2017-08-29T10:05:00Z');

        // Pasamos las fechas a milisegundos
        const publishedDateMsec = publishedDate.getTime();
        const actualDateMsec = actualDate.getTime();

        var interval =  publishedDateMsec - actualDateMsec;

        // Calculamos los diferentes intervalos
        let seconds = Math.floor(interval / msecPerSeconds);
        let minutes = Math.floor(interval / msecPerMinute);
        let hours = Math.floor(interval / msecPerHour);
        let days = Math.floor(interval / msecPerDay);

        // Días de la semana
        var diaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

        let elapsedTime;

        if(seconds < 59) {
            elapsedTime = 'hace '+seconds + ' segundos';
            return elapsedTime;
        }else if(seconds > 59 && minutes < 59) {
            elapsedTime = 'hace '+minutes + ' minutos'
            return elapsedTime;          
        } else if(minutes > 59 && hours < 23){
            elapsedTime = 'hace '+hours + ' horas';
            return elapsedTime;
        }else if(hours > 23 && days < 6) {
            let weekDay = diaSemana[publishedDate.getDay()];
            elapsedTime = 'el '+weekDay;
            return elapsedTime;
        }else{
            let dateDay = publishedDate.getDate();
            let dateMonth = publishedDate.getMonth();
            let dateYear = publishedDate.getFullYear();
            let dateHours = publishedDate.getHours();
            let dateMinutes = (publishedDate.getMinutes()<10?'0':'') + publishedDate.getMinutes();


            elapsedTime = `el ${dateDay}-${dateMonth}-${dateYear} a las ${dateHours}:${dateMinutes}`;
            return elapsedTime;
        }
    }


}
