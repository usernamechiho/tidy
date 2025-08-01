import { toggleModal } from "./widget/modal/modal.js";
export function initializeWidget() {
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
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease;
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
        // Add click event to open modal
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
