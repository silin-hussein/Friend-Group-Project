const messagesDom = document.getElementById('messages');

let username;

const message = {
  "id": 12,
  "author": "Eve Anderson",
  "message": "It's sunny and warm outside!",
  "datetime": "2023-01-01T12:45:00"
}

function sendName() {
  username = document.getElementById("enterName").value;
  document.getElementById("namePopup").style.display = "none";
  loadPrevMessages();

  document.querySelector('main').innerHTML += `
      <div id="messageField">
        <h2>${username}</h2>
        <div>Message your friends:</div>
        <input type="text" id="enterMessage">
          <button class="buttonSend">send</button>
      </div>
  `;
}

function loadPrevMessages() {
  messagesDom.style.display = 'flex';

  for (let i = 0; i < 15; i++) {
    printMessage(message);
  }
}

function printMessage(messageJson) {
  messagesDom.innerHTML += `
    <div class="message">
        <strong>${message.datetime}</strong><span>${message.author}:</span>
        </br>
        ${message.message}
    </div>
  `;

  function scrollToBottom() {
    var chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}