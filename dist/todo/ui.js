import { TodoService } from "./service";
export class TodoUI {
    constructor(container) {
        this.currentFilter = {};
        this.service = TodoService.getInstance();
        this.container = container;
        this.init();
    }
    init() {
        this.injectStyles();
        this.render();
        this.unsubscribe = this.service.subscribe(() => this.render());
    }
    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
    injectStyles() {
        const css = `
      .todo-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 1rem;
      }

      .todo-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .todo-stats {
        font-size: 0.875rem;
        color: #6b7280;
      }

      .todo-form {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }

      .todo-input-group {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }

      .todo-input {
        flex: 1;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
      }

      .todo-textarea {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        resize: vertical;
        min-height: 60px;
        margin-bottom: 0.75rem;
      }

      .todo-form-row {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .todo-select {
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        background: white;
      }

      .todo-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .todo-btn-primary {
        background: #3b82f6;
        color: white;
      }

      .todo-btn-primary:hover {
        background: #2563eb;
      }

      .todo-btn-secondary {
        background: #e5e7eb;
        color: #374151;
      }

      .todo-btn-secondary:hover {
        background: #d1d5db;
      }

      .todo-btn-danger {
        background: #ef4444;
        color: white;
      }

      .todo-btn-danger:hover {
        background: #dc2626;
      }

      .todo-filters {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
      }

      .todo-filter-btn {
        padding: 0.25rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 1rem;
        background: white;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.2s;
      }

      .todo-filter-btn.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
      }

      .todo-search {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
      }

      .todo-list {
        flex: 1;
        overflow-y: auto;
        max-height: 300px;
      }

      .todo-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        background: white;
        transition: all 0.2s;
      }

      .todo-item:hover {
        border-color: #d1d5db;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .todo-item.completed {
        opacity: 0.6;
        background: #f9fafb;
      }

      .todo-checkbox {
        margin-top: 0.125rem;
        cursor: pointer;
      }

      .todo-content {
        flex: 1;
        min-width: 0;
      }

      .todo-title {
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.25rem;
        word-break: break-word;
      }

      .todo-title.completed {
        text-decoration: line-through;
      }

      .todo-description {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
        word-break: break-word;
      }

      .todo-meta {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 0.75rem;
        color: #9ca3af;
      }

      .todo-priority {
        padding: 0.125rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .todo-priority.high {
        background: #fef2f2;
        color: #dc2626;
      }

      .todo-priority.medium {
        background: #fffbeb;
        color: #d97706;
      }

      .todo-priority.low {
        background: #f0fdf4;
        color: #16a34a;
      }

      .todo-actions {
        display: flex;
        gap: 0.25rem;
      }

      .todo-action-btn {
        padding: 0.25rem;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        color: #6b7280;
        transition: all 0.2s;
      }

      .todo-action-btn:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .todo-empty {
        text-align: center;
        padding: 2rem;
        color: #9ca3af;
      }

      .todo-controls {
        display: flex;
        gap: 0.5rem;
        justify-content: space-between;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
      }

      @media (max-width: 400px) {
        .todo-form-row {
          flex-direction: column;
          align-items: stretch;
        }
        
        .todo-filters {
          flex-direction: column;
        }
        
        .todo-controls {
          flex-direction: column;
        }
      }
    `;
        const styleTag = document.createElement("style");
        styleTag.innerHTML = css;
        document.head.appendChild(styleTag);
    }
    render() {
        this.container.innerHTML = "";
        const todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        // 헤더와 통계
        todoContainer.appendChild(this.createHeader());
        // 새 할일 추가 폼
        todoContainer.appendChild(this.createForm());
        // 검색
        todoContainer.appendChild(this.createSearch());
        // 필터
        todoContainer.appendChild(this.createFilters());
        // 할일 목록
        todoContainer.appendChild(this.createTodoList());
        // 컨트롤 버튼들
        todoContainer.appendChild(this.createControls());
        this.container.appendChild(todoContainer);
    }
    createHeader() {
        const header = document.createElement("div");
        header.className = "todo-header";
        const title = document.createElement("h3");
        title.textContent = "할 일 목록";
        title.style.margin = "0";
        const stats = this.service.getStats();
        const statsEl = document.createElement("div");
        statsEl.className = "todo-stats";
        statsEl.textContent = `총 ${stats.total}개 (완료: ${stats.completed}, 진행중: ${stats.pending})`;
        header.appendChild(title);
        header.appendChild(statsEl);
        return header;
    }
    createForm() {
        const form = document.createElement("div");
        form.className = "todo-form";
        const inputGroup = document.createElement("div");
        inputGroup.className = "todo-input-group";
        const titleInput = document.createElement("input");
        titleInput.className = "todo-input";
        titleInput.type = "text";
        titleInput.placeholder = "새 할 일을 입력하세요...";
        titleInput.id = "todo-title-input";
        inputGroup.appendChild(titleInput);
        const descriptionTextarea = document.createElement("textarea");
        descriptionTextarea.className = "todo-textarea";
        descriptionTextarea.placeholder = "설명 (선택사항)";
        descriptionTextarea.id = "todo-description-input";
        const formRow = document.createElement("div");
        formRow.className = "todo-form-row";
        const prioritySelect = document.createElement("select");
        prioritySelect.className = "todo-select";
        prioritySelect.id = "todo-priority-input";
        const priorities = [
            { value: "low", label: "낮음" },
            { value: "medium", label: "보통" },
            { value: "high", label: "높음" },
        ];
        priorities.forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority.value;
            option.textContent = priority.label;
            if (priority.value === "medium")
                option.selected = true;
            prioritySelect.appendChild(option);
        });
        const addButton = document.createElement("button");
        addButton.className = "todo-btn todo-btn-primary";
        addButton.textContent = "추가";
        addButton.addEventListener("click", () => this.handleAddTodo());
        formRow.appendChild(prioritySelect);
        formRow.appendChild(addButton);
        form.appendChild(inputGroup);
        form.appendChild(descriptionTextarea);
        form.appendChild(formRow);
        // Enter 키로 추가하기
        titleInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.handleAddTodo();
            }
        });
        return form;
    }
    createSearch() {
        const searchInput = document.createElement("input");
        searchInput.className = "todo-search";
        searchInput.type = "text";
        searchInput.placeholder = "할 일 검색...";
        searchInput.value = this.currentFilter.search || "";
        searchInput.addEventListener("input", (e) => {
            const target = e.target;
            this.currentFilter.search = target.value;
            this.render();
        });
        return searchInput;
    }
    createFilters() {
        const filters = document.createElement("div");
        filters.className = "todo-filters";
        const filterOptions = [
            { key: "all", label: "전체", filter: {} },
            { key: "pending", label: "진행중", filter: { completed: false } },
            { key: "completed", label: "완료", filter: { completed: true } },
            {
                key: "high",
                label: "높은 우선순위",
                filter: { priority: "high" },
            },
            {
                key: "medium",
                label: "보통 우선순위",
                filter: { priority: "medium" },
            },
            {
                key: "low",
                label: "낮은 우선순위",
                filter: { priority: "low" },
            },
        ];
        filterOptions.forEach((option) => {
            const btn = document.createElement("button");
            btn.className = "todo-filter-btn";
            btn.textContent = option.label;
            const isActive = this.isFilterActive(option.filter);
            if (isActive)
                btn.classList.add("active");
            btn.addEventListener("click", () => {
                this.currentFilter = { ...this.currentFilter, ...option.filter };
                if (option.key === "all") {
                    this.currentFilter = { search: this.currentFilter.search };
                }
                this.render();
            });
            filters.appendChild(btn);
        });
        return filters;
    }
    isFilterActive(filter) {
        if (filter.completed !== undefined) {
            return this.currentFilter.completed === filter.completed;
        }
        if (filter.priority) {
            return this.currentFilter.priority === filter.priority;
        }
        // '전체' 필터
        return !this.currentFilter.completed && !this.currentFilter.priority;
    }
    createTodoList() {
        const listContainer = document.createElement("div");
        listContainer.className = "todo-list";
        const todos = this.service.getFilteredTodos(this.currentFilter);
        if (todos.length === 0) {
            const empty = document.createElement("div");
            empty.className = "todo-empty";
            empty.textContent =
                this.currentFilter.search ||
                    this.currentFilter.completed !== undefined ||
                    this.currentFilter.priority
                    ? "검색 결과가 없습니다."
                    : "할 일이 없습니다. 새로운 할 일을 추가해보세요!";
            listContainer.appendChild(empty);
            return listContainer;
        }
        todos.forEach((todo) => {
            listContainer.appendChild(this.createTodoItem(todo));
        });
        return listContainer;
    }
    createTodoItem(todo) {
        const item = document.createElement("div");
        item.className = `todo-item ${todo.completed ? "completed" : ""}`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            this.service.toggleTodoComplete(todo.id);
        });
        const content = document.createElement("div");
        content.className = "todo-content";
        const title = document.createElement("div");
        title.className = `todo-title ${todo.completed ? "completed" : ""}`;
        title.textContent = todo.title;
        content.appendChild(title);
        if (todo.description) {
            const description = document.createElement("div");
            description.className = "todo-description";
            description.textContent = todo.description;
            content.appendChild(description);
        }
        const meta = document.createElement("div");
        meta.className = "todo-meta";
        const priority = document.createElement("span");
        priority.className = `todo-priority ${todo.priority}`;
        priority.textContent = this.getPriorityLabel(todo.priority);
        const createdAt = document.createElement("span");
        createdAt.textContent = this.formatDate(todo.createdAt);
        meta.appendChild(priority);
        meta.appendChild(createdAt);
        content.appendChild(meta);
        const actions = document.createElement("div");
        actions.className = "todo-actions";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "todo-action-btn";
        deleteBtn.innerHTML = "🗑️";
        deleteBtn.title = "삭제";
        deleteBtn.addEventListener("click", () => {
            if (confirm("이 할 일을 삭제하시겠습니까?")) {
                this.service.deleteTodo(todo.id);
            }
        });
        actions.appendChild(deleteBtn);
        item.appendChild(checkbox);
        item.appendChild(content);
        item.appendChild(actions);
        return item;
    }
    createControls() {
        const controls = document.createElement("div");
        controls.className = "todo-controls";
        const leftControls = document.createElement("div");
        leftControls.style.display = "flex";
        leftControls.style.gap = "0.5rem";
        const clearCompletedBtn = document.createElement("button");
        clearCompletedBtn.className = "todo-btn todo-btn-secondary";
        clearCompletedBtn.textContent = "완료된 할 일 삭제";
        clearCompletedBtn.addEventListener("click", () => {
            if (confirm("완료된 할 일들을 모두 삭제하시겠습니까?")) {
                this.service.clearCompletedTodos();
            }
        });
        const clearAllBtn = document.createElement("button");
        clearAllBtn.className = "todo-btn todo-btn-danger";
        clearAllBtn.textContent = "모두 삭제";
        clearAllBtn.addEventListener("click", () => {
            if (confirm("모든 할 일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
                this.service.clearAllTodos();
            }
        });
        leftControls.appendChild(clearCompletedBtn);
        leftControls.appendChild(clearAllBtn);
        controls.appendChild(leftControls);
        return controls;
    }
    handleAddTodo() {
        const titleInput = document.getElementById("todo-title-input");
        const descriptionInput = document.getElementById("todo-description-input");
        const priorityInput = document.getElementById("todo-priority-input");
        const title = titleInput.value.trim();
        if (!title) {
            titleInput.focus();
            return;
        }
        const todoData = {
            title,
            description: descriptionInput.value.trim() || undefined,
            priority: priorityInput.value,
        };
        const newTodo = this.service.createTodo(todoData);
        if (newTodo) {
            titleInput.value = "";
            descriptionInput.value = "";
            priorityInput.value = "medium";
            titleInput.focus();
        }
    }
    getPriorityLabel(priority) {
        const labels = {
            high: "높음",
            medium: "보통",
            low: "낮음",
        };
        return labels[priority];
    }
    formatDate(date) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
            return "오늘";
        }
        else if (diffDays === 1) {
            return "어제";
        }
        else if (diffDays < 7) {
            return `${diffDays}일 전`;
        }
        else {
            return date.toLocaleDateString("ko-KR");
        }
    }
}
