document.addEventListener('DOMContentLoaded', function() {
    // Elemente pentru schimbarea temei
    const themeToggle = document.getElementById('theme-toggle');
    const colorPickerBtn = document.getElementById('color-picker');
    const colorModal = document.getElementById('color-modal');
    const closeModal = document.querySelector('.close');
    const applyColorsBtn = document.getElementById('apply-colors');
    const resetColorsBtn = document.getElementById('reset-colors');
    
    // Culori implicite
    const defaultColors = {
        primary: '#000000',
        secondary: '#555555',
        background: '#ffffff',
        text: '#333333',
        accent: '#888888',
        headerBg: '#f0f0f0',
        footerBg: '#222222',
        footerText: '#ffffff'
    };
    
    // Culori alternative (tema roz/purpurie - Kuromi & Melody)
    const altColors = {
        primary: '#ff66b2',
        secondary: '#9c27b0',
        background: '#fff5f9',
        text: '#333333',
        accent: '#e91e63',
        headerBg: '#fce4ec',
        footerBg: '#9c27b0',
        footerText: '#ffffff'
    };
    
    let isDefaultTheme = true;
    
    // Schimbare tema
    themeToggle.addEventListener('click', function() {
        if (isDefaultTheme) {
            applyColorTheme(altColors);
            themeToggle.textContent = 'Tema Alb-Negru';
        } else {
            applyColorTheme(defaultColors);
            themeToggle.textContent = 'Tema Kuromi & Melody';
        }
        isDefaultTheme = !isDefaultTheme;
    });
    
    // Deschide modalul pentru culori personalizate
    colorPickerBtn.addEventListener('click', function() {
        colorModal.style.display = 'block';
    });
    
    // Închide modalul
    closeModal.addEventListener('click', function() {
        colorModal.style.display = 'none';
    });
    
    // Închide modalul când se face click în afara lui
    window.addEventListener('click', function(event) {
        if (event.target === colorModal) {
            colorModal.style.display = 'none';
        }
    });
    
    // Aplică culorile personalizate
    applyColorsBtn.addEventListener('click', function() {
        const primaryColor = document.getElementById('primary-color').value;
        const secondaryColor = document.getElementById('secondary-color').value;
        const backgroundColor = document.getElementById('background-color').value;
        const textColor = document.getElementById('text-color').value;
        
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.style.setProperty('--background-color', backgroundColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--header-bg', lightenColor(backgroundColor, 10));
        document.documentElement.style.setProperty('--footer-bg', darkenColor(primaryColor, 20));
        
        colorModal.style.display = 'none';
    });
    
    // Resetează culorile la cele implicite
    resetColorsBtn.addEventListener('click', function() {
        applyColorTheme(defaultColors);
        colorModal.style.display = 'none';
        isDefaultTheme = true;
        themeToggle.textContent = 'Tema Kuromi & Melody';
    });
    
    // Funcție helper pentru aplicarea unei teme de culori
    function applyColorTheme(colors) {
        document.documentElement.style.setProperty('--primary-color', colors.primary);
        document.documentElement.style.setProperty('--secondary-color', colors.secondary);
        document.documentElement.style.setProperty('--background-color', colors.background);
        document.documentElement.style.setProperty('--text-color', colors.text);
        document.documentElement.style.setProperty('--accent-color', colors.accent);
        document.documentElement.style.setProperty('--header-bg', colors.headerBg);
        document.documentElement.style.setProperty('--footer-bg', colors.footerBg);
        document.documentElement.style.setProperty('--footer-text', colors.footerText);
    }
    
    // Funcții helper pentru manipularea culorilor
    function lightenColor(color, percent) {
        // Implementare simplificată - în producție folosiți o librărie de culori
        return color;
    }
    
    function darkenColor(color, percent) {
        // Implementare simplificată - în producție folosiți o librărie de culori
        return color;
    }
    
    // Inițializare valori în color picker
    document.getElementById('primary-color').value = defaultColors.primary;
    document.getElementById('secondary-color').value = defaultColors.secondary;
    document.getElementById('background-color').value = defaultColors.background;
    document.getElementById('text-color').value = defaultColors.text;
});