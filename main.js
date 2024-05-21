document.addEventListener("DOMContentLoaded", function () {
    // Configurar CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById("code-js"), {
        mode: {name: "javascript", globalVars: true}, // Establece el modo del editor (puede ser "text/html", "text/css", etc.)
        theme: "monokai",  // tema de resaltado de color del editor.
        lineNumbers: true, // Muestra números de línea
        autoCloseBrackets: true, // cierra automáticamente llaves, corchetes, parentésis y comillas.
        matchBrackets: true , // resalta los brackets correspondientes.
        lineWrapping: true, // corta la linea de código y la continúa debajo de acuerdo ancho del editor.
        indentUnit: 2, // Tamaño de la sangría en espacios.
        tabSize: 2, // Tamaño de la tabulación en espacios.
        indentWithTabs: false, // Indentación con espacios en lugar de tabulaciones.
       matchInMiddle: true,
       gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
       foldGutter: true,
       styleActiveLine: true,
       extraKeys: {"Ctrl-Space": "autocomplete"},
    });
  
  // ============= Consola ===============
    // Configurar consola
   var consoleElement = document.getElementById("console");

    // Redirigir la salida de la consola al elemento HTML
    console.log = function (message) {
        consoleElement.innerHTML += `<p>${message}</p>`;
        consoleElement.scrollTop = consoleElement.scrollHeight;
    };

    // Limpiar la consola
    function clearConsole() {
        consoleElement.innerHTML = "";
    }

  // ============ Ejecutar código ===========
    // Ejecutar el código cuando se presiona el botón
    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.code === "Enter") {
            clearConsole();
            executeCode(editor.getValue());
        }
    });

    // Función para ejecutar el código
    function executeCode(code) {
        try {
            // Utilizar eval para ejecutar el código (¡ten en cuenta los riesgos de seguridad!)
            Function(code)();
        } catch (error) {
            console.error(error);
        }
    };
  // Botón de ejecutar:
 // Función para ejecutar el código ingresado en el editor
  // Maneja el clic del botón
    document.getElementById("ejecutarCodigo").addEventListener("click", function() {
      // Obtiene el contenido del editor
      var code = editor.getValue();
      // limpia la consola
        clearConsole();
      // Muestra el código en la consola (puedes ajustar esto según tus necesidades)
       //console.log("",code);

      try {
        // Ejecuta el código en la consola
        Function(code)();
      } catch (error) {
        console.error("Error al ejecutar el código:", error);
      }
    });
  
  // =========== Descarga de archivos ================
  
  // Manejar clic en el botón para descargar el archivo
            document.getElementById("downloadJs").addEventListener("click", function() {
                // Obtener el contenido del editor
                var contenido = editor.getValue();

                // Crear un objeto Blob con el contenido y configuración del tipo MIME
                var blob = new Blob([contenido], { type: "text/javascript" });

                // Crear un enlace de descarga
                var link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "main.js";

                // Simular clic en el enlace para iniciar la descarga
                link.click();
            });
  
// ====== carga de archivo al editor  ==========
  
  // Manejar el evento de cambio de archivo
document.getElementById("fileInputJs").addEventListener("change", function(event) {
  var file = event.target.files[0];

  if (file) {
    // Crear un lector de archivos
    var reader = new FileReader();

    // Definir la lógica para manejar la carga del archivo
    reader.onload = function(e) {
      // Establecer el contenido del editor con el contenido del archivo
      editor.setValue(e.target.result);
    };

    // Leer el contenido del archivo como texto
    reader.readAsText(file);
      }
  });
  
  var activeLine = null;

        // Agregar evento de clic al editor
        editor.on("mousedown", function (cm, event) {
            // Obtener el número de línea haciendo clic en la posición del evento
            var line = cm.lineAtHeight(event.clientY, "window");

            // Verificar si ya hay una línea activa
            if (activeLine !== null) {
                // Deshacer el resaltado de la línea activa anterior
                cm.removeLineClass(activeLine, "background", "activeline");
            }

            // Marcar la nueva línea activa
            cm.addLineClass(line, "background", "activeline");

            // Guardar la línea activa actual
            activeLine = line;
        });

});




