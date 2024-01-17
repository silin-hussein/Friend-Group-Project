let username;

let chatLog = [];
let chatLogJson = {};

// setInterval(() =>{
//     printChatLog();
// },3000);

function sendName() {
    username = document.getElementById("enterName").value;
    document.getElementById("namePopup").style.display = "none";
    document.getElementById("flex-con").style.display = "none";
    document.body.style.backgroundColor = "white";

    initMessages();

    document.querySelector('#chatScreen').style.display = 'flex';
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
    <div class="messageWrapper">
        <div class="message">
            ${messageJson.datetime}<br>
            <strong>${messageJson.author}:</strong>
            </br>
            ${messageJson.message}
        </div>
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
        <div class="messageWrapper">
            <div class="message" data-id="${messageJson.id}">
                ${messageJson.datetime}<br>
                <strong>${messageJson.author}:</strong>
                </br>
                ${messageJson.message}
            </div>
        </div>
    `;
    }

    return messagesHtml;
}