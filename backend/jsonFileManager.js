post();

function get() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
    }
    };

    req.open("GET", "https://api.jsonbin.io/v3/b/6582e462266cfc3fde6bcba5/latest", true);
    req.setRequestHeader("X-Master-Key", "$2a$10$Aat4wCb8nzm8up2GEGaRle6OwswNkxbnbYOuvY9oX6Kmqx7JNl.hS");
    req.send();
}

function post() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
    }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/6582e462266cfc3fde6bcba5", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$Aat4wCb8nzm8up2GEGaRle6OwswNkxbnbYOuvY9oX6Kmqx7JNl.hS");
    req.send('{"sample": "Hello World"}');
}