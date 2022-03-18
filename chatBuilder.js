//creates chatbox
document.body.innerHTML += '<div class="chat__main" id="chat__main" style="position: absolute; margin-left: 10px; bottom: 40px; z-index: 9000; height: 300px; width: 300px; background-color: rgba(52, 54, 56, 0.8); border-radius: 25px;" ><div id="chat__mainheader" style="padding: 10px; cursor: move; z-index: 10; background-color: rgba(52, 54, 56); color: #fff;">Chat Overlay</div><div name = "messages" id="messages" class="chat__messages" style = "height: 270px; flex-grow: 1;padding: 0px 24px 0 0px;overflow-y: scroll;"></div><div class="compose" style = "bottom: 0"><form id="message-form" style = "margin-left: 10px;"><input id="message" placeholder="Message" required autocomplete="off"><button id ="send">Send</button></form></div></div>'

//gets history from local storage
chrome.storage.sync.get("history", ({ history }) => {
  //gets display name from local storage
  chrome.storage.sync.get("display", ({ display }) => {
    //fills messages div with chat history
    history.forEach((x, i) => messages.innerHTML += '<p><span class="message__name" style ="font-weight: 600;font-size: 14px;margin-right: 8px;">'+x.display+'</span></p><p>&gt;'+x.message+'</p>');
  });
});

//allows chatbox to be draggable
dragElement(document.getElementById('chat__main'));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }


  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (-150 + pos3) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}