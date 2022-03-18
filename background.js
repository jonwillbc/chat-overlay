let display = 'Anon';
let history = [];
let room = '';

//sets default display name to Anon
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "display": display });
  console.log('Default display name set to Anon', `Name: ${display}`);
});

//sets default message history to nothing
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "history": history });
  console.log('Default message history set to empty', `Array: ${history}`);
});

//sets default room to none
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "room": room });
  console.log('Default room set to none', `Room Code: ${room}`);
});

//executes script upon tab creation 
/*
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  //do once status changes from loading to complete
  if (changeInfo.status == 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: buildChat
    });
  }
})*/
/*
function buildChat(){
  //creates chatbox
  document.body.innerHTML += '<div class="chat__main" style="position: absolute; margin-left: 10px; bottom: 40px; z-index: 9000; height: 300px; width: 300px;" ><div name = "messages" id="messages" class="chat__messages" style = "height: 270px; flex-grow: 1;padding: 0px 24px 0 0px;overflow-y: scroll;"></div><div class="compose" style = "bottom: 0"><form id="message-form"><input id="message" placeholder="Message" required autocomplete="off"><button id ="send">Send</button></form></div></div>'

  //gets history from local storage
  chrome.storage.sync.get("history", ({ history }) => {
    //gets display name from local storage
    chrome.storage.sync.get("display", ({ display }) => {
      //fills messages div with chat history
      history.forEach((x, i) => messages.innerHTML += '<p><span class="message__name" style ="font-weight: 600;font-size: 14px;margin-right: 8px;">'+x.display+'</span></p><p>&gt;'+x.message+'</p>');

      
      //gets message from input and adds it to the chat
      send.addEventListener("click", (e) => {
        e.preventDefault()

        //gets value of input
        let message = document.getElementById('message').value
        console.log(message)
        
        //gets stored display name and appends message to chat
        messages.innerHTML += '<p><span class="message__name" style ="font-weight: 600;font-size: 14px;margin-right: 8px;">'+display+'</span></p><p>&gt;'+message+'</p>'

        //empties the input box
        document.getElementById('message').value = ""
        
        //autoscroll to bottom
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight

        //stores message in history
        history.push({"display": display, "message": message})
        console.log(history)
        chrome.storage.sync.set({ history });
      });
    });
  });
}*/