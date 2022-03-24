/*
*Created by Jonathan Williams (jonwilliams7129@gmail.com)
*Released under the MIT License.
*/

let send = document.getElementById("send")
let displayInput = document.getElementById('display')
let roomInput = document.getElementById('room')
let serverInput = document.getElementById('server')

//display current values
chrome.storage.sync.get("display", ({ display }) => {
    displayInput.value = display
});

chrome.storage.sync.get("room", ({ room }) => {
    roomInput.value = room
});

chrome.storage.sync.get("server", ({ server }) => {
    serverInput.value = server
});

send.addEventListener("click", (e) => {
    e.preventDefault()
    
    //Set display name
    let display = displayInput.value
    console.log(display)
    chrome.storage.sync.set({ display });

    //Set room code
    let room = roomInput.value
    console.log(room)
    chrome.storage.sync.set({ room });

    //Set server
    let server = serverInput.value
    console.log(server)
    chrome.storage.sync.set({ server });

    //empties previous history
    chrome.storage.sync.get("display", ({ display }) => {
        chrome.storage.sync.get("history", ({ history }) => {
            history = []
            chrome.storage.sync.set({ history });
        });
    });

    //reloads tab
    chrome.tabs.reload();
});