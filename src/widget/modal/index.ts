import { initializeTodo } from "./todo/index.js";

let modalElement: HTMLElement | null = null;
let isVisible = false;

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
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
      padding: 1rem;
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
      border-radius: 0.5rem;

      &:hover {
        background-color: #f3f4f6;
      }
    }
    
    .tidy-modal-content {
      padding: 1.5rem;
      max-height: 50vh;
      overflow-y: auto;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);
}

function createModal() {
  const modal = document.createElement("div");
  modal.className = "tidy-modal";

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

  // Todo 컨테이너 추가
  const todoContainer = initializeTodo();
  content.appendChild(todoContainer);

  modal.appendChild(header);
  modal.appendChild(content);

  modalElement = modal;
  document.body.appendChild(modal);
}

function closeWithEscape() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isVisible) {
      hideModal();
    }
  });
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
  } else {
    showModal();
  }
}

export function initializeModal() {
  injectStyles();
  createModal();
  closeWithEscape();
}
