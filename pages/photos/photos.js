"use strict";

/**
 * Import
 */

import { client } from "../../api.js";  // Added space after {client}
import { gridInit, updateGrid } from "../../masonry_grid.js";
import { photoCard } from "../../photo_card.js";
import { updateUrl } from "../../updateUrl.js";
import { urlDecode } from "../../urlDecode.js";

/**
 * Show filter bar if searched anything
 */

const /** @type {HTMLElement} */ $filterBar = document.querySelector("[data-filter-bar]");  // Corrected JSDoc type

$filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * Init filter
 */

// const /** {NodeList} */ $filterWrappers = document.querySelectorAll("[data-filter]");

// filterWrapper

/**
 * Render curated or searched photos
 * If searched something then render searched photos
 * Otherwise render curated photos
 */

const /** @type {HTMLElement} */ $photoGrid = document.querySelector("[data-photo-grid]");
const /** @type {HTMLElement} */ $title = document.querySelector("[data-title]");
const /** @type {Object} */ photoGrid = gridInit($photoGrid);
const /** @type {Number} */ perPage = 30;
let /** @type {Number} */ currentPage = 1;
let /** @type {Number} */ totalPage = 0;
const /** @type {String} */ searchUrl = window.location.search.slice(1);
let /** @type {Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /** @type {String} */ title = searchObj ? `${searchObj.query} photos` : "Curated photos";

$title.textContent = title;
document.title = title;

/**
 * Render all photos
 * @param {Number} currentPage Current page number
 */

const renderPhotos = function (currentPage) {

  client.photos[searchObj ? "search" : "curated"]({ ...searchObj, per_page: perPage, page: currentPage }, data => {

    totalPage = Math.ceil(data.total_results / perPage);

    data.photos.forEach(photo => {  // Corrected the variable name from 'photos' to 'photo'

      const /** @type {HTMLElement} */ $photoCard = photoCard(photo);  // Corrected JSDoc type

      updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
    
    });

    // when photos loaded
    isLoaded = true;

    // When no more photo found, hide Loader
    if (currentPage >= totalPage) $loader.style.display = "none";

  });

}

renderPhotos(currentPage);

/** Load more photos */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll", function () {

    console.log($loader.getBoundingClientRect().top);

    if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded)  {

        currentPage++;
        renderPhotos(currentPage);
        isLoaded = false;
    }

});