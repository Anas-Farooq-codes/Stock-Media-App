"use strict";

// iMPORT 

import { ripple } from "./ripple.js"

// Header on scroll state 

const /** @type {HTMLElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});


// Add ripple effect 

const /** {NodeList} */ $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));

/**
 * Filter functionality
 */

 window.filterObj = {};