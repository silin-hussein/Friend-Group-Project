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
        <label for="enterMessage">Message your friends</label>
        <input type="text" id="enterMessage">
          <button onclick="sendMessage()" class="buttonSend">send</button>
      </div>
  `;
}

async function loadPrevMessages() {
  const messagesDom = document.getElementById('messages');

  messagesDom.style.display = 'flex';

  readApi().then(
    apiJson => {
      for (let i = 0; i < apiJson.record.messages.length; i++) {
        printMessage(apiJson.record.messages[i]);
      }
    }
  )
}

function sendMessage() {
  const now = new Date();

  const newMessage = {
    "id": 12,
    "author": username,
    "message": document.getElementById('enterMessage').value,
    "datetime": now.toString()
  }

  console.log(newMessage)

  addMessage(newMessage);

  printMessage(newMessage);
}



function printMessage(messageJson) {
  const messagesDom = document.getElementById('messages');

  messagesDom.innerHTML += `
    <div class="message">
        ${messageJson.datetime}<br>
        <strong>${messageJson.author}:</strong>
        </br>
        ${messageJson.message}
    </div>
  `;

  // messagesDom.scrollTop = messagesDom.scrollHeight;
}