/**
 * Add event on multiple elements
 * @param {NodeList} $elements NodeList 
 * @param {String} eventType Event type eg. "click" 
 * @param {function} callback 
 */
export const addEventOnElements = function ($elements, eventType, callback ) {

    $elements.forEach($element => $element.addEventListener(eventType, callback));
}