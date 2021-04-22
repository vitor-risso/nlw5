document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io()

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById('chat_in_support')
  chat_in_support.style.display = 'block';

  const email = document.getElementById('email').value
  const txt_help = document.getElementById('txt_help').value

  socket.on('connect', () => {
    const params = {
      email, 
      txt_help
    }
    socket.emit('client_first_acess', params, (call, err) => {
      if (err) console.error(err)

      else {
        console.log(call)
      }
    })
  })
});