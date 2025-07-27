export class TodoStorage {
    static load() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        }
        catch (e) {
            console.error("Error loading todos:", e);
        }
        return [];
    }
    static save(todos) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
        }
        catch (e) {
            console.error("Error saving todos:", e);
        }
    }
}
TodoStorage.STORAGE_KEY = "todos";
