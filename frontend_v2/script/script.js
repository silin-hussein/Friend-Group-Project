let username;

let chatLog = [];
let chatLogJson = {};

// setInterval(() =>{
//     printChatLog();
// },3000);

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

function initMessages() {
    document.getElementById('messages').style.display = 'flex';

    setTimeout(() => {
        document.querySelector('#enterMessage').addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                console.log('Enter key pressed');
            }
        });
    }, 10);

    // methode in ../api/messagesApiManager
    printChatLog();
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

    // methode in ../api/messagesApiManager
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
        top: messagesDom.scrollHeight, behavior: 'smooth'
    });
}

async function printChatLog() {
    const chatLogJsonUnsynchronised = chatLogJson;

    await synchroniseLocalChatLog()

    // this command must be after await, because before messagesDom is still display none (because DOM is slow)
    const messagesDom= document.getElementById('messages');

    console.log('old: ' + JSON.stringify(chatLogJsonUnsynchronised));
    console.log('new: ' + JSON.stringify(chatLogJson));

    if (JSON.stringify(chatLogJsonUnsynchronised) !== JSON.stringify(chatLogJson)) {
        console.log('Chat is not synchronised!');
        messagesDom.innerHTML = messagesToHtml(chatLog);

        messagesDom.scrollTo({
            top: messagesDom.scrollHeight,
        });
    } else {
        console.log('Chat is synchronised!');
    }
}

async function synchroniseLocalChatLog() {
    await readApi().then(apiJson => {
        chatLog = apiJson.record.messages;
        chatLogJson = apiJson.record;

        console.log('chatlog:');
        console.log(chatLog);
    });
}

function messagesToHtml(messages) {
    let messagesHtml = '';

    for (let i = 0; i < messages.length; i++) {
        const messageJson = messages[i];

        messagesHtml += `
      <div class="message" data-id="${messageJson.id}">
        ${messageJson.datetime}<br>
        <strong>${messageJson.author}:</strong>
        </br>
        ${messageJson.message}
      </div>
    `;
    }

    return messagesHtml;
}