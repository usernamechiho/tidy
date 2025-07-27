import { toggleModal } from "../modal/index.js";
export function initializeButton() {
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
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease;
        border: 1px solid rgb(221, 221, 221);
        background: transparent;
      }
      .${WIDGET_CLASS}:hover {
        transform: scale(1.1);
      }
      .${WIDGET_CLASS}:active {
        transform: scale(0.95);
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
        widget.addEventListener("click", () => {
            toggleModal();
        });
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
}
