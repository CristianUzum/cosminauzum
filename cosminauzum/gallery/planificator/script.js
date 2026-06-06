document.addEventListener('DOMContentLoaded', () => {
    // Setează data curentă pentru câmpul "current-date"
    const dateInput = document.getElementById("current-date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.value = today;
    }

    // Setează ora curentă pentru câmpul "time-input"
    const timeInput = document.getElementById("time-input");
    if (timeInput) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
    }

    // Încarcă activitățile salvate
    loadActivities();
});

const form = document.getElementById('activity-form');
form.addEventListener('submit', addActivity);

function addActivity(e) {
    e.preventDefault();

    const day = document.getElementById('day-select').value;
    const time = document.getElementById('time-input').value;
    const activity = document.getElementById('activity-input').value;

    if (activity.trim() === "") {
        alert("Activitatea nu poate fi goală!");
        return;
    }

    const activityItem = document.createElement('li');
    activityItem.textContent = `${time} - ${activity}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Șterge';
    deleteButton.onclick = function () {
        activityItem.remove();
        saveActivities();
    };

    activityItem.appendChild(deleteButton);
    document.getElementById(day).querySelector('.activities-list').appendChild(activityItem);

    saveActivities();
    form.reset();

    // Setează din nou data curentă în câmpul de dată după resetarea formularului
    const dateInput = document.getElementById("current-date");
    const today = new Date().toISOString().split("T")[0];
    if (dateInput) {
        dateInput.value = today;
    }

    // Setează din nou ora curentă în câmpul de oră după resetarea formularului
    const timeInput = document.getElementById("time-input");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (timeInput) {
        timeInput.value = `${hours}:${minutes}`;
    }
}

function saveActivities() {
    const weekData = {};
    document.querySelectorAll('.day').forEach(day => {
        const activities = [];
        day.querySelectorAll('li').forEach(item => {
            activities.push(item.textContent.replace('Șterge', '').trim());
        });
        weekData[day.id] = activities;
    });
    localStorage.setItem('activities', JSON.stringify(weekData));
}

function loadActivities() {
    const savedActivities = JSON.parse(localStorage.getItem('activities'));
    if (savedActivities) {
        for (const day in savedActivities) {
            savedActivities[day].forEach(activity => {
                const activityItem = document.createElement('li');
                activityItem.textContent = activity;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Șterge';
                deleteButton.onclick = function () {
                    activityItem.remove();
                    saveActivities();
                };

                activityItem.appendChild(deleteButton);
                document.getElementById(day).querySelector('.activities-list').appendChild(activityItem);
            });
        }
    }
}
