"use strict";

/**
 * Imports
 */
import { ripple } from "./ripple.js";
import { addEventOnElements } from "./event.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./updateUrl.js";
import { urlDecode } from "./urlDecode.js";

/**
 * Search view toggle in small devices
 */
const /** @type {NodeList} */ $searchToggler = document.querySelectorAll("[data-search-toggler]");
const /** @type {HTMLElement} */ $searchView = document.querySelector("[data-search-view]");

addEventOnElements($searchToggler, "click", () => $searchView.classList.toggle("show"));

/**
 * Search Clear
 */
const /** @type {HTMLElement} */ $searchField = document.querySelector("[data-search-field]");
const /** @type {HTMLElement} */ $searchClearBtn = document.querySelector("[data-search-clear-btn]");

$searchClearBtn.addEventListener("click", () => $searchField.value = "");

/**
 * Search type
 */
const /** @type {HTMLElement} */ $searchSegment = document.querySelector("[data-segment='search']");
const /** @type {HTMLElement} */ $activeSegmentBtn = $searchSegment.querySelector("[data-segment-btn].selected");

window.searchType = $activeSegmentBtn.dataset.segmentValue;

segment($searchSegment, segmentValue => {
    window.searchType = segmentValue;
});

/**
 * Search submit
 */
const /** @type {HTMLElement} */ $searchBtn = document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", function () {
    const /** @type {string} */ searchValue = $searchField.value.trim();

    console.log(searchValue);

    if (searchValue) {
        updateSearchHistory(searchValue);
        window.filterObj.query = searchValue;
        updateUrl(window.filterObj, window.searchType)
    }
});

/**
 * Submit search when press on "Enter" key
 */
$searchField.addEventListener("keydown", e => {
    if (e.key === "Enter" && $searchField.value.trim()) $searchBtn.click();
});

/**
 * Search History
 */

// Initial search history
let /** @type {object} */ searchHistory = { items: [] };

if (window.localStorage.getItem("search_history")) {
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"));
} else {
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

// Update search history
const updateSearchHistory = searchValue => {
    /**
     * If the searched value is already present in the search list,
     * remove it and add the search value at the beginning of the list.
     * This ensures that the most recent search is at the top of the history.
     */

    if (searchHistory.items.includes(searchValue)) {
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
    }

    searchHistory.items.unshift(searchValue);
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory));
};

/**
 * Render search history items in the search list
 */
const /** @type {HTMLElement} */ $searchList = document.querySelector("[data-search-list]");
const /** @type {number} */ historyLen = searchHistory.items.length;

for (let i = 0; i < historyLen && i <= 5; i++) {
    const /** @type {HTMLElement} */ $listItem = document.createElement("button");
    $listItem.classList.add("list-item");

    $listItem.innerHTML = `
        <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
        <span class="body-large text">${searchHistory.items[i]}</span>
        <div class="state-layer"></div>
    `;

    ripple($listItem);

    $listItem.addEventListener("click", function () {
        // Access the text content directly from the second child span element
        $searchField.value = this.querySelector(".text").textContent;
        $searchBtn.click();
    });

    $searchList.appendChild($listItem);
}

/**
 * Show searched value in search field after reload
 */

const /** @type {Object} */ search = urlDecode(window.location.search.slice(1));

if (search.query) $searchField.value = search.query;