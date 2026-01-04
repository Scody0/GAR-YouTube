// ==UserScript==
// @name         GAR YouTube - Goodbye Algorithmic Recommendations
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes YouTube home recommendations
// @author       TheScody
// @match        https://www.youtube.com/*
// @match        https://youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(() => {
    'use strict';

    function removeHomeFeed() {
        if (location.pathname !== '/') return;

        const grid = document.querySelector('ytd-rich-grid-renderer');
        if (grid) grid.remove();
    }

    let lastPath = location.pathname;

    const observer = new MutationObserver(() => {
        if (location.pathname !== lastPath) {
            lastPath = location.pathname;
        }
        removeHomeFeed();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('DOMContentLoaded', removeHomeFeed);
})();
