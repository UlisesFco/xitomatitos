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

// -------------------------------------------------------------------------------------------
//Siguiente: - Añadir entradas y botones para poder modificar la duración de los tiempos
//           - Ver como hacer que funcione en firefox
// -------------------------------------------------------------------------------------------

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
 * Time values for each segment [work, short rest, long rest].
 */
var times = [25, 5, 15]; 

// document.getElementById("timerConfig").textContent = msg;

/**
 * Add the corresponding function to each button.
 */
document.getElementById("info").addEventListener("click", goToInfo);
document.getElementById("iniciar").addEventListener("click", startTimer);
document.getElementById("quitar").addEventListener("click", stopTimer);

/**
 * Go to the extension's information page.
 */
function goToInfo() {
    window.location.href = "informacion.html";
}

/**
 * Start the timer.
 */
function startTimer() {
    let msg = browser.i18n.getMessage("timerDesc");
    browser.action.setBadgeText({text:'ON'});
    browser.alarms.create({when: Date.now()});
    browser.storage.sync.set({workT: times[0], shRest: times[1], lgRest: times[2] });
    window.close();
}

/**
 * Stop the timer.
 */
function stopTimer() {
    browser.action.setBadgeText({text: ''});
    browser.alarms.clearAll();
    window.close();
}