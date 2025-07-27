import { TodoStorage } from "./storage";
export class Modal {
    constructor() {
        this.todos = [];
        this.isVisible = false;
        this.element = this.createElement();
        this.loadTodos();
        this.render();
        this.attachEvents();
    }
    createElement() {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = `
      <h3>Todo</h3>
      <input type="text" class="todo-input" placeholder="할 일 입력" id="todoInput">
      <button class="todo-btn">추가</button>
      <div class="todo-list" id="todoList"></div>
    `;
        document.body.appendChild(modal);
        return modal;
    }
    attachEvents() {
        const input = this.element.querySelector("#todoInput");
        const button = this.element.querySelector(".todo-btn");
        button.addEventListener("click", () => this.addTodo());
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.addTodo();
            }
        });
    }
    loadTodos() {
        this.todos = TodoStorage.load();
    }
    saveTodos() {
        TodoStorage.save(this.todos);
    }
    addTodo() {
        const input = this.element.querySelector("#todoInput");
        const text = input.value.trim();
        if (text) {
            this.todos.push({ id: Date.now(), text });
            input.value = "";
            this.saveTodos();
            this.render();
        }
    }
    render() {
        const list = this.element.querySelector("#todoList");
        if (!list)
            return;
        if (this.todos.length === 0) {
            list.innerHTML =
                '<div style="color: #999; text-align: center;">할 일이 없습니다</div>';
        }
        else {
            list.innerHTML = this.todos
                .map((todo) => `<div class="todo-item">${todo.text}</div>`)
                .join("");
        }
    }
    show() {
        if (!this.isVisible) {
            this.element.classList.add("show");
            this.isVisible = true;
            const input = this.element.querySelector("#todoInput");
            input.focus();
        }
    }
    hide() {
        if (this.isVisible) {
            this.element.classList.remove("show");
            this.isVisible = false;
        }
    }
    toggle() {
        if (this.isVisible) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    getElement() {
        return this.element;
    }
}
