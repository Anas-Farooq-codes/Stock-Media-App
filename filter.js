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

    const /** {NodeElement} */ $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]");
    const /** {NodeElement} */ $filterValue = $filterWrapper.querySelector("[data-filter-value]");
    const /** {NodeElement} */ $filterChip = $filterWrapper.querySelector("[data-filter-chip]");
    const /** {NodeElement} */ $filterColorField = $filterWrapper.querySelector("[data-color-field]");
    const /** {String} */ filterKey = $filterWrapper.dataset.filter; 
    const /** {Object} */ mewObj = filterObj;

    menu($filterWrapper, filterValue => {


    });


}