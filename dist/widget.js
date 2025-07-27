"use strict";
(function () {
    function initializeWidget() {
        const widget = document.createElement("button");
        widget.className = `fixed
    bottom-8 right-8 w-16 h-16
    rounded-full shadow-xl z-10000
    flex items-center justify-center
    text-3xl font-bold border border-gray-300
    transition-transform duration-150 ease-in-out
    hover:scale-110 active:scale-100
    `;
        widget.innerHTML = "🐼";
        // 버튼 클릭 이벤트를 추가합니다.
        widget.addEventListener("click", () => {
            alert("Tidy 위젯이 클릭되었습니다!");
        });
        // 완성된 버튼을 페이지의 <body> 태그에 추가합니다.
        document.body.appendChild(widget);
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeWidget);
    }
    else {
        initializeWidget();
    }
})();
