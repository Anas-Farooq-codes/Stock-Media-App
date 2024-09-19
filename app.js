"use strict";

/** Import */
import { client } from "./api.js";
import { photoCard } from "./photo_card.js";
import { gridInit, updateGrid } from "./masonry_grid.js";
import { videoCard } from "./video_card.js";
import { collectionCard } from "./collection_card.js";

/**
 * Render curated photos on home page
 */
const /** {NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.photos.curated({ page: 1, per_page: 48 }, data => {
    $photoGrid.innerHTML = "";
    const photoGrid = gridInit($photoGrid);

    data.photos.forEach(photo => {
        const $photoCard = photoCard(photo);
        updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
    });
});

/**
 * Render popular videos on home page
 */
const /** {NodeElement} */ $videoGrid = document.querySelector("[data-video-grid]");

$videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);

client.videos.popular({ per_page: 48 }, data => {
    $videoGrid.innerHTML = "";
    const videoGrid = gridInit($videoGrid);

    data.videos.forEach(video => {
        const $videoCard = videoCard(video);
        
            updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
        
    });
});

/**
 * Render collections in homepage
 */


const /** {NodeElement} */ $collectionGrid = document.querySelector("[data-collection-grid]");

client.collections.featured( { per_page: 36}, data => {

    data.collections.forEach(collection => {

const /** Node Element */ $collectionCard = collectionCard(collection);

$collectionGrid.appendChild($collectionCard);

    });
})