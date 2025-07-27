import { TodoStorage } from "./storage";
export class TodoService {
    constructor() {
        this.listeners = [];
        this.storage = TodoStorage.getInstance();
    }
    static getInstance() {
        if (!TodoService.instance) {
            TodoService.instance = new TodoService();
        }
        return TodoService.instance;
    }
    /**
     * 변경 사항을 리스닝합니다
     */
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
    /**
     * 리스너들에게 변경 사항을 알립니다
     */
    notifyListeners() {
        this.listeners.forEach((listener) => listener());
    }
    /**
     * 고유한 ID를 생성합니다
     */
    generateId() {
        return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    /**
     * 새로운 Todo를 생성합니다
     */
    createTodo(data) {
        try {
            const now = new Date();
            const todo = {
                id: this.generateId(),
                title: data.title.trim(),
                description: data.description?.trim() || "",
                completed: false,
                createdAt: now,
                updatedAt: now,
                priority: data.priority || "medium",
            };
            if (!todo.title) {
                throw new Error("할 일 제목은 필수입니다");
            }
            const success = this.storage.saveTodo(todo);
            if (success) {
                this.notifyListeners();
                return todo;
            }
            return null;
        }
        catch (error) {
            console.error("Todo 생성 중 오류:", error);
            return null;
        }
    }
    /**
     * Todo를 업데이트합니다
     */
    updateTodo(id, data) {
        try {
            const existingTodo = this.storage.getTodoById(id);
            if (!existingTodo) {
                throw new Error("존재하지 않는 Todo입니다");
            }
            const updatedTodo = {
                ...existingTodo,
                ...data,
                updatedAt: new Date(),
            };
            // 제목이 비어있으면 업데이트하지 않음
            if (data.title !== undefined && !data.title.trim()) {
                throw new Error("할 일 제목은 필수입니다");
            }
            if (data.title) {
                updatedTodo.title = data.title.trim();
            }
            if (data.description !== undefined) {
                updatedTodo.description = data.description.trim();
            }
            const success = this.storage.saveTodo(updatedTodo);
            if (success) {
                this.notifyListeners();
                return updatedTodo;
            }
            return null;
        }
        catch (error) {
            console.error("Todo 업데이트 중 오류:", error);
            return null;
        }
    }
    /**
     * Todo를 삭제합니다
     */
    deleteTodo(id) {
        try {
            const success = this.storage.deleteTodo(id);
            if (success) {
                this.notifyListeners();
            }
            return success;
        }
        catch (error) {
            console.error("Todo 삭제 중 오류:", error);
            return false;
        }
    }
    /**
     * Todo 완료 상태를 토글합니다
     */
    toggleTodoComplete(id) {
        const existingTodo = this.storage.getTodoById(id);
        if (!existingTodo)
            return null;
        return this.updateTodo(id, { completed: !existingTodo.completed });
    }
    /**
     * 모든 Todo를 가져옵니다
     */
    getAllTodos() {
        return this.storage.getAllTodos();
    }
    /**
     * 필터링된 Todo 목록을 가져옵니다
     */
    getFilteredTodos(filter) {
        let todos = this.getAllTodos();
        // 완료 상태 필터
        if (filter.completed !== undefined) {
            todos = todos.filter((todo) => todo.completed === filter.completed);
        }
        // 우선순위 필터
        if (filter.priority) {
            todos = todos.filter((todo) => todo.priority === filter.priority);
        }
        // 검색 필터
        if (filter.search) {
            const searchTerm = filter.search.toLowerCase();
            todos = todos.filter((todo) => todo.title.toLowerCase().includes(searchTerm) ||
                (todo.description &&
                    todo.description.toLowerCase().includes(searchTerm)));
        }
        // 정렬 (미완료 -> 완료, 우선순위 순, 최신순)
        return todos.sort((a, b) => {
            // 완료 상태 기준 정렬
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            // 우선순위 기준 정렬
            const priorityOrder = {
                high: 3,
                medium: 2,
                low: 1,
            };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) {
                return priorityDiff;
            }
            // 생성 시간 기준 정렬 (최신순)
            return b.createdAt.getTime() - a.createdAt.getTime();
        });
    }
    /**
     * ID로 Todo를 가져옵니다
     */
    getTodoById(id) {
        return this.storage.getTodoById(id);
    }
    /**
     * 통계 정보를 가져옵니다
     */
    getStats() {
        const todos = this.getAllTodos();
        const completed = todos.filter((todo) => todo.completed).length;
        const byPriority = todos.reduce((acc, todo) => {
            acc[todo.priority]++;
            return acc;
        }, { high: 0, medium: 0, low: 0 });
        return {
            total: todos.length,
            completed,
            pending: todos.length - completed,
            byPriority,
        };
    }
    /**
     * 모든 Todo를 삭제합니다
     */
    clearAllTodos() {
        const success = this.storage.clearAllTodos();
        if (success) {
            this.notifyListeners();
        }
        return success;
    }
    /**
     * 완료된 Todo들만 삭제합니다
     */
    clearCompletedTodos() {
        try {
            const todos = this.getAllTodos();
            const incompleteTodos = todos.filter((todo) => !todo.completed);
            const success = this.storage.saveTodos(incompleteTodos);
            if (success) {
                this.notifyListeners();
            }
            return success;
        }
        catch (error) {
            console.error("완료된 Todo 삭제 중 오류:", error);
            return false;
        }
    }
}
