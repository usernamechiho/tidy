"use strict";
(function () {
    const WIDGET_CLASS = "tidy-widget";
    function injectStyles() {
        const css = `
      .${WIDGET_CLASS} {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: #ffffff;
        box-shadow: 0 4px 12px #00000026;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.875rem;
        font-weight: bold;
        border: 1px solid #e5e7eb;
        cursor: pointer;
        transition: transform 150ms ease-in-out;
        transform: scale(1);
      }
      .${WIDGET_CLASS}:hover {
        transform: scale(1.1);
      }
      .${WIDGET_CLASS}:active {
        transform: scale(1);
      }
    `;
        const styleTag = document.createElement("style");
        styleTag.innerHTML = css;
        document.head.appendChild(styleTag);
    }
    function createWidget() {
        const widget = document.createElement("button");
        widget.className = WIDGET_CLASS;
        widget.innerHTML = "🐼";
        return widget;
    }
    function initialize() {
        injectStyles();
        const widgetElement = createWidget();
        document.body.appendChild(widgetElement);
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize);
    }
    else {
        initialize();
    }
})();
