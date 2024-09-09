"use strict";

/**
 * Import
 */

import { client } from "../../api.js";
import { gridInit, updateGrid } from "../../masonry_grid.js";
import { photoCard } from "../../photo_card.js";
import { videoCard } from "../../video_card.js";
import { urlDecode } from "../../urlDecode.js";

/**
 * Render Collections Media
 */

const /** {NodeElement} */ $collectionGrid = document.querySelector("[data-collection-grid]");
const /** {NodeElement} */ $title = document.querySelector("[data-title]");
const /** {Object} */ collectionGrid = gridInit($collectionGrid);
const /** {Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /** {Array} */ collectionObj = urlDecode(window.location.search.slice(1));

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;

/**
 * @param {Number} page Current page
 */
const loadCollection = function (page) {

    client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page }, data => {


        totalPage = Math.ceil(data.total_results / perPage);

        data.media.forEach(item => {

            let /** {NodeElement} */ $card;

            switch (item.type.toLowerCase()) {
                case "photos":
                    $card = photoCard(item);
                    break;
                case "video":
                    $card = videoCard(item);
                    break;
            }

            updateGrid($card, collectionGrid.columnsHeight, collectionGrid.$columns);


    isLoaded = true;
    if (currentPage >= totalPage) $loader.style.display = "none";

        });

    });
};

loadCollection(currentPage);

/** Load more collections */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll", function () {

    console.log($loader.getBoundingClientRect().top);

    if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded)  {

        currentPage++;
        loadCollection(currentPage);
        isLoaded = false;
    }

});
