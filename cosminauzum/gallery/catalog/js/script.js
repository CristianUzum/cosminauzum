// Initialize flipbook with Turn.js and add functionalities
document.addEventListener("DOMContentLoaded", function () {
    // Ensure flipbook element exists
    const flipbookElement = document.getElementById("flipbook");
    if (!flipbookElement) {
        console.error("Flipbook element not found!");
        return;
    }

    // Function to set display mode based on window width
    function setDisplayMode() {
        if ($(window).width() <= 768) {
            $("#flipbook").turn("display", "single"); // Single-page view for smaller screens
        } else {
            $("#flipbook").turn("display", "double"); // Double-page view for larger screens
        }
    }

    // Initialize the flipbook with Turn.js
    $("#flipbook").turn({
        width: 800,
        height: 600,
        autoCenter: true,
        display: $(window).width() <= 768 ? 'single' : 'double' // Set display type based on initial window width
    });

    // Initialize sound for page flipping with Howler.js
    var sound = new Howl({
        src: ['https://www.soundjay.com/misc/sounds/page-flip-4.mp3'],
        volume: 0.5
    });

    // Play sound when a page is turned
    $("#flipbook").on("turning", function () {
        sound.play();
    });

    // Handle the previous page button click
    document.getElementById("prev-page").addEventListener("click", function () {
        $("#flipbook").turn("previous"); // Navigate to the previous page
    });

    // Handle the next page button click
    document.getElementById("next-page").addEventListener("click", function () {
        $("#flipbook").turn("next"); // Navigate to the next page
    });

    // Variables to track touch swipe coordinates
    let startX = 0;
    let endX = 0;

    // Detect the start of a touch event
    flipbookElement.addEventListener("touchstart", function (event) {
        startX = event.touches[0].clientX; // Record the initial touch position (X coordinate)
    });

    // Detect the end of a touch event and determine swipe direction
    flipbookElement.addEventListener("touchend", function (event) {
        endX = event.changedTouches[0].clientX; // Record the final touch position (X coordinate)

        // Check swipe direction and navigate accordingly
        if (startX > endX + 50) {
            // Swipe left for the next page
            $("#flipbook").turn("next");
        } else if (startX < endX - 50) {
            // Swipe right for the previous page
            $("#flipbook").turn("previous");
        }
    });

    // Adjust flipbook display mode on window resize
    $(window).resize(function () {
        setDisplayMode();
    });

    // Set initial display mode based on window size
    setDisplayMode();
});
