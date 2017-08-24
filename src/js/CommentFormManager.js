// Esta clase hereda de la clase CommentsUIManager
const $ = require("jquery");

import CommentsUIManager from './CommentsUIManager';


export default class CommentFormManager extends CommentsUIManager {
    constructor(elementSelector, commentsService) {
        super(elementSelector); // Llamada al constructor de la clase CommentsUIManager
        this.commentsService = commentsService;
    }

    init() {
        // Tenemos que escuchar cuando se envia el formulario
        // por lo que tenemos que ponerle un manejador de eventos
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        // No ponemos los parentesis al final de validateAndSendData()
        // ya que le estamos poniendo el manejador de eventos
        // y éste es una función, NO es la ejecución de la función!

        // La hacemos arrow function por el tema de scope de los manejadores de eventos,
        //con una función normal el this hace referencia al formulario
        //con arrow function hace referencia al scope del padre, al objeto SongFormManager
        this.element.on("submit", () => {    
            this.validateAndSendData();

            // en jQuery podemos hacer un preventDefault haciendo un return false
            //es lo mismo que hacer un event.preventDefault();
            return false;
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }else{
            console.log ('error');
        }
    }

    isValid() {
        // Obtenemos los campos
        const inputs = this.element.find("input");

        const inputName = inputs[0];        
        const inputSurname = inputs[1];
        const inputEmail = inputs[2];
        const inputText = inputs[3];

        // Validamos campo por campo
        if(inputName.checkValidity() === false) {
            //alert("Escribe tu nombre");
            const errorMessage = inputName.validationMessage;
            inputName.focus();
            this.setErrorHtml(errorMessage);
            this.setErrorForm(); // Nos ponemos en estado de errorForm
            return false;
        }

        if(inputSurname.checkValidity() === false) {
            //alert("Escribe tu apellido");
            const errorMessage = inputSurname.validationMessage;
            inputSurname.focus();
            this.setErrorHtml(errorMessage);
            this.setErrorForm(); // Nos ponemos en estado de errorForm
            return false;
        }

        if(inputEmail.checkValidity() === false) {
            //alert("Escribe una dirección de correo correcta");
            const errorMessage = inputEmail.validationMessage;
            inputEmail.focus();
            this.setErrorHtml(errorMessage);
            this.setErrorForm(); // Nos ponemos en estado de errorForm
            return false;
        }

        if(inputText.checkValidity() === false) {
            //alert("Escribe un texto");
            const errorMessage = inputText.validationMessage;
            inputText.focus();
            this.setErrorHtml(errorMessage);
            this.setErrorForm(); // Nos ponemos en estado de errorForm
            return false;
        }
        
        if(this.checkWordLimit(inputText) === false) {
            inputText.focus();
            return false;
        }
        
        
        this.setIdeal();
        return true;
    }


    // Limitar el textarea a 120 palabras
    checkWordLimit(inputTexts) {
        this.inputTextCheck = inputTexts;
        let wordsLimit = 120;
        let wordCount = {};

        wordCount = this.inputTextCheck.value.split(" ").length;

        if(wordCount > wordsLimit){
            alert("Has sobrepasado el número de palabras, el límite es de " + wordsLimit + " palabras y has introducido " + wordCount);
            return false;
        }
    }


    send() {
         // Lo ponemos en estado cargando
        // reescribimos el código setLoading de CommentsUIManager
        // para habilitar y deshabilitar los campos
        this.setLoading();

        // Tenemos que definir el objeto comment
        const comment = {
            name: this.element.find("#name").val(),
            surname: this.element.find("#surname").val(),
            email: this.element.find("#email").val(),
            text: this.element.find("#text").val()
        };

        // Enviamos los datos utilizando CommentService
        this.commentsService.save(comment, success => {
            // Limpiamos el formulario
            this.resetForm();
            this.setIdeal(); // Ponemos el estado ideal
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar el comentario en el servidor");
            this.setError(); // Ponemos el estado de error
        });
    }

        resetForm() {
            this.element[0].reset();
        }


         disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    // Redefinimos los métodos del padre CommentsUIManager
    // para bloquear los campos del formulario mientras
    // se carga o se envia
    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }
}