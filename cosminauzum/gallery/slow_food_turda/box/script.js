document.addEventListener("DOMContentLoaded", () => {
    const languageButtons = document.querySelectorAll(".language-button");
    const elementsToTranslate = document.querySelectorAll("[data-key]");

    // Setează limba implicită
    let currentLanguage = "ro";
    translatePage(currentLanguage);

    // Ascultă evenimentele de click pe butoanele de limbă
    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentLanguage = button.getAttribute("data-lang");
            translatePage(currentLanguage);
        });
    });

    // Funcția de traducere
    function translatePage(language) {
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute("data-key");
            element.textContent = translations[language][key];
        });
    }
});