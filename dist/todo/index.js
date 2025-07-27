// Todo 모듈 진입점
export * from "./types";
export * from "./storage";
export * from "./service";
export * from "./ui";
import { TodoUI } from "./ui";
/**
 * Todo 모듈을 초기화합니다
 * @param container Todo UI가 렌더링될 컨테이너 엘리먼트
 * @returns TodoUI 인스턴스
 */
export function initializeTodo(container) {
    return new TodoUI(container);
}
/**
 * Todo 기능을 제거합니다
 * @param todoUI TodoUI 인스턴스
 */
export function destroyTodo(todoUI) {
    todoUI.destroy();
}
