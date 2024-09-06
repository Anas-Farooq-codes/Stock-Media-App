"use strict";

// IMPORT

import { ripple } from "./ripple.js";
import { addEventOnElements } from "./event.js";
import { urlDecode } from "./urlDecode.js";

// Header on scroll state

const /** @type {HTMLElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});

// Add ripple effect

const /** @type {NodeList} */ $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));

// Navbar toggle for mobile screen

const /** @type {NodeList} */ $navTogglers = document.querySelectorAll("[data-nav-toggler]");

const /** @type {HTMLElement} */ $navbar = document.querySelector("[data-navigation]");

const /** @type {HTMLElement} */ $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navTogglers, "click", function () {
    $navbar.classList.toggle("show");
    $scrim.classList.toggle("active");
});

/**
 * Filter functionality
 */

window.filterObj = {};

/**
 * Show all filtered options after reload
 */

if (window.location.search.slice(1)) {
    const /** @type {Object} */ search = urlDecode(window.location.search.slice(1));

    Object.entries(search).forEach(item => {
        const /** @type {String} */ filterKey = item[0];
        const /** @type {String} */ filterValue = item[1];
        window.filterObj[filterKey] = filterValue;

        if (filterKey !== "query") {
            const /** @type {HTMLElement} */ $filterItem = document.querySelector(`[data-filter="${filterKey}"]`);
            $filterItem?.querySelector("[data-filter-chip]").classList.add("selected");

            if ($filterItem) {
                $filterItem.querySelector("[data-filter-value]").innerText = filterValue;
            }
        }
    });
}

/**
 * Initial favorite object in local storage
 */

if (!window.localStorage.getItem("favorite")) {
    const /** @type {Object} */ favoriteObj = {
        photos: {},
        video: {}
    };

    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

/**
 * Page transition
 */

window.addEventListener("loadstart", function() {

    document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function() {

 document.body.style.opacity = "1";
})
