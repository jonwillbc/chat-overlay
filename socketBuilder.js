checkEmpty();

//if no room code is set, do not build socket
async function checkEmpty(){
    await chrome.storage.sync.get("room", ({ room }) => {
        if(room == ''){
            console.log('empty')
            throw new Error ('No room code: ');
        }
        else{
            buildSocket();
        }
    });
}

//Elements
let messageForm = document.getElementById('message')
let messages = document.getElementById('messages')
let send = document.getElementById('send')

function buildSocket(){
    const socket = io('https://jwilliams-chatserver.herokuapp.com/');

    socket.on('message', (message) => {
        console.log(message)
        messages.innerHTML += '<p><span class="message__name" style ="font-weight: 600;font-size: 14px;margin-right: 8px;">'+message.username+'</span></p><p>&gt;'+message.text+'</p>'
        messages.scrollTop = messages.scrollHeight

        //stores message in history
        chrome.storage.sync.get("display", ({ display }) => {
            chrome.storage.sync.get("history", ({ history }) => {
                history.push({"display": display, "message": message.text})
                console.log(history)
                chrome.storage.sync.set({ history });
            });
        });
    })

    send.addEventListener('click', (e) => {
        e.preventDefault()

        send.setAttribute('disabled', 'disabled')

        const message = messageForm.value

        socket.emit('sendMessage', message, (error) => {
            send.removeAttribute('disabled')
            messageForm.value = ''
            messageForm.focus()

            if (error) {
                return console.log(error)
            }

            console.log('Message delivered!')
        })
    })

    chrome.storage.sync.get("room", ({ room }) => {
        chrome.storage.sync.get("display", ({ display }) => {
            let username = display
            socket.emit('join', { username, room }, (error) => {
                if (error) {
                    alert(error)
                    //location.href = '/'
                }
            })
        });
    });
}