document.addEventListener('DOMContentLoaded', () => {
    // Adds span around each letter for individual dripping effect
    const bloodyText = document.querySelector('.bloody-text');
    const text = bloodyText.textContent;
    bloodyText.innerHTML = '';
    
    text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        bloodyText.appendChild(span);
    });
});
