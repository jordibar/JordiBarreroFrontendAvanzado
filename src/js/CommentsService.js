// Capa de abstracción para acceder a los datos del API REST

//No es necesario cargar jQuery ya que está importado en main.js
//es simplemente para que sea más legible
const $ = require("jquery");

export default class CommentsService {
    constructor(url) {
        this.url = url;
    }

    // Obtener listado de comentarios
    //utilizamos un callback porqué si no sería síncrono
    //list tiene que recibir los callbacks para manejar el error y el success
    list(successCallback, errorCallback) {
        //Cargar la lista de articles con AJAX
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear un comentario
    create(comment, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: comment,
            success: successCallback,
            error: errorCallback        
        })
    }


    // Obtener detalle del comentario
    getDetail(commentId, successCallback, errorCallback) {

    }


    // Actualizar comentario
    update(comment, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "put",
            data: comment,
            success: successCallback,
            error: errorCallback        
        })
    }

    // Crear o actualizar comentario, si no existe la crea
    save(comment, successCallback, errorCallback) {
        if(comment.id) {
            this.update(comment, successCallback, errorCallback);
        }else{
            this.create(comment, successCallback, errorCallback);
        }
    }


    // Borrar comentario
    delete(commentId, successCallback, errorCallback) {

    }
}