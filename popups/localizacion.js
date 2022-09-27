/** 
 *  Archivo de javascript parte de la extensión «Xitomatitos».
 *
 *  @author     Ulises Francisco Alejandre Navarro
 *  @since      2022-08-29
 *  @licence    MPL 2.0
 * 
 *  Este codigo fuente está sujeto a los términos de la Licencia Pública
 *  de Mozilla, v. 2.0. Si una copia de la licencia no fue distribuída con
 *  este archivo, la puede encontrar en http://mozilla.org/MPL/2.0/.
 */

'use strict';

// Definiendo el tipo de navegador
if (typeof browser === "undefined") {
    var browser = chrome;
} else {
    var browser = browser || chrome
}

localizarPagHtml();

// Funciones para la localización de la extensión
/**
 * Busca los elementos HTML localizables y pone el mensaje correspondiente en su lugar
 */    
function localizarPagHtml() {
    // Localizar usando los tags __MSG_***__ de data-localize
    // Juntar todos los elementos html con el tag data-localize
    var elementos = document.querySelectorAll('[data-localize]');
    
    // Reemplazar el texto por defecto con los mensajes correspondientes
    // a la localización
    for (var i in elementos){ 
        // verificar que se tenga la propiedad data-localize
        if (elementos.hasOwnProperty(i)) {
            let elem = elementos[i];
            let tag = elem.getAttribute('data-localize').toString();
    
            reemplazar(elem, tag);
        }
    }
}

// Funciones para la localización de la extensión
/**
 * Reemplaza los tags __MSG_***__ con el mensaje de localización correspondiente
 * @param {*} obj: elemento html que se quiere localizar
 * @param {*} tag: contenido del tag data-localize de cada objeto html anterior
 */
function reemplazar(objeto, tag) {
    // Reemplazar los tags con MSG
    var mensaje = tag.replace(/__MSG_(\w+)__/g, function(match, v1) {
        return v1 ? browser.i18n.getMessage(v1) : '';
    });
        
    // Reemplazar el contenido del tag con el mensaje del json correspondiente
    if(mensaje != tag) {
        objeto.innerHTML = mensaje;
    }
}