import { initializeButton } from "./widget/button/index.js";
import { initializeModal } from "./widget/modal/index.js";
export function initializeTidy() {
    initializeButton();
    initializeModal();
}
initializeTidy();
