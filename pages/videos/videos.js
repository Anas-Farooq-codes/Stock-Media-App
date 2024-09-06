
"use strict";


"use strict";

/**
 * Import
 */

import { client } from "../../api.js"; 
import { gridInit, updateGrid } from "../../masonry_grid.js";
import { videoCard } from "../../video_card.js";
import { updateUrl } from "../../updateUrl.js";
import { urlDecode } from "../../urlDecode.js";
import { filter } from "../../filter.js";

/**
 * Show filter bar if searched anything
 */

const /** @type {HTMLElement} */ $filterBar = document.querySelector("[data-filter-bar]");  // Corrected JSDoc type

$filterBar.style.display = window.location.search ? "flex" : "none";

/**
 * Init filter
 */

const /** {NodeList} */ $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach($filterWrapper => {

  filter($filterWrapper, window.filterObj, (newObj) => {
window.filterObj = newObj;
updateUrl(newObj, "videos");

  })
})

// filterWrapper

/**
 * Render popular or searched videos
 * If searched something then render searched videos
 * Otherwise render popular videos
 */

const /** @type {HTMLElement} */ $videoGrid = document.querySelector("[data-video-grid]");
const /** @type {HTMLElement} */ $title = document.querySelector("[data-title]");
const /** @type {Object} */ videoGrid = gridInit($videoGrid);
const /** @type {Number} */ perPage = 30;
let /** @type {Number} */ currentPage = 1;
let /** @type {Number} */ totalPage = 0;
const /** @type {String} */ searchUrl = window.location.search.slice(1);
let /** @type {Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /** @type {String} */ title = searchObj ? `${searchObj.query} videos` : "Popular videos";

$title.textContent = title;
document.title = title;

/**
 * Render all videos
 * @param {Number} currentPage Current page number
 */

const renderVideos = function (currentPage) {

  client.videos[searchObj ? "search" : "popular"]({ ...searchObj, per_page: perPage, page: currentPage }, data => {

    totalPage = Math.ceil(data.total_results / perPage);

    data.videos.forEach(video => { 

      const /** @type {HTMLElement} */ $videoCard = videoCard(video);  

      updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns);
    
    });

    // when videos loaded
    isLoaded = true;

    // When no more video found, hide Loader
    if (currentPage >= totalPage) $loader.style.display = "none";

  });

}

renderVideos(currentPage);

/** Load more videos */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll", function () {

    console.log($loader.getBoundingClientRect().top);

    if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded)  {

        currentPage++;
        renderVideos(currentPage);
        isLoaded = false;
    }

});