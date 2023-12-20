let username

function sendName() {
  username = document.getElementById("enterName").value
  document.getElementById("namePopup").style.display = "none"
  loadPrevMessages();
  document.getElementById("messageField").style.display = "block"
}

function loadPrevMessages() {
  console.log("go");
}
