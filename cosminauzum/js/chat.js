// Get elements
// const chatIcon = document.getElementById('chat-icon');
// const chatBox = document.getElementById('chat-box');
// const closeBtn = document.getElementById('close-btn');
// const sendBtn = document.getElementById('send-btn');
// const userInput = document.getElementById('user-input');
// const chatMessages = document.getElementById('chat-messages');

// // Open chat box and hide envelope icon
// chatIcon.addEventListener('click', () => {
//     chatBox.classList.remove('hidden');
//     chatBox.style.display = 'flex'; // Show chat box
//     chatIcon.style.display = 'none'; // Hide the envelope icon
//     initialBotMessage(); // Display initial message
// });

// // Close chat box and show envelope icon
// closeBtn.addEventListener('click', () => {
//     chatBox.classList.add('hidden');
//     chatBox.style.display = 'none'; // Hide the chat box
//     chatIcon.style.display = 'block'; // Show the envelope icon again
// });
const chatIcons = document.querySelectorAll('.chat-icon');

// Select by class
const chatBox = document.getElementById('chat-box');
const closeBtn = document.getElementById('close-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');


// Open chat box and hide envelope icon on chat icon click
chatIcons.forEach(chatIcon => {
  chatIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent bubbling

    chatBox.classList.remove('hidden');
    chatBox.style.display = 'flex'; // Show chat box
    chatIcon.style.display = 'none'; // Hide the envelope icon
    initialBotMessage(); // Display initial message


    // Close chat box and show envelope icon
    closeBtn.addEventListener('click', () => {
      chatBox.classList.add('hidden');
      chatBox.style.display = 'none'; // Hide the chat box
      chatIcon.style.display = 'block'; // Show the envelope icon again
    });
  });
});
// Add messages to the chat window
function addMessage(content, type) {
  const message = document.createElement('div');
  message.classList.add('message', type);
  message.innerHTML = content;
  chatMessages.appendChild(message);

  // Scroll to the bottom immediately after adding the message
  scrollToBottom();
}

// Scroll to the bottom of the chat box
function scrollToBottom() {
  const lastMessage = chatMessages.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView(false); // false to scroll to the bottom smoothly
  }
}

// Display the initial message with clickable buttons
function initialBotMessage() {
  const welcomeMessage = `
        Hi, I am the chatbot. How can I help you today?<br><br>
        Please select from the following subjects:
    `;

  addMessage(welcomeMessage, 'bot-message');

  const buttonsHTML = `
        <div id="chat-buttons">
            <button class="button-option" data-value="business-hours">1. Business Hours</button>
            <button class="button-option" data-value="contact-support">2. Contact Support</button>
            <button class="button-option" data-value="services">3. Services</button>
        </div>
    `;
  addMessage(buttonsHTML, 'bot-message');

  setupButtons(); // Set up button click events
}

// Handle button clicks
function setupButtons() {
  const buttons = document.querySelectorAll('.button-option');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');
      handleResponse(value);

      // Scroll to the bottom after handling the response
      scrollToBottom();
    });
  });
}

// Handle user input and respond accordingly
sendBtn.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (userText !== '') {
    addMessage(userText, 'user-message');
    userInput.value = ''; // Clear input field
    handleResponse(userText.toLowerCase());
  }
});

// Handle chatbot responses based on user input
function handleResponse(input) {
  let botResponse = '';

  switch (input) {
    case 'business-hours':
      botResponse = "Our business hours are from 9 AM to 6 PM, Monday to Friday.";
      break;
    case 'contact-support':
      botResponse = "You can contact support by emailing contact@cosminauzum.com or calling +40733402340.";
      break;
    case 'services':
      botResponse = "We offer consulting, project management, and software development services.";
      break;
    default:
      // If the input does not match predefined options, suggest filling out a contact form
      botResponse = `
                I didn’t understand your question. If you have a different inquiry, 
                please provide your contact details, and we will get back to you. 
                <a href="./contact.html#form" class="custom-anchor-class" target="_blank">Click here to fill out the contact form</a>.
            `;
      break;
  }



  addMessage(botResponse, 'bot-message');
}

