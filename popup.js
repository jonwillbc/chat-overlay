let send = document.getElementById("send")
let displayInput = document.getElementById('display')
let roomInput = document.getElementById('room')

//display current values
chrome.storage.sync.get("display", ({ display }) => {
    displayInput.value = display
});

chrome.storage.sync.get("room", ({ room }) => {
    roomInput.value = room
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