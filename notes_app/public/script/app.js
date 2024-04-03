const socket = io();

let username;

const messageInputDom = document.getElementById('enterMessage');
const messagesDom = document.getElementById('messages');
let listItems;


function sendName() {
  username = document.getElementById("enterName").value;
  console.log(username);

  if (checkUsername(username)) {
    //changeScreenToChat();
    changeScreenToSelectGroup();

    saveUsername();
  }
}

function requestMessages() {
  socket.emit('request-all-messages');
}

// sendMessage
/*document.getElementById('messageForm').addEventListener('submit', (event) => {
  event.preventDefault();

  if (messageInputDom.value && messageInputDom.value.trim().length > 0) {
    const message = {
      "id": 1,
      "author": username,
      "content": messageInputDom.value,
      "datetime": (new Date()).toDateString()
    }

    socket.emit('send-message', message);

    printAddMessage(message);
    messageInputDom.value = '';
  }
});*/

function printAddMessage(message) {
  messagesDom.innerHTML += messagesToHtml([message]);;

  messagesDom.scrollTo({
    top: messagesDom.scrollHeight,
    behavior: 'smooth'
  });
}

function printMessages(messages) {
  messagesDom.innerHTML = messagesToHtml(messages);

  messagesDom.scrollTo({
    top: messagesDom.scrollHeight
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

      console.log(typeof messageJson.datetime);

      messagesHtml += `
      <div class="messageWrapper ${messageRight}">
          <div class="message" data-id="${messageJson.id}">
              <div class="messageContent">
                ${messageJson.content}
              </div>
              <div class="messageFooter">
                <div class="messageAuthor">
                  ~${messageJson.author}
                </div>
                <div class="messageTime">
                  ${messageJson.datetime}
                </div>
              </div>
          </div>
      </div>
      `;
  }

  return messagesHtml;
}

socket.on('send-all-messages', (messageArray) => {
  //printMessages(messageArray);
  fillList(messageArray);
});

socket.on('broadcast-message', (message) => {
  //printAddMessage(message);
  console.log(message);
});

/********************************************************************************************************************************/
closeNoteWindow(true);

requestMessages();
function fillList(messageArray) {
  let listBox = document.getElementById("listBox");
  listItems = messageArray;
  let string = "<div id='titleContainer'>"
  for (let i = listItems.length-1; i >= 0; --i) {
    string += "<div id='listItemRow'><div class='listItem' onclick='changeScreenToOpenNote(" + i + ")'><div class='listItemText'>" + listItems[i].title + "</div></div><div id='deleteIconContainer' onclick='deletePost(" + i +")'><img src='../assets/deleteIcon.png'></div></div>";
  }
  listBox.innerHTML = string + "</div>"
}

function openNote() {
  // do smth
}

function saveNote() {
  console.log("heja");
}

function changeScreenToAddNote() {
  document.getElementById("newCurNoteBox").innerHTML = `
  <div id="closeButton" onclick="closeNoteWindow()"><img src="../assets/closeIcon.png"></div>
  <div id="createHeadline">Create a new note</div>
  <div id="error">&nbsp</div>
   <div id="createContent">
     <div id="titelBox">
         <div class="prefix">Titel:</div>
         <div><input type="text" id="title"></div>
      </div>
      <div id="messageBox">
          <div class="prefix">Note:</div>
          <div id="textareaContainer"><textarea id="message"></textarea></div>
      </div>

      <div id="saveButton" onclick="saveNote()">Save</div>
    </div>
  `
  changeStyleOfLandingBox(false);
}

function saveNote() {
  let title = document.getElementById('title').value;
  let message = document.getElementById('message').value;
  let author = username;
  let currentDate = new Date();
  let createdTime = currentDate.toLocaleString();
  let updateTime = createdTime;

  if (author == undefined) {
      author = "username";
  }

  if (title == "" || message == "") {
    document.getElementById('error').innerHTML = "Please fill out all fields!"
    document.getElementById('error').style.color = "red";
    return;
  }

  const newMessage = {
    "type": null,
    "title": title,
    "author": username,
    "message": message,
    "datetime": createdTime,
    "updated": updateTime
  }

  socket.emit('send-message', newMessage);

  window.location.reload();
}


function changeScreenToOpenNote(index) {
  document.getElementById('newCurNoteBox').innerHTML = `
  <div id="closeButton" onclick="closeNoteWindow()"><img src="../assets/closeIcon.png"></div>
    <div id="noteContent">
      <div id="noteHeader">
        <div id="titleHeader">${listItems[index].title}</div>
        <div id="authorLine">Created by ${listItems[index].author}, ${listItems[index].datetime}</div>
      </div>
      <div id="messageContent">${listItems[index].message}</div>
    </div>
  `;
  changeStyleOfLandingBox(false);
}

function closeNoteWindow() {
  let newCurNoteBox = document.getElementById('newCurNoteBox');
  newCurNoteBox.innerHTML = "Create a new note or look at already created ones!";
  changeStyleOfLandingBox(true);
  
}

function changeStyleOfLandingBox(bool) {
  let newCurNoteBox = document.getElementById('newCurNoteBox');
  let styleBox = newCurNoteBox.style;
  if (bool) {
    styleBox.backgroundColor = "white";
    styleBox.justifyContent = "center";
    styleBox.fontSize = "4em";
    styleBox.fontWeight = "900";
  } else {
    styleBox.backgroundColor = "rgba(128, 128, 128, 0.329)";
    styleBox.justifyContent = "none";
    styleBox.fontSize = "1em";
    styleBox.fontWeight = "none";
  }
}

function deletePost(index) {
  const indexToDelete = {
    "index": index
  };

  socket.emit('delete-message', indexToDelete);
  
  window.location.reload();
}