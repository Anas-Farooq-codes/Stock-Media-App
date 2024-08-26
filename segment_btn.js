// import 

import { addEventOnElements } from "./event.js";

/**
 * Segment function
 */
export const segment = function ($segment, callback) {

    const /** @type {NodeList} */ $segmentBtns = $segment.querySelectorAll("[data-segment-btn]");
    let /** @type {HTMLElement} */ $lastSelectedSegmentBtn = $segment.querySelector("[data-segment-btn].selected");

    addEventOnElements($segmentBtns, "click", function () {
        $lastSelectedSegmentBtn.classList.remove("selected");
        this.classList.add("selected");
        $lastSelectedSegmentBtn = this;
        callback(this.dataset.segmentValue);
    });
};
