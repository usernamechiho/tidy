import { initializeTodo } from "./todo/index.js";
let modalElement = null;
let isVisible = false;
let todoUI = null;
function injectStyles() {
    const css = `
    .tidy-modal {
      position: fixed;
      bottom: 7rem;
      right: 2rem;
      width: 90%;
      max-width: 400px;
      max-height: 60vh;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      z-index: 10001;
      transform: translateY(10px);
      opacity: 0;
      visibility: hidden;
      transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .tidy-modal.visible {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .tidy-modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .tidy-modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    
    .tidy-modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6b7280;
      padding: 0.25rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s ease;
    }
    
    .tidy-modal-close:hover {
      background-color: #f3f4f6;
    }
    
    .tidy-modal-content {
      padding: 1.5rem;
      max-height: 50vh;
      overflow-y: auto;
    }
    
    @media (max-width: 480px) {
      .tidy-modal {
        width: calc(100vw - 4rem);
        right: 2rem;
        bottom: 7rem;
      }
      
      .tidy-modal-header,
      .tidy-modal-content {
        padding: 1rem;
      }
    }
    
    @media (max-width: 768px) {
      .tidy-modal {
        bottom: 7rem;
        right: 2rem;
      }
    }
  `;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
}
function createModal() {
    // Create modal container
    const modal = document.createElement("div");
    modal.className = "tidy-modal";
    // Create header
    const header = document.createElement("div");
    header.className = "tidy-modal-header";
    const title = document.createElement("h2");
    title.className = "tidy-modal-title";
    title.textContent = "Tidy 🐼";
    const closeButton = document.createElement("button");
    closeButton.className = "tidy-modal-close";
    closeButton.innerHTML = "×";
    closeButton.addEventListener("click", () => hideModal());
    header.appendChild(title);
    header.appendChild(closeButton);
    const content = document.createElement("div");
    content.className = "tidy-modal-content";
    // Todo UI 초기화
    todoUI = initializeTodo(content);
    // Assemble modal
    modal.appendChild(header);
    modal.appendChild(content);
    document.addEventListener("keydown", (e) => {
        if (e.shiftKey && (e.key === "A" || e.key === "a")) {
            e.preventDefault();
            if (isVisible) {
                hideModal();
            }
            else {
                showModal();
            }
        }
    });
    // Close on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isVisible) {
            hideModal();
        }
    });
    modalElement = modal;
    document.body.appendChild(modal);
}
export function showModal() {
    if (modalElement && !isVisible) {
        isVisible = true;
        modalElement.classList.add("visible");
    }
}
export function hideModal() {
    if (modalElement && isVisible) {
        isVisible = false;
        modalElement.classList.remove("visible");
    }
}
export function toggleModal() {
    if (isVisible) {
        hideModal();
    }
    else {
        showModal();
    }
}
export function initializeModal() {
    injectStyles();
    createModal();
}
