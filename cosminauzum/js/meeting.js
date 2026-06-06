// free schedule modal
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("schedule-modal");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const closeModalBtn = document.querySelector(".close-modal-btn");

    openModalBtns.forEach(button => {
        button.addEventListener("click", function () {
            modal.style.display = "block";
            this.style.visibility = "hidden";
        });
    });

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
        document.querySelectorAll(".open-modal-btn").forEach(btn => btn.style.visibility = "visible");
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

// schedule calendar
const today = new Date();
let selectedDate = null;
let availableTimes = ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'];
let bookedTimes = [];

// Load booked times from localStorage
function loadBookedTimes() {
    const storedTimes = localStorage.getItem('bookedTimes');
    if (storedTimes) {
        bookedTimes = JSON.parse(storedTimes);
    }
}

// Save booked times to localStorage
function saveBookedTimes() {
    localStorage.setItem('bookedTimes', JSON.stringify(bookedTimes));
}

// Initialize the calendar
function initializeCalendar() {
    const monthName = document.getElementById('month-name');
    const daysGrid = document.getElementById('days-grid');
    const selectedDayText = document.getElementById('selected-day');

    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    loadBookedTimes();

    function updateCalendar() {
        monthName.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
        daysGrid.innerHTML = '';

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            daysGrid.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayButton = document.createElement('button');
            const dayDate = new Date(currentYear, currentMonth, day);

            dayButton.textContent = day;

            if (
                dayDate.getDate() === today.getDate() &&
                dayDate.getMonth() === today.getMonth() &&
                dayDate.getFullYear() === today.getFullYear()
            ) {
                dayButton.classList.add('today');
            }

            if (dayDate < today) {
                dayButton.classList.add('disabled');
            } else {
                dayButton.addEventListener('click', () => {
                    selectedDate = dayDate;
                    highlightSelectedDay(dayButton);
                    updateAvailableTimes(dayDate);
                });
            }

            daysGrid.appendChild(dayButton);
        }
    }

    function highlightSelectedDay(selectedButton) {
        document.querySelectorAll('.days-grid button').forEach(button => button.classList.remove('selected'));
        selectedButton.classList.add('selected');
        selectedDayText.textContent = `Selected Day: ${selectedDate.toDateString()}`;
    }

    function convertTo24HourFormat(time) {
        const [hour, minute] = time.split(/[: ]/);
        let hours24 = parseInt(hour, 10);
        const period = time.split(" ")[1];

        if (period === "PM" && hours24 < 12) hours24 += 12;
        if (period === "AM" && hours24 === 12) hours24 = 0;

        return `${String(hours24).padStart(2, '0')}:${minute}`;
    }

    function convertTimeToTimezone(timeInRomanian, selectedTimezone) {
        const [hours, minutes] = timeInRomanian.split(':');
        const romanianDate = new Date(selectedDate);
        romanianDate.setHours(hours, minutes);

        const convertedTime = new Date(romanianDate.toLocaleString("en-US", { timeZone: selectedTimezone }));

        return `${String(convertedTime.getHours()).padStart(2, '0')}:${String(convertedTime.getMinutes()).padStart(2, '0')}`;
    }

    function updateAvailableTimes(date) {
        const timeslotDiv = document.querySelector('.timeslots');
        const selectedTimezone = document.getElementById('timezone-select').value;
        timeslotDiv.innerHTML = '';

        availableTimes.forEach(time => {
            const timeButton = document.createElement('button');
            const timeIn24Hour = convertTo24HourFormat(time);
            const convertedTime = new Date(`${date.toDateString()} ${timeIn24Hour} GMT+0200`).toLocaleTimeString('en-US', {
                timeZone: selectedTimezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            timeButton.textContent = convertedTime;

            const timeInRomanianFormat = `${date.toDateString()} - ${time}`;
            if (bookedTimes.includes(timeInRomanianFormat)) {
                timeButton.disabled = true;
                timeButton.classList.add('disabled');
            } else {
                timeButton.addEventListener('click', () => {
                    scheduleTime(timeInRomanianFormat, timeButton);
                });
            }

            timeslotDiv.appendChild(timeButton);
        });
    }

    document.getElementById('timezone-select').addEventListener('change', () => {
        if (selectedDate) {
            updateAvailableTimes(selectedDate);
        }
    });

    function scheduleTime(timeSlot, timeButton) {
        document.getElementById('calendar-section').style.display = 'none';
        document.getElementById('timeslots-section').style.display = 'none';
        document.getElementById('form-section').style.display = 'block';

        document.getElementById('meeting-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const selectedTimezone = document.getElementById('timezone-select').value;

            sendEmail(name, email, phone, message, selectedDate, timeSlot, selectedTimezone, timeButton);
        });
    }

    function sendEmail(name, email, phone, message, selectedDate, timeSlot, selectedTimezone, timeButton) {
        const timeInRomanian = timeSlot.split(' - ')[1];
        const romanianDateTime = new Date(`${selectedDate.toDateString()} ${timeInRomanian} GMT+0200`);
        const convertedTime = romanianDateTime.toLocaleTimeString('en-US', {
            timeZone: selectedTimezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        if (convertedTime === 'Invalid Date') {
            console.error("Invalid Date for conversion");
            alert("Error with timezone conversion. Please try again.");
            return;
        }

        const emailParams = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            date: selectedDate.toDateString(),
            timeRomanian: timeInRomanian,
            userTime: convertedTime,
            timezone: selectedTimezone
        };

        emailjs.send("service_lcpt396", "template_636ucmn", emailParams)
            .then(function (response) {
                console.log("SUCCESS!", response.status, response.text);

                sendConfirmationToUser(name, email, timeSlot, convertedTime, selectedTimezone);
                bookedTimes.push(timeSlot);
                saveBookedTimes();

                timeButton.disabled = true;
                timeButton.classList.add('disabled');

                alert(`Your meeting is scheduled on ${selectedDate.toDateString()} at ${timeInRomanian} (Romanian Time), which is ${convertedTime} (${selectedTimezone}).`);
                location.reload();
            }, function (error) {
                console.log("FAILED...", error);
                alert("Error sending email. Please try again.");
            });
    }

    function sendConfirmationToUser(name, userEmail, timeSlot, userTime, selectedTimezone) {
        const timeInRomanian = timeSlot.split(' - ')[1];

        const userEmailParams = {
            name: name,
            email: userEmail,
            timeRomanian: timeInRomanian,
            userTime: userTime,
            timezone: selectedTimezone
        };

        emailjs.send("service_lcpt396", "template_636ucmn", userEmailParams)
            .then(function (response) {
                console.log("Confirmation email sent to the user!", response.status, response.text);
            }, function (error) {
                console.log("Failed to send confirmation to the user...", error);
            });
    }

    document.getElementById('back-button').addEventListener('click', () => {
        document.getElementById('calendar-section').style.display = 'block';
        document.getElementById('timeslots-section').style.display = 'block';
        document.getElementById('form-section').style.display = 'none';
    });

    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12;
        updateCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12;
        updateCalendar();
    });

    updateCalendar();
}

// Load the calendar on page load
document.addEventListener('DOMContentLoaded', initializeCalendar);
