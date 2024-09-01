"use strict";

/**
 * Import
 */

import { client } from "./api.js";

/**
 * Add to favorite or remove from favorite
 * @param {*} $elements 
 * @param {*} type Item type eg  'photos' or 'videos'
 * @param {*} id  Item Id
 */

export const favorite = ($element, type, id) => {

    $element.addEventListener("click", () => {

        $element.setAttribute("disabled", "");
        const /** {Object} */ favoriteObj = JSON.parse(window.localStorage.getItem("favorite"));
        
            if (favoriteObj[type][id]) {
        $element.classList.toggle("active");
        $element.removeAttribute("disabled");

        delete favoriteObj[type][id];

        window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
                
            } else {

client[type].detail(id, data => {

    $element.classList.toggle("active");
    $element.removeAttribute("disabled");

    favoriteObj[type][id] = data;
    
    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
})

            }
    });

}