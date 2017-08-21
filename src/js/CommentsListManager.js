// Capa de abstracción para pintar los artículos
// Usamos el patrón de INYECCIÓN DE DEPENDENCIAS (dpendencie inyection),
// lo que hacemos es inyectarle los servicios que necesitamos al instanciarlo,
// se los pasamos como parámetro
const $ = require("jQuery");

import CommentsUIManager from "./CommentsUIManager";

export default class CommentsListManager extends CommentsUIManager {

    constructor(elementSelector, commentService) {
        super(elementSelector);
        this.commentsService = commentService;
    }

    init() {
        // Cargamos los comentarios
        this.loadComments();
    }


    loadComments() {
        // Cargar la lista de comentarios con AJAX
        this.commentsService.list(comments => {
            // Comprovamos si hay comentarios
            if(comments.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            }else{
                // Llamamos el método que pinta el html con los comentarios
                this.renderComments(comments);

                // Quitamos el mensaje de cargando y ponemos la clase ideal
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();
            console.log("ERROR", error);
        });
    }


    renderComments(comments) {
        let html = "";
        for (let comment of comments) {
            // Template String de ES6
            //Componemos el HTML con todos los comentarios
            html += this.renderComment(comment);
        }

        // Metemos el HTML en le div que contiene los artículos
        this.setIdealHtml(html);
    }


    renderComment(comment) {
        // Retorna el template string con el renderizado de un artículo
        return `<article class = "comment">
                    <div class = "name">${comment.name} ${comment.surname}</div>
                    <div class = "email">${comment.email}</div>
                    <div class = "text">${comment.text}</div>
                </article> `
    }
}