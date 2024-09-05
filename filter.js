"use strict";

/**
 * Import
 */

import { menu } from "./menu.js";

/**
 * 
 * @param {Node} $filterWrapper filter wrapper
 * @param {Object} filterObj filter object
 * @param {Function} callback Callback function
 */

export const filter = ($filterWrapper, filterObj, callback) => {

    const /** @type {HTMLElement} */ $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
    const /** @type {HTMLElement} */ $filterValue = $filterWrapper.querySelector("[data-filter-value]");
    const /** @type {HTMLElement} */ $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
    const /** @type {HTMLElement} */ $filterColorField = $filterWrapper.querySelector("[data-color-field]");
    const /** @type {String} */ filterKey = $filterWrapper.dataset.filter; 
    const /** @type {Object} */ newObj = filterObj;

    if (filterKey === "color" && $filterColorField) {
        $filterColorField.addEventListener("change", function() {
            const /** @type {String} */ filterValue = this.value.toLowerCase();

            $filterValue.innerText = filterValue;
            $filterChip.classList.add("selected");

            newObj[filterKey] = filterValue;
            callback(newObj);
        });
    } else {
        menu($filterWrapper, filterValue => {
            $filterValue.innerText = filterValue;
            $filterChip.classList.add("selected");

            newObj[filterKey] = filterValue;
            callback(newObj);
        });
    }

    $filterClearBtn.addEventListener("click", () => {
        $filterChip.classList.remove('selected');
        $filterValue.innerText = $filterValue.dataset.filterValue;

        delete newObj[filterKey];
        callback(newObj);
    });
};