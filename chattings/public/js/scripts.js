const ids = (id) => document.getElementById(id) || null;
const socket = io('/chattings');

const helloStrangerElement = ids('hello_stranger');
const chattingBoxElement = ids('chatting_box');
const formElement = ids('chat_form');

socket.on('user_connected', (data) => {
  const { username, users } = data;
  drawCenterBox(`${username} come. there is ${users}users.`);
});

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewchat(`${username}: ${chat}`);
});

socket.on('disconnect_user', (data) => {
  const { username, users } = data;
  drawCenterBox(`${username} left. there is ${users}users.`);
});

const drawCenterBox = (message) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox = `
    <div class='bg-gray-300 flex mx-4 my-2 p-1 rounded-lg clearfix break-all'>
      <div style="margin: 0 auto;">
        ${message}
      </div>
    </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  console.log(inputValue);
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawNewchat(inputValue, true);
    event.target.elements[0].value = '';
  }
};

const drawNewchat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
    <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  else
    chatBox = `
    <div class='bg-gray-300 w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  username = ' ';
  while (true) {
    username = prompt('What is your name?');
    if (username !== '') break;
  }
  socket.emit('new_user', username, (data) => {
    console.log(data);
    helloStrangerElement.innerText = `Hello! ${data} :)`;
  });

  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
