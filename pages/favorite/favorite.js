"use strict";

import { gridInit, updateGrid } from "../../masonry_grid.js";
import { segment } from "../../segment_btn.js";
import { videoCard } from "../../video_card.js";
import { photoCard } from "../../photo_card.js";

/**
 * Favorite segment button
 */
const /** {NodeElement} */ $favoriteSegment = document.querySelector("[data-segment='favorite']");
let /** {String} */ favType = "photos";

// Initialize the grid container
const /** {NodeElement} */ $favGrid = document.querySelector("[data-fav-grid]");
let favGrid = gridInit($favGrid);


const loadFav = function (type, favGridItem) {
    const favData = JSON.parse(window.localStorage.getItem("favorite"));

    if (!favData || !favData[type]) {
        return; 
    }

    Object.values(favData[type]).forEach(item => {
        let /** {NodeElement} */ $card;

        switch (type) {
            case "photos":
                $card = photoCard(item); // Create a photo card
                break;
            case "videos":
                $card = videoCard(item); // Create a video card
                break;
        }

      
        updateGrid($card, favGridItem.columnsHeight, favGridItem.$columns);
    });
};

// Segment button handler
segment($favoriteSegment, segmentValue => {
    favType = segmentValue; 

    $favGrid.innerHTML = ""; 
    favGrid = gridInit($favGrid); 
    loadFav(favType, favGrid);
});

// Initial load of favorite items
loadFav(favType, favGrid);