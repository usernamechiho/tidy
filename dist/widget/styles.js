export class Styles {
    static inject() {
        if (this.injected)
            return;
        const style = document.createElement("style");
        style.textContent = `
      .widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #007bff;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
      }
      .modal {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 300px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        display: none;
      }
      .modal.show {
        display: block;
      }
      .todo-input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 8px;
      }
      .todo-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }
      .todo-list {
        margin-top: 16px;
      }
      .todo-item {
        padding: 8px 0;
        border-bottom: 1px solid #eee;
      }
    `;
        document.head.appendChild(style);
        this.injected = true;
    }
}
Styles.injected = false;
