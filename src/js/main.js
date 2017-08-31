//Hace jQuery accesible públicamente
window.$ = window.jQuery = require("jquery");

import "babel-polyfill";


import transitions from "./transitions";
import smoothScroll from "./smoothScroll";

//Sección artículos
import ArticlesService from "./ArticlesService";
import UIManager from "./UIManager";
import ArticlesListManager from "./ArticlesListManager";

// Sección comentarios
import CommentsService from "./CommentsService";
import CommentsUIManager from "./CommentsUIManager";
import CommentsListManager from "./CommentsListManager";
import CommentFormManager from "./CommentFormManager";


// Sección artículos
// Instanciamos ArticlesService (encargado de la conexión con el servidor)
const articlesService = new ArticlesService("/articles/");
// Instanciamos UIManager (encargado de los cambios de estados de interfaz)
const articleListUIManager = new UIManager();
// Instanciamos ArticlesListManager (encargado de pintar los artículos)
const articlesListManager = new ArticlesListManager(".articles-list", articlesService);
articlesListManager.init();


// Sección comentarios
//Instanciamos CommentsService
const commentsService = new CommentsService("/comments/");
// Instanciamos CommentsUIManager
const commentsListUIManager = new CommentsUIManager();
// Instanciamos CommentsListManager
const commentsListManager = new CommentsListManager(".comments-list", commentsService);
commentsListManager.init();

const commentFormManager = new CommentFormManager(".comment-form", commentsService);
commentFormManager.init();