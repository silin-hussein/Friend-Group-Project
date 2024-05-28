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
  fetch("/notes")
      .then(response => response.json())
      .then(data => {
        console.log("requestMessages: ", data);
        fillList(data);
      })
      .catch(error => console.log(error));
}
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

/********************************************************************************************************************************/
closeNoteWindow(true);

requestMessages();
function fillList(messageArray) {
  let listBox = document.getElementById("listBox");
  listItems = messageArray;
  let string = "<div id='titleContainer'>"
  for (let i = listItems.length-1; i >= 0; --i) {
    string += "<div id='listItemRow'><div class='listItem' onclick='changeScreenToOpenNote(" + i + ")'><div class='listItemText'>" + listItems[i].title + "</div></div><div id='deleteIconContainer' onclick='deletePost(" + listItems[i].id +")'><img src='../assets/deleteIcon.png'></div></div>";
  }
  listBox.innerHTML = string + "</div>"
}

function openNote() {
  // do smth
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
  let createdTime = currentDate;
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
    "id": 0,
    "type": null,
    "title": title,
    "author": author,
    "message": message,
    "createdTime": createdTime,
    "updateTime": updateTime
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
  }

  console.log("newMessage:", newMessage);

  fetch("/notes", options)
      //.then(response => response.json())
      .then(data => {
        console.log("saveNote: ", data);
        closeNoteWindow();
        requestMessages();
        //fillList(data);
      })
      .catch(error => console.log(error));
}


function changeScreenToOpenNote(index) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Vienna'
  };

  const formatter = new Intl.DateTimeFormat('de-DE', options);
  const formattedDateTime = formatter.format(new Date(listItems[index].createdTime));

  document.getElementById('newCurNoteBox').innerHTML = `
  <div id="closeButton" onclick="closeNoteWindow()"><img src="../assets/closeIcon.png"></div>
    <div id="noteContent">
      <div id="noteHeader">
        <div id="titleHeader">${listItems[index].title}</div>
        <div id="authorLine">Created by ${listItems[index].author}, ${formattedDateTime}</div>
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

function deletePost(id) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: id
  }

  fetch("/notes/" + id, options)
      //.then(response => response.json())
      .then(data => {
        console.log("deleteNote: ", data);
        closeNoteWindow();
        requestMessages();
        //fillList(data);
      })
      .catch(error => console.log(error));
}