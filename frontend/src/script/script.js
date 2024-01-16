let username;

let chatLog = [];
let chatLogJson = {};

// setInterval(() =>{
//     printChatLog();
// },3000);

function sendName() {
    username = document.getElementById("enterName").value;
    if (checkUsername(username)) {
        document.getElementById("namePopup").style.display = "none";
        document.getElementById("login").style.display = "none";
       
        document.body.style.backgroundColor = "white";

        initMessages();

        document.querySelector('#messageField').innerHTML = `
            <h2>${username}</h2>
            <label for="enterMessage">Message your friends:</label>
            <input type="text" id="enterMessage">
            <button onclick="sendMessage()" onkeydown="handleKeyPress(event)" class="buttonSend">send</button>
            <button onclick="printChatLog()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
            </svg></button>
    `;
    }
}

function checkUsername(username) {
    // checks whether or not the username is empty, undefined or null
    // open for further name checks in the future

    let usernameIsValid = true;
    if (username === null || username === undefined || username.length === 0) {
        document.getElementById("errorContainer").innerHTML = "Please enter your username.";
        usernameIsValid = false;
    }

    return usernameIsValid;
}

document.getElementById('messageField').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function initMessages() {
    document.getElementById('messages').style.display = 'flex';

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
    const messagesDom = document.getElementById('messages');

    if (JSON.stringify(chatLogJsonUnsynchronised) !== chatLog) {
        console.log('Chat is being synchronised!');
        messagesDom.innerHTML = messagesToHtml(chatLog);

        messagesDom.scrollTo({
            top: messagesDom.scrollHeight,
        });
    } else {
        console.log('Chat is already synchronised!');
    }
}

async function synchroniseLocalChatLog() {
    await readApi().then(apiJson => {
        console.log(apiJson);
        chatLog = apiJson.messages;
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