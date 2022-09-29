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
 * Parameters to determine what type of notification and alarm should be created next.
 */
var working = false;
var inter = 3;
var count = 0;

/**
 * Listener for the alarms that trigger the notifications.
 */
browser.alarms.onAlarm.addListener(() => {
    if (!working) { 
        createNotification("Work");
    } else if (working && count < inter) { 
        createNotification("ShortRest");
    } else if (working && count == inter) { 
        createNotification("LongRest");
    }
});

/**
 * Listener for the notifications that signal the start of a work or rest segment.
 */
browser.notifications.onButtonClicked.addListener(async () => {
    if (!working) { 
        createAlarm('workT');
        working = true;
    } else if (working && count < inter) { 
        createAlarm('shRest');
        working = false;
        count++;
    } else if (working && count >= inter) {
        createAlarm('lgRest'); 
        working= false;
        count = 0;
    }
});

/**
 * Create a notification according to the given parameter.
 * @param {string} notifType The type of notification: work, short rest, or long rest 
 */
function createNotification(notifType) {
    let msg = browser.i18n.getMessage("notif" + notifType);
    let ttl = browser.i18n.getMessage("title" + notifType);
    browser.action.setBadgeText({text: ''});
    browser.notifications.create({
        type:'basic',
        iconUrl:'../icons/xitomatitos-128.png',
        title: ttl,
        message: msg,
        buttons:[
            {title: 'OK'}
        ],
        priority:0
    });
}
/**
 * Create an alarm according to the given parameter.
 * @param {string} alarmType The type of alarm: work, short rest, or long rest 
 */
async function createAlarm(alarmType) {
    const item = await browser.storage.sync.get(alarmType);
    browser.action.setBadgeText({ text: 'ON' });
    browser.alarms.create({ delayInMinutes: item[alarmType] });
}