let username;

let chatLog = [];

const message = {
    "id": 12,
    "author": "Eve Anderson",
    "message": "It's sunny and warm outside!",
    "datetime": "2023-01-01T12:45:00"
}

async function initMessages() {
    document.getElementById('messages').style.display = 'flex';

    setTimeout(() => {
        document.querySelector('#enterMessage').addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                console.log('Enter key pressed');
            }
        });
    }, 10);

    // wait for messages to be visible
    printChatLog();

    // old code... may not work
    // readApi().then(
    //   apiJson => {
    //     for (let i = 0; i < apiJson.record.messages.length; i++) {
    //       printMessage(apiJson.record.messages[i]);
    //     }
    //   }
    // );
}

function sendName() {
    username = document.getElementById("enterName").value;
    document.getElementById("namePopup").style.display = "none";

    initMessages();

    document.querySelector('main').innerHTML += `
      <div id="messageField">
        <h2>${username}</h2>
        <label for="enterMessage">Message your friends:</label>
        <input type="text" id="enterMessage">
          <button onclick="sendMessage()" class="buttonSend">send</button>
      </div>
  `;
}

function sendMessage() {
  const now = new Date();

  const newMessage = {
    "id": 12,
    "author": username,
    "message": document.getElementById('enterMessage').value,
    "datetime": now.toString()
  }

  console.log(newMessage);

  //methode from different file
  addMessage(newMessage);

  printMessage(newMessage);
}

function printMessage(messageJson) {
  const messagesDom = document.getElementById('messages');

  document.getElementById('enterMessage').value = '';

  messagesDom.innerHTML += `
    <div class="message">
        ${messageJson.datetime}<br>
        <strong>${messageJson.author}:</strong>
        </br>
        ${messageJson.message}
    </div>
  `;

  messagesDom.scrollTo({
    top: messagesDom.scrollHeight,
    behavior: 'smooth'
  });
}

async function printChatLog() {
    await synchroniseLocalChatLog();

    // this command must be after await, because before it is not
    const messagesDom = document.getElementById('messages');

    const chatLogHtml= chatLogToHtml();

    console.log('waited')
    console.log(chatLogHtml);
    console.log(messagesDom)

    messagesDom.innerHTML = chatLogHtml;

    messagesDom.scrollTo({
        top: messagesDom.scrollHeight,
    });

    // synchroniseLocalChatLog().then(() => {
    //         console.log(chatLogToHtml())
    //         console.log(chatLog);
    //         const chatLogHtml= 'chat log html: ' + chatLogToHtml();
    //
    //         console.log(chatLogHtml);
    //
    //         messagesDom.innerHTML = chatLogToHtml();
    //
    //         messagesDom.scrollTo({
    //             top: messagesDom.scrollHeight,
    //         });
    //     }
    // );
}

async function synchroniseLocalChatLog() {
    await readApi().then(
        apiJson => {
            console.log(apiJson.record.messages);

            chatLog = apiJson.record.messages;

            console.log(chatLog);
        }
    );
}

function chatLogToHtml() {
    let messagesHtml = '';

    for (let i = 0; i < chatLog.length; i++) {
        const messageJson = chatLog[i];

        messagesHtml += `
      <div class="message">
        ${messageJson.datetime}<br>
        <strong>${messageJson.author}:</strong>
        </br>
        ${messageJson.message}
      </div>
    `;
    }

    return messagesHtml;
}