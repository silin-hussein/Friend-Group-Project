// Samuel's acc keys <- feel free to use but not abuse
const X_MASTER_KEY = "$2a$10$74f1nJGQMLLYYXdQVprLIuoYnCy7wNGk8Gmr1QFV.b.MU0V4rIW9m";
const BASE_URL = "https://api.jsonbin.io/v3/b/";
const X_ACCESS_KEY = "$2a$10$VEQQz5e38QXDa1J317sjueZtB53uWrqbrRSCmxVdy6rVx9Lfjux5m";
const BIN_ID = "65831e46dc74654018866a79"

//sample json file
const DEFAULT_MESSAGES = {
    "messages": [
        {
            "id": 1,
            "author": "John Doe",
            "message": "Hello, how are you?",
            "datetime": "2023-01-01T12:00:00"
        },
        {
            "id": 2,
            "author": "Alice Smith",
            "message": "I'm doing well, thank you!",
            "datetime": "2023-01-01T12:15:00"
        },
        {
            "id": 3,
            "author": "Bob Johnson",
            "message": "What's the weather like today?",
            "datetime": "2023-01-01T12:30:00"
        }
    ]
};

const newMessage = {
    "id": 5,
    "author": "Eve Anderson",
    "message": "It's sunny and warm outside!",
    "datetime": "2023-01-01T12:45:00"
}


addMessage(newMessage);


async function addMessage(newMessage) {
    readApi().then(apiJson => {
        apiJson.record.messages.push(newMessage);
        updateApi(apiJson.record);
        }
    )
}

async function readApi() {
    try {
        const url = BASE_URL + BIN_ID + '/latest';
        console.log(url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Master-Key': X_MASTER_KEY,
            },
        });

        if (response.ok) {
            const responseJson = await response.json();

            // console.log(responseJson);

            return responseJson;
        } else {
            console.log('Code: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


async function updateApi(jsonToUpdate) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            if (req.status == 200) {
                console.log("Successfully updated to: " + req.responseText);
            } else {
                console.log("An err occured while trying to update API json");
            }
        }
    };

    req.open("PUT", BASE_URL + BIN_ID, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", X_MASTER_KEY);
    req.send(JSON.stringify(jsonToUpdate));
}



// outdatet xmlhttp option
// async function addMessage(newMessage) {
//     let req = new XMLHttpRequest();
//
//     req.onreadystatechange = async () => {
//         if (req.readyState == XMLHttpRequest.DONE) {
//             if (req.status == 200) {
//                 const response = await req.responseText;
//
//                 console.log(response);
//
//                 let responseJson = await JSON.parse(response);
//
//                 responseJson.record.messages.push(newMessage);
//             } else {
//                 console.log("Code: " + req.status);
//             }
//         }
//     };
//
//     const url = BASE_URL + BIN_ID +  '/latest';
//     console.log(url)
//
//     req.open("GET", url, true);
//     req.setRequestHeader("X-Master-Key", X_MASTER_KEY);
//     req.send();
// }

// outdated xmlhttp
// async function readApi() {
//     let req = new XMLHttpRequest();
//
//     req.onreadystatechange = () => {
//         if (req.readyState == XMLHttpRequest.DONE) {
//             if (req.status == 200) {
//                 const response = req.responseText;
//
//                 console.log(response);
//             } else {
//                 console.log("Code: " + req.status);
//             }
//         }
//     };
//
//     const url = BASE_URL + BIN_ID +  '/latest';
//     console.log(url)
//
//     req.open("GET", url, true);
//     req.setRequestHeader("X-Master-Key", X_MASTER_KEY);
//     req.send();
// }