// Capa de abstracción para acceder a los datos del API REST
// por lo que nos debe permitir hacer las siguientes operaciones:
// GET (listar), POST (crear), PUT (update), DELETE

//No es necesario cargar jQuery ya que está importado en main.js
//es simplemente para que sea más legible
const $ = require("jquery");

export default class ArticlesService {
    constructor(url) {
        this.url = url;
    }

    // Obtener listado de artículos
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


    // Crear un artículo
    create(article, successCallback, errorCallback) {

    }


    // Obtener detalle del artículo
    getDetail(articleId, successCallback, errorCallback) {

    }


    // Actualizar artículo
    update(article, successCallback, errorCallback) {

    }


    // Borrar artículo
    delete(articleId, successCallback, errorCallback) {

    }
}