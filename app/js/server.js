var WebSocket=require('ws');
var WebSocketServer = WebSocket.Server;
var clients = [];
var onMessageListener = function() {};
var Server = {
  wss : {},

  start : function (port) {
    wss = new WebSocketServer({port:port});
    wss.on('connection', onConnection);

  },

  stop : function () {
    wss.close();
  },

  isStarted : function () {
    return (wssm && wss.readyState()== ws.OPEN)
  },

  setPort : function (port) {
    if (Server.isStarted()) {
      Server.stop();
    }
    Server.start(port);
  },

  setOnMessageListener : function (listener) {
    onMessageListener=listener;
  },

  sendMessage : function (message) {
    for (var client in clients) {
      clients[client].send(message);
    }
  },

  sendMessageToClient : function (client, message) {
    clients[client].send(message);
  }

}
var onConnection = function (websocket) {
  console.log(websocket);
  clients.push(websocket);


  websocket.send('{"connection":"ok"}');
  websocket.on('message', function (message) {
    for (var client in clients) {
      if (clients[client]===websocket) {
        onMessageListener(client,message);
      }
    }
  });


}

module.exports=Server;
