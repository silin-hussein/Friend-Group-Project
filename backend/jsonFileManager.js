const API_KEY = "$2a$10$Aat4wCb8nzm8up2GEGaRle6OwswNkxbnbYOuvY9oX6Kmqx7JNl.hS";
const BASE_URL = "https://api.jsonbin.io/v3/b/";
const BIN_ID = "6582e462266cfc3fde6bcba5";

//sample json file
let jsonFile = {
    "name": "John",
    "age": 31,
    "city": "New York"
};

innit();

async function innit() {
    await putNewJsonFileToServer(jsonFile);
    await getJsonFile();
}

async function getJsonFile() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        return req.responseText;
    }
    };

    req.open("GET", BASE_URL + BIN_ID + "/latest", true);
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send();
}

async function putNewJsonFileToServer(jsonFile) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
    }
    };

    req.open("PUT", BASE_URL + BIN_ID, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", API_KEY);
    req.send(jsonFile);
}