document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('save-note');
    const noteTitle = document.getElementById('note-title');
    const noteCategory = document.getElementById('note-category');
    const noteContent = document.getElementById('note-content');
    const noteImportant = document.getElementById('note-important');
    const notesGrid = document.getElementById('notes-grid');

    const todoForm = document.getElementById('save-todo');
    const todoTask = document.getElementById('todo-task');
    const todoCategory = document.getElementById('todo-category');
    const todoImportant = document.getElementById('todo-important');
    const todoList = document.getElementById('todo-list');

    const sortImportant = document.getElementById('sort-important');
    const sortCategory = document.getElementById('sort-category');
    const sortDate = document.getElementById('sort-date');

    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDate = document.getElementById('modal-date');
    const modalImportant = document.getElementById('modal-important');
    const modalContent = document.getElementById('modal-content');
    const editButton = document.getElementById('edit-button');
    const viewMode = document.getElementById('view-mode');
    const editMode = document.getElementById('edit-mode');
    const editForm = document.getElementById('edit-form');
    const editTitle = document.getElementById('edit-title');
    const editCategory = document.getElementById('edit-category');
    const editContent = document.getElementById('edit-content');
    const editImportant = document.getElementById('edit-important');
    const cancelEdit = document.getElementById('cancel-edit');
    const closeModal = document.querySelector('.close-modal');

    let editingNoteId = null; // ID-ul notiței în curs de editare
    let editingTodoId = null; // ID-ul task-ului în curs de editare

    // Încarcă notițele și task-urile salvate din localStorage
    loadNotes();
    loadTodos();

    // Salvare notiță
    noteForm.addEventListener('click', function () {
        const title = noteTitle.value.trim();
        const category = noteCategory.value.trim();
        const content = noteContent.value.trim();
        const important = noteImportant.checked;
        const date = new Date().toISOString(); // Data curentă

        if (title && content) {
            saveNote(title, category, content, important, date);
            noteTitle.value = '';
            noteCategory.value = '';
            noteContent.value = '';
            noteImportant.checked = false;
            loadNotes();
        }
    });

    // Salvare task
    todoForm.addEventListener('click', function () {
        const task = todoTask.value.trim();
        const category = todoCategory.value.trim();
        const important = todoImportant.checked;
        const date = new Date().toISOString(); // Data curentă

        if (task) {
            saveTodo(task, category, important, date);
            todoTask.value = '';
            todoCategory.value = '';
            todoImportant.checked = false;
            loadTodos();
        }
    });

    // Sortare după importantă
    sortImportant.addEventListener('click', function () {
        sortByImportance();
    });

    // Sortare după categorie
    sortCategory.addEventListener('click', function () {
        sortByCategory();
    });

    // Sortare după dată
    sortDate.addEventListener('click', function () {
        sortByDate();
    });

    // Deschide modal pentru notiță/task
    function openModal(item) {
        modalTitle.textContent = item.title || item.task;
        modalCategory.textContent = item.category || 'Fără categorie';
        modalDate.textContent = new Date(item.date).toLocaleString();
        modalImportant.textContent = item.important ? 'Da' : 'Nu';
        modalContent.textContent = item.content || item.task;
        modal.style.display = 'flex';

        // Setează ID-ul elementului pentru editare
        if (item.title) {
            editingNoteId = item.id; // Pentru notițe
        } else {
            editingTodoId = item.id; // Pentru task-uri
        }

        // Afișează starea de vizualizare
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
    }

    // Închide modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Trece în starea de editare
    editButton.addEventListener('click', function () {
        // Preia datele din starea de vizualizare
        editTitle.value = modalTitle.textContent;
        editCategory.value = modalCategory.textContent;
        editContent.value = modalContent.textContent;
        editImportant.checked = modalImportant.textContent === 'Da';

        // Ascunde starea de vizualizare și afișează starea de editare
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
    });

    // Anulează editarea și revine la starea de vizualizare
    cancelEdit.addEventListener('click', function () {
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
    });

    // Salvare modificări din modal
    editForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Previne reîncărcarea paginii

        const title = editTitle.value.trim();
        const category = editCategory.value.trim();
        const content = editContent.value.trim(); // Pentru notițe
        const task = editTitle.value.trim(); // Pentru task-uri (folosește titlul ca task)
        const important = editImportant.checked;
        const date = new Date().toISOString(); // Data curentă

        if (title && (content || task)) {
            if (editingNoteId !== null) {
                // Editare notiță existentă
                updateNote(editingNoteId, title, category, content, important, date);
                editingNoteId = null;
            } else if (editingTodoId !== null) {
                // Editare task existent
                updateTodo(editingTodoId, task, category, important, date); // Folosește `task` în loc de `content`
                editingTodoId = null;
            }
            modal.style.display = 'none';
            loadNotes();
            loadTodos(); // Reîncarcă lista de task-uri
        }
    });

    // Funcții pentru notițe
    function saveNote(title, category, content, important, date) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ id: Date.now(), title, category, content, important, date });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function updateNote(id, title, category, content, important, date) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteIndex = notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            notes[noteIndex] = { id, title, category, content, important, date };
            localStorage.setItem('notes', JSON.stringify(notes));
        }
    }

    function deleteNote(id) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    }

    function loadNotes() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesGrid.innerHTML = '';
        notes.forEach((note, index) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            card.innerHTML = `
                <h3>${note.title}</h3>
                <p><strong>Categorie:</strong> ${note.category || 'Fără categorie'}</p>
                <p><strong>Data:</strong> ${new Date(note.date).toLocaleString()}</p>
                <p><strong>Importantă:</strong> ${note.important ? 'Da' : 'Nu'}</p>
                <div class="content">${note.content}</div>
                <div class="actions">
                    <button class="view" onclick="openModal(${JSON.stringify(note).replace(/"/g, '&quot;')})">Vezi</button>
                    <button class="delete" onclick="deleteNote(${note.id})">Ștergere</button>
                </div>
            `;
            notesGrid.appendChild(card);
        });
    }

    // Funcții pentru task-uri
    function saveTodo(task, category, important, date) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ id: Date.now(), task, category, important, date });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateTodo(id, task, category, important, date) {
        console.log('Actualizare task:', { id, task, category, important, date }); // Debug
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            todos[todoIndex] = { id, task, category, important, date };
            localStorage.setItem('todos', JSON.stringify(todos));
            console.log('Task actualizat:', todos[todoIndex]); // Debug
        } else {
            console.log('Task-ul nu a fost găsit în localStorage.'); // Debug
        }
    }

    function deleteTodo(id) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    function loadTodos() {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const item = document.createElement('div');
            item.className = 'todo-item';
            item.innerHTML = `
                <h3>${todo.task}</h3>
                <p><strong>Categorie:</strong> ${todo.category || 'Fără categorie'}</p>
                <p><strong>Data:</strong> ${new Date(todo.date).toLocaleString()}</p>
                <p><strong>Important:</strong> ${todo.important ? 'Da' : 'Nu'}</p>
                <div class="actions">
                    <button class="view" onclick="openModal(${JSON.stringify(todo).replace(/"/g, '&quot;')})">Vezi</button>
                    <button class="delete" onclick="deleteTodo(${todo.id})">Ștergere</button>
                </div>
            `;
            todoList.appendChild(item);
        });
    }

    // Funcții de sortare
    function sortByImportance() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        // Sortează notițele după importanță
        notes.sort((a, b) => b.important - a.important);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();

        // Sortează task-urile după importanță
        todos.sort((a, b) => b.important - a.important);
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    function sortByCategory() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        // Sortează notițele după categorie
        notes.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();

        // Sortează task-urile după categorie
        todos.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    function sortByDate() {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        // Sortează notițele după dată
        notes.sort((a, b) => new Date(b.date) - new Date(a.date));
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();

        // Sortează task-urile după dată
        todos.sort((a, b) => new Date(b.date) - new Date(a.date));
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    // Funcții globale pentru ștergere
    window.deleteNote = function (id) {
        if (confirm('Sigur vrei să ștergi această notiță?')) {
            deleteNote(id);
        }
    };

    window.deleteTodo = function (id) {
        if (confirm('Sigur vrei să ștergi acest task?')) {
            deleteTodo(id);
        }
    };

    // Deschide modal
    window.openModal = function (item) {
        modalTitle.textContent = item.title || item.task;
        modalCategory.textContent = item.category || 'Fără categorie';
        modalDate.textContent = new Date(item.date).toLocaleString();
        modalImportant.textContent = item.important ? 'Da' : 'Nu';
        modalContent.textContent = item.content || item.task;
        modal.style.display = 'flex';

        // Setează ID-ul elementului pentru editare
        if (item.title) {
            editingNoteId = item.id;
        } else {
            editingTodoId = item.id;
        }

        // Afișează starea de vizualizare
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
    };

    // Butoane de sortare
    sortImportant.addEventListener('click', sortByImportance);
    sortCategory.addEventListener('click', sortByCategory);
    sortDate.addEventListener('click', sortByDate);
});