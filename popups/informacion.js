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

/**  
 * Defining the browser type.
 */
if (typeof browser === "undefined") {
    var browser = chrome;
} else {
    var browser = browser || chrome;
}

/**
 * Add the corresponding function to each button.
 */
document.getElementById("irInicio").addEventListener("click", goToStart);

/**
 * Go to the extension's start page.
 */
function goToStart() {
    window.location.href = "popup.html";
}