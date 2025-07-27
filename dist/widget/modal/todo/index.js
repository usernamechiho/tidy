// 로컬 스토리지 유틸리티
const todoStorage = {
    saveTodos(todos) {
        try {
            localStorage.setItem("tidy-todos", JSON.stringify(todos));
        }
        catch (error) {
            console.error("Failed to save todos to localStorage:", error);
        }
    },
    loadTodos() {
        try {
            const stored = localStorage.getItem("tidy-todos");
            if (!stored)
                return [];
            const parsed = JSON.parse(stored);
            return parsed.map((item) => ({
                ...item,
                createdAt: new Date(item.createdAt),
            }));
        }
        catch (error) {
            console.error("Failed to load todos from localStorage:", error);
            return [];
        }
    },
    clearTodos() {
        try {
            localStorage.removeItem("tidy-todos");
        }
        catch (error) {
            console.error("Failed to clear todos from localStorage:", error);
        }
    },
};
// Todo 상태 관리
let todos = [];
let todoContainer = null;
// ID 생성 유틸리티
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
// Todo 추가
function addTodo(text) {
    if (!text.trim())
        return;
    const newTodo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
    };
    todos.unshift(newTodo); // 최신 항목을 위에 추가
    todoStorage.saveTodos(todos);
    renderTodos();
}
// Todo 삭제
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    todoStorage.saveTodos(todos);
    renderTodos();
}
// Todo 완료 상태 토글
function toggleTodo(id) {
    todos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    todoStorage.saveTodos(todos);
    renderTodos();
}
// 스타일 주입
function injectTodoStyles() {
    const css = `
    .tidy-todo-container {
      max-height: 400px;
      overflow-y: auto;
    }
    
    .tidy-todo-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .tidy-todo-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.2s ease;
    }
    
    .tidy-todo-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .tidy-todo-add-btn {
      padding: 0.75rem 1rem;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .tidy-todo-add-btn:hover {
      background-color: #2563eb;
    }
    
    .tidy-todo-add-btn:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
    
    .tidy-todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .tidy-todo-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      background-color: #ffffff;
      transition: all 0.2s ease;
    }
    
    .tidy-todo-item:hover {
      border-color: #d1d5db;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .tidy-todo-item.completed {
      background-color: #f9fafb;
      opacity: 0.7;
    }
    
    .tidy-todo-checkbox {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }
    
    .tidy-todo-text {
      flex: 1;
      font-size: 0.875rem;
      color: #374151;
      word-break: break-word;
    }
    
    .tidy-todo-text.completed {
      text-decoration: line-through;
      color: #9ca3af;
    }
    
    .tidy-todo-delete {
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      transition: background-color 0.2s ease;
    }
    
    .tidy-todo-delete:hover {
      background-color: #fee2e2;
    }
    
    .tidy-todo-empty {
      text-align: center;
      color: #9ca3af;
      font-size: 0.875rem;
      padding: 2rem;
      font-style: italic;
    }
    
    .tidy-todo-stats {
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 1rem;
      text-align: center;
    }
  `;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = css;
    document.head.appendChild(styleTag);
}
function renderTodos() {
    if (!todoContainer)
        return;
    const todoList = todoContainer.querySelector(".tidy-todo-list");
    if (!todoList)
        return;
    const statsElement = todoContainer.querySelector(".tidy-todo-stats");
    if (statsElement) {
        const totalCount = todos.length;
        const completedCount = todos.filter((todo) => todo.completed).length;
        const pendingCount = totalCount - completedCount;
        statsElement.textContent = `총 ${totalCount}개 (완료: ${completedCount}, 대기: ${pendingCount})`;
    }
    todoList.innerHTML = "";
    if (todos.length === 0) {
        const emptyElement = document.createElement("div");
        emptyElement.className = "tidy-todo-empty";
        emptyElement.textContent =
            "할 일이 없습니다. 새로운 할 일을 추가해보세요! ✨";
        todoList.appendChild(emptyElement);
        return;
    }
    todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.className = `tidy-todo-item ${todo.completed ? "completed" : ""}`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "tidy-todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));
        const textElement = document.createElement("span");
        textElement.className = `tidy-todo-text ${todo.completed ? "completed" : ""}`;
        textElement.textContent = todo.text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "tidy-todo-delete";
        deleteButton.innerHTML = "🗑️";
        deleteButton.title = "삭제";
        deleteButton.addEventListener("click", () => deleteTodo(todo.id));
        listItem.appendChild(checkbox);
        listItem.appendChild(textElement);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}
function createTodoContainer() {
    const container = document.createElement("div");
    container.className = "tidy-todo-container";
    const form = document.createElement("form");
    form.className = "tidy-todo-form";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "tidy-todo-input";
    input.placeholder = "새로운 할 일을 입력하세요...";
    input.maxLength = 200;
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.className = "tidy-todo-add-btn";
    addButton.textContent = "추가";
    form.appendChild(input);
    form.appendChild(addButton);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value;
        if (text.trim()) {
            addTodo(text);
            input.value = "";
        }
    });
    const stats = document.createElement("div");
    stats.className = "tidy-todo-stats";
    const listContainer = document.createElement("ul");
    listContainer.className = "tidy-todo-list";
    container.appendChild(form);
    container.appendChild(stats);
    container.appendChild(listContainer);
    return container;
}
export function initializeTodo() {
    injectTodoStyles();
    todos = todoStorage.loadTodos();
    todoContainer = createTodoContainer();
    renderTodos();
    return todoContainer;
}
