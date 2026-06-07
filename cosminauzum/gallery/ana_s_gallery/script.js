
"use strict";
(function () {
    window.onload = () => {
        const obj = document.querySelector("#gallery");
        const time = 10000;
        function animStart() {
            if (obj.classList.contains("active") == false) {
                obj.classList.add("active");
                setTimeout(() => {
                    animEnd();
                }, time);
            }
        }
        function animEnd() {
            obj.classList.remove("active");
            obj.offsetWidth;
        }
        document.addEventListener("scroll", function () {
            // scroll or scrollend
            animStart();
        });
        window.addEventListener("resize", animStart);
        animStart();
    };
})();
function openModal(imgId) {
    const img = document.getElementById(imgId);
    const modal = document.getElementById("modal");
    document.getElementById("modal-img").src = img.src;
    document.getElementById("modal-caption").textContent = img.nextElementSibling.textContent;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}