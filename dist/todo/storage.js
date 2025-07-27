const STORAGE_KEY = "tidy_todos";
export class TodoStorage {
    constructor() { }
    static getInstance() {
        if (!TodoStorage.instance) {
            TodoStorage.instance = new TodoStorage();
        }
        return TodoStorage.instance;
    }
    /**
     * 모든 Todo 목록을 가져옵니다
     */
    getAllTodos() {
        try {
            const todosJson = localStorage.getItem(STORAGE_KEY);
            if (!todosJson)
                return [];
            const todos = JSON.parse(todosJson);
            // Date 객체로 변환
            return todos.map((todo) => ({
                ...todo,
                createdAt: new Date(todo.createdAt),
                updatedAt: new Date(todo.updatedAt),
            }));
        }
        catch (error) {
            console.error("Todo 목록 로딩 중 오류:", error);
            return [];
        }
    }
    /**
     * ID로 특정 Todo를 가져옵니다
     */
    getTodoById(id) {
        const todos = this.getAllTodos();
        return todos.find((todo) => todo.id === id) || null;
    }
    /**
     * Todo를 저장합니다
     */
    saveTodo(todo) {
        try {
            const todos = this.getAllTodos();
            const existingIndex = todos.findIndex((t) => t.id === todo.id);
            if (existingIndex >= 0) {
                todos[existingIndex] = todo;
            }
            else {
                todos.push(todo);
            }
            this.saveTodos(todos);
            return true;
        }
        catch (error) {
            console.error("Todo 저장 중 오류:", error);
            return false;
        }
    }
    /**
     * Todo를 삭제합니다
     */
    deleteTodo(id) {
        try {
            const todos = this.getAllTodos();
            const filteredTodos = todos.filter((todo) => todo.id !== id);
            if (filteredTodos.length === todos.length) {
                return false; // 삭제할 항목이 없음
            }
            this.saveTodos(filteredTodos);
            return true;
        }
        catch (error) {
            console.error("Todo 삭제 중 오류:", error);
            return false;
        }
    }
    /**
     * 여러 Todo를 한번에 저장합니다
     */
    saveTodos(todos) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
            return true;
        }
        catch (error) {
            console.error("Todo 목록 저장 중 오류:", error);
            return false;
        }
    }
    /**
     * 모든 Todo를 삭제합니다
     */
    clearAllTodos() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        }
        catch (error) {
            console.error("Todo 목록 삭제 중 오류:", error);
            return false;
        }
    }
    /**
     * 스토리지 용량을 확인합니다
     */
    getStorageInfo() {
        try {
            const used = new Blob([localStorage.getItem(STORAGE_KEY) || ""]).size;
            const available = 1024 * 1024 * 5; // 대략 5MB (실제로는 브라우저마다 다름)
            return { used, available };
        }
        catch (error) {
            return { used: 0, available: 0 };
        }
    }
}
