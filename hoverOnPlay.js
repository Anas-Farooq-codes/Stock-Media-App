"use strict";

export const hoverOnPlay = function($card) {

    const /** {HTMLElement} */ $cardVideo = $card.querySelector("[data-video]");
    const /** {HTMLElement} */ $cardBadge = $card.querySelector("[data-card-badge]");
    let /** {Boolean} */ isPlaying = false;
    let /** {function} */ playTimeout;

    $card.addEventListener("pointerover", function() {

        playTimeout = setTimeout(() => {

            $cardBadge.style.display = "none";

            $cardVideo.play().then(res => {
                isPlaying = true;
            }).catch(err => {
                isPlaying = false;
            });

        }, 500);
    });

    $card.addEventListener("pointerout", function() {

        playTimeout && clearTimeout(playTimeout);

        $cardBadge.style.display = "grid";
        if (isPlaying) $cardVideo.pause();

    });
}
