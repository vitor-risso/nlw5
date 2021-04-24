let socket_admin_id = null
let emailUser = null
let socket = null

document.querySelector("#start_chat").addEventListener("click", (event) => {
  socket = io()

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = "none";

  document.getElementById("btn_support").style.visibility = "hidden"

  const chat_in_support = document.getElementById('chat_in_support')
  chat_in_support.style.display = 'block';

  const email = document.getElementById('email').value
  const txt_help = document.getElementById('txt_help').value
  emailUser = email

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

  socket.on("client_list_all_messages", messages => {
    var template_client = document.getElementById("message-user-template").innerHTML
    var template_amdmin = document.getElementById("admin-template").innerHTML

    messages.forEach(message => {
      if (message.admin_id == null) {
        const rendered = Mustache.render(template_client, {
          message: message.text,
          email
        })
        document.getElementById("messages").innerHTML += rendered
      } else {
        const rendered = Mustache.render(template_amdmin, {
          message_admin: message.text
        })
        document.getElementById("messages").innerHTML += rendered
      }
    })
  })


  socket.on("admin_sentd_to_client", message => {
    const template_amdmin = document.getElementById("admin-template").innerHTML
    socket_admin_id = message.socket_id
    const rendered = Mustache.render(template_amdmin, {
      message_admin: message.text
    })

    document.getElementById('messages').innerHTML += rendered
  })

});

document.querySelector("#send_message_button").addEventListener("click", (event) => {
  const text = document.getElementById("message_user").value

  const params = {
    text,
    socket_admin_id
  }

  socket.emit("client_send_to_admin", params)

  const template = document.getElementById("message-user-template").innerHTML

  const rendered = Mustache.render(template, {
    message: text,
    email: emailUser
  })

  document.getElementById("messages").innerHTML += rendered

  document.getElementById("message_user").value = ""
})
