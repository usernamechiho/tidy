class TodoStorage {
    static load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const todos = JSON.parse(data);
                return todos.map((todo) => ({
                    ...todo,
                    createdAt: new Date(todo.createdAt),
                }));
            }
        }
        catch (error) {
            console.error("Failed to load todos:", error);
        }
        return [];
    }
    static save(todos) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
        }
        catch (error) {
            console.error("Failed to save todos:", error);
        }
    }
    static add(text) {
        const todos = this.load();
        const newTodo = {
            id: Date.now().toString(),
            text: text.trim(),
            createdAt: new Date(),
        };
        todos.push(newTodo);
        this.save(todos);
        return newTodo;
    }
    static remove(id) {
        const todos = this.load();
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        this.save(filteredTodos);
    }
}
TodoStorage.STORAGE_KEY = "tidy-todos";
export { TodoStorage };
