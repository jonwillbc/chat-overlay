/*
*Created by Jonathan Williams (jonwilliams7129@gmail.com)
*Released under the MIT License.
*/

let display = 'Anon';
let history = [];
let room = '';
let server = 'https://jwilliams-chatserver.herokuapp.com/';

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

//sets default server
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ "server": server });
  console.log('Default server set', `Server: ${server}`);
});