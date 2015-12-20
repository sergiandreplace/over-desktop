var Server=require('./js/server.js');
$(function() {
  console.log("hola");
  Server.start(8080);
  Server.setOnMessageListener(function(client,message) {
    console.log ("from client " + client + ": " + message);
  })
})
