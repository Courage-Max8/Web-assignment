/* ============================================
   SCRIPT.JS - Portfolio Website
   Handles the "Message to Dr Anietie" form on
   the Home page using localStorage.
   ============================================ */

// This function runs when the "Send Message" button is clicked
function sendMessage() {
  // Get the text the user typed into the input box
  var messageInput = document.getElementById("messageInput");
  var messageText = messageInput.value.trim();

  // Simple check: don't save an empty message
  if (messageText === "") {
    alert("Please type a message before sending.");
    return;
  }

  // Get any messages already saved in localStorage
  // (localStorage only stores text, so we use JSON to store a list)
  var storedMessages = localStorage.getItem("messagesToDrAnietie");
  var messagesList = [];

  if (storedMessages !== null) {
    messagesList = JSON.parse(storedMessages);
  }

  // Create a simple message object with the text and the date/time sent
  var newMessage = {
    text: messageText,
    date: new Date().toLocaleString()
  };

  // Add the new message to the list
  messagesList.push(newMessage);

  // Save the updated list back into localStorage
  localStorage.setItem("messagesToDrAnietie", JSON.stringify(messagesList));

  // Let the user know it worked
  var confirmationBox = document.getElementById("confirmation");
  confirmationBox.textContent = "Message sent to Dr Anietie! (saved on this browser)";

  // Clear the input box
  messageInput.value = "";

  // Show the updated list of messages on the page
  displaySavedMessages();
}

// This function shows all previously saved messages on the page
function displaySavedMessages() {
  var listContainer = document.getElementById("savedMessages");
  if (!listContainer) {
    return; // Exit if this element doesn't exist on the page
  }

  var storedMessages = localStorage.getItem("messagesToDrAnietie");
  listContainer.innerHTML = ""; // Clear the current list

  if (storedMessages === null) {
    listContainer.innerHTML = "<li>No messages sent yet.</li>";
    return;
  }

  var messagesList = JSON.parse(storedMessages);

  for (var i = 0; i < messagesList.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = messagesList[i].date + " - " + messagesList[i].text;
    listContainer.appendChild(listItem);
  }
}

// When the Home page loads, show any messages already saved
window.onload = function () {
  displaySavedMessages();
};
