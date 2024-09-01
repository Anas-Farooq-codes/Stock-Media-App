"use strict";

// iMPORT 

import { ripple } from "./ripple.js"
import {addEventOnElements}from "./event.js"

// Header on scroll state 

const /** @type {HTMLElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
});


// Add ripple effect 

const /** {NodeList} */ $rippleElems = document.querySelectorAll("[data-ripple]");

$rippleElems.forEach($rippleElem => ripple($rippleElem));

// Navbar toggle for mobile screen 

const /** {NodeList} */ $navTogglers = document.querySelectorAll("[data-nav-toggler]");

const /** {NodeElement} */ $navbar = document.querySelector("[data-navigation]");

const /** {NodeElement} */ $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navTogglers, "click", function () {

    $navbar.classList.toggle("show");
    $scrim.classList.toggle("active");
} );
/**
 * Filter functionality
 */

 window.filterObj = {};

 /**
  * Initial favorite object in local storage
  */

 if (!window.localStorage.getItem("favorite")) {

    const /** {Object} */ favoriteObj = {

        photos: {},
        video: {}
    }

    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
 }