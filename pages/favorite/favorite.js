"use strict";

import { gridInit, updateGrid } from "../../masonry_grid.js";
import { segment } from "../../segment_btn.js";
import { videoCard } from "../../video_card.js";
import { photoCard } from "../../photo_card.js";

/**
 * Favorite segment button
 */

const /** {NodeElement} */ $favoriteSegment = document.querySelector("[data-segment='favorite']");
let /** { String } */ favType = "photos";


segment($favoriteSegment, segmentValue => {
    favType = segmentValue;

    $favGrid.innerHTML = "";
    favGrid = gridInit($favGrid);
    loadFav(favType, favGrid);
});

/**
 * Load favorite items
 */


const $favGrid = document.querySelector("[data-fav-grid]");
let favGrid = gridInit($favGrid);
const favData = JSON.parse(window.localStorage.getItem("favorite"));

const loadFav = function (type, favGridItem) {
    Object.values(favData[type]).forEach(item => {
        let /** {NodeElement} */ $card;

        switch (type) {
            case "photos":
                $card = photoCard(item);
                break;
            case "videos":
                $card = videoCard(item);
                break;
        }

        updateGrid($card, favGridItem.columnsHeight, favGridItem.$columns);
    });
}

// Initial load
loadFav(favType, $favGrid);
