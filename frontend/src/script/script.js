let username;

let chatLog = [];
let chatLogJson = {};

document.getElementById('messageField').addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendName() {
    username = document.getElementById("enterName").value;

    if (checkUsername(username)) {
        document.getElementById("namePopup").style.display = "none";
        document.getElementById("flex-con").style.display = "none";

        document.body.style.backgroundColor = "white";

        printChatLog();
        document.getElementById('username').innerHTML = username;
        document.querySelector('#chatScreen').style.display = 'flex';
    }
}

function sendMessage() {
    const message = document.getElementById('enterMessage').value;
    const messagesDom = document.getElementById('messages');

    if (message != null && message.length != 0) {
        const now = new Date();

        const newMessage = {
            "id": 12,
            "author": username,
            "message": message,
            "datetime": now.toString()
        }

        console.log(newMessage);

        // methode in ../api/messagesApiManager

        addMessage(newMessage);

        document.getElementById('enterMessage').value = '';
        messagesDom.innerHTML += messagesToHtml([newMessage]);

        messagesDom.scrollTo({
            top: messagesDom.scrollHeight, behavior: 'smooth'
        });
    }

    // the user can be told the message was invalid, here
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

        let messageRight = '';

        if (messageJson.author === username) {
            messageRight = 'messageRight';
        }

        messagesHtml += `
        <div class="messageWrapper ${messageRight}">
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