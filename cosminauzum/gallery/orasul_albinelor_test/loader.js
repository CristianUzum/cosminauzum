document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.getElementById("loader-container");

    // Adaugă loader-ul în container
    const loaderHTML = `
      <div class="loader">
        <ul class="hexagon-container">
          <li class="hexagon hex_1"></li>
          <li class="hexagon hex_2"></li>
          <li class="hexagon hex_3"></li>
          <li class="hexagon hex_4"></li>
          <li class="hexagon hex_5"></li>
          <li class="hexagon hex_6"></li>
          <li class="hexagon hex_7"></li>
        </ul>
      </div>
    `;
    loaderContainer.innerHTML = loaderHTML;

    // Ascunde loader-ul și afișează conținutul paginii după încărcare
    window.addEventListener("load", function () {
        setTimeout(function () {
            loaderContainer.style.display = "none"; // Ascunde loader-ul
            document.body.style.visibility = "visible"; // Afișează conținutul paginii
        }, 3000); // Așteaptă 1 secundă pentru a simula încărcarea
    });
});