export class Button {
    constructor() {
        this.element = this.createElement();
    }
    createElement() {
        const button = document.createElement("button");
        button.className = "widget";
        button.textContent = "+";
        document.body.appendChild(button);
        return button;
    }
    onClick(handler) {
        this.clickHandler = handler;
        this.element.addEventListener("click", handler);
    }
    getElement() {
        return this.element;
    }
}
