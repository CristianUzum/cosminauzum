document.addEventListener('DOMContentLoaded', function () {
    let translations = {};
    let currentLang = 'ro'; // Limba implicită

    // Încarcă traducerile din fișierul JSON
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translations = data;
            changeLanguage(currentLang); // Aplică limba implicită la încărcarea paginii
        })
        .catch(error => console.error('Eroare la încărcarea traducerilor:', error));

    // Funcție pentru schimbarea limbii
    function changeLanguage(lang) {
        currentLang = lang;
        const translation = translations[lang];

        // Actualizează textul în funcție de limba selectată
        document.querySelector('h1').textContent = translation.title;
        document.querySelector('.product-input').placeholder = translation.addProductPlaceholder;
        document.querySelector('.quantity-input').placeholder = translation.quantityPlaceholder;
        document.querySelector('.add-btn').textContent = translation.addButton;
        document.getElementById('save').textContent = translation.saveButton;
        document.getElementById('share').textContent = translation.shareButton;

        // Actualizează butoanele "Șterge"
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.textContent = translation.deleteButton;
        });

        // Actualizează butonul "Selectează toate produsele"
        const selectAllProductsButton = document.getElementById('select-all-products');
        if (selectAllProductsButton) {
            selectAllProductsButton.textContent = translation.selectAllProductsButton;
        }

        // Actualizează butonul "Deselectează toate produsele"
        const deselectAllProductsButton = document.getElementById('deselect-all-products');
        if (deselectAllProductsButton) {
            deselectAllProductsButton.textContent = translation.deselectAllProductsButton;
        }

        // Actualizează categoriile
        const categories = translation.categories;
        Object.keys(categories).forEach(categoryId => {
            const categoryElement = document.getElementById(categoryId);
            if (categoryElement) {
                categoryElement.querySelector('h2').textContent = categories[categoryId];
            }
        });

        // Actualizează unitățile de măsură
        const units = translation.units;
        const unitOptions = document.querySelectorAll('.unit-input option');
        unitOptions.forEach(option => {
            const unitValue = option.value;
            option.textContent = units[unitValue];
        });

        // Actualizează opțiunile din selectorul de categorii
        const categoryOptions = document.querySelectorAll('.category-input option');
        categoryOptions.forEach(option => {
            const categoryId = option.value;
            option.textContent = categories[categoryId];
        });
    }

    // Adaugă evenimente pentru butoanele de schimbare a limbii
    document.querySelectorAll('.language-buttons button').forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // Încarcă lista salvată
    loadList();

    // Adăugare produs
    document.querySelector('.add-btn').addEventListener('click', function () {
        const productInput = document.querySelector('.product-input');
        const quantityInput = document.querySelector('.quantity-input');
        const unitInput = document.querySelector('.unit-input');
        const categoryInput = document.querySelector('.category-input');
        const productName = productInput.value.trim();
        const quantity = quantityInput.value.trim();
        const unit = unitInput.value;
        const categoryId = categoryInput.value;

        if (productName && quantity) {
            const category = document.getElementById(categoryId);
            if (!category) {
                console.error("Categoria nu a fost găsită!");
                return;
            }

            const list = category.querySelector('ul');

            const newItem = document.createElement('li');
            newItem.innerHTML = `
                <input type="checkbox">
                <span class="product-name">${productName}</span>
                <input type="number" class="quantity" min="1" value="${quantity}">
                <select class="unit">
                    <option value="buc" ${unit === 'buc' ? 'selected' : ''}>buc</option>
                    <option value="g" ${unit === 'g' ? 'selected' : ''}>g</option>
                    <option value="kg" ${unit === 'kg' ? 'selected' : ''}>kg</option>
                    <option value="ml" ${unit === 'ml' ? 'selected' : ''}>ml</option>
                    <option value="L" ${unit === 'L' ? 'selected' : ''}>L</option>
                    <option value="pachet" ${unit === 'pachet' ? 'selected' : ''}>pachet</option>
                </select>
                <button class="delete-btn">Șterge</button>
            `;

            list.appendChild(newItem);
            category.style.display = 'block'; // Afișează categoria dacă era ascunsă

            productInput.value = '';
            quantityInput.value = '';
            unitInput.value = 'buc';

            saveList();
        }
    });

    // Ștergere produs și ascundere categorie dacă este goală
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            // Șterge produsul
            const productItem = event.target.closest('li');
            const categoryList = productItem.closest('ul'); // Obține lista de produse
            const categoryDiv = categoryList.closest('.category'); // Obține div-ul categoriei
            productItem.remove(); // Șterge produsul

            // Verifică dacă lista de produse este acum goală
            if (categoryList.children.length === 0) {
                categoryDiv.style.display = 'none'; // Ascunde categoria dacă este goală
            }

            saveList(); // Salvează lista actualizată
        }
    });

    // Salvare manuală
    document.getElementById('save').addEventListener('click', function () {
        saveList();
        alert(translations[currentLang].saveConfirmation || 'Lista a fost salvată!');
    });

    // Salvare automată la modificări
    document.addEventListener('change', function (event) {
        if (event.target.matches('.quantity, .unit, input[type="checkbox"]')) {
            saveList();
        }
    });

    // Funcție de salvare în localStorage
    function saveList() {
        const categories = document.querySelectorAll('.category');
        const listData = [];

        categories.forEach(category => {
            const categoryId = category.id;
            const products = [];

            category.querySelectorAll('li').forEach(item => {
                const productName = item.querySelector('.product-name').innerText;
                const quantity = item.querySelector('.quantity').value;
                const unit = item.querySelector('.unit').value;
                const isChecked = item.querySelector('input[type="checkbox"]').checked;
                products.push({ productName, quantity, unit, isChecked });
            });

            listData.push({ categoryId, products });
        });

        localStorage.setItem('shoppingList', JSON.stringify(listData));
        console.log("Lista a fost salvată!", listData);
    }

    // Funcție de încărcare din localStorage
    function loadList() {
        const storedData = localStorage.getItem('shoppingList');
        if (!storedData) {
            console.log("Nu există date salvate în localStorage.");
            return;
        }

        const listData = JSON.parse(storedData);
        listData.forEach(categoryData => {
            const category = document.getElementById(categoryData.categoryId);
            if (!category) return;

            const list = category.querySelector('ul');
            list.innerHTML = '';

            categoryData.products.forEach(product => {
                const newItem = document.createElement('li');
                newItem.innerHTML = `
                    <input type="checkbox" ${product.isChecked ? 'checked' : ''}>
                    <span class="product-name">${product.productName}</span>
                    <input type="number" class="quantity" min="1" value="${product.quantity}">
                    <select class="unit">
                        <option value="buc" ${product.unit === 'buc' ? 'selected' : ''}>buc</option>
                        <option value="g" ${product.unit === 'g' ? 'selected' : ''}>g</option>
                        <option value="kg" ${product.unit === 'kg' ? 'selected' : ''}>kg</option>
                        <option value="ml" ${product.unit === 'ml' ? 'selected' : ''}>ml</option>
                        <option value="L" ${product.unit === 'L' ? 'selected' : ''}>L</option>
                        <option value="pachet" ${product.unit === 'pachet' ? 'selected' : ''}>pachet</option>
                    </select>
                    <button class="delete-btn">Șterge</button>
                `;
                list.appendChild(newItem);
            });

            // Ascunde categoria dacă nu are produse
            if (list.children.length === 0) {
                category.style.display = 'none';
            }
        });

        console.log("Lista a fost încărcată!", listData);
    }

    // Partajare pe WhatsApp
    document.getElementById('share').addEventListener('click', function () {
        const translation = translations[currentLang]; // Folosește traducerile pentru limba curentă
        let listText = translation.shareText; // Textul de partajare în limba selectată

        document.querySelectorAll('.category').forEach(category => {
            const checkedItems = category.querySelectorAll('li input[type="checkbox"]:checked');
            if (checkedItems.length > 0) {
                let categoryName = category.querySelector('h2').innerText;
                listText += `\n${categoryName}:\n`;
                checkedItems.forEach(item => {
                    const productName = item.closest('li').querySelector('.product-name').innerText;
                    const quantity = item.closest('li').querySelector('.quantity').value;
                    const unit = item.closest('li').querySelector('.unit').value;
                    listText += `- ${productName} (${quantity} ${unit})\n`;
                });
            }
        });

        if (listText.trim() === translation.shareText.trim()) {
            alert(translation.noItemsSelected || "Nu ai selectat niciun produs pentru partajare!");
            return;
        }

        let encodedText = encodeURIComponent(listText);
        let whatsappUrl = `https://wa.me/?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    });

    // Ascunde categoriile goale la încărcarea paginii
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        const ul = category.querySelector('ul');
        if (ul.children.length === 0) {
            category.style.display = 'none';
        }
    });

    // Funcționalitatea butonului "Select All"
    const selectAllProductsButton = document.getElementById('select-all-products');
    if (selectAllProductsButton) {
        selectAllProductsButton.addEventListener('click', function () {
            // Selectează toate checkbox-urile din toate categoriile
            const allCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            console.log('Toate produsele au fost selectate.');
        });
    }

    // Funcționalitatea butonului "Deselect All"
    const deselectAllProductsButton = document.getElementById('deselect-all-products');
    if (deselectAllProductsButton) {
        deselectAllProductsButton.addEventListener('click', function () {
            // Deselectează toate checkbox-urile din toate categoriile
            const allCheckboxes = document.querySelectorAll('.category input[type="checkbox"]');
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            console.log('Toate produsele au fost deselectate.');
        });
    }
});