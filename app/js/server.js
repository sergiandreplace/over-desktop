var WebSocket=require('ws');
var WebSocketServer = WebSocket.Server;
var clients = {};
var remoteRole="remote";
var frontendRole="frontend";
var frontendListener = function() {};
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
  }

  setFrontendListener : function(listener) {
    frontendListener=listener;
  }
}
var onConnection = function (websocket) {
  console.log(websocket);
  var role=websocket.upgradeReq.url.slice(1);

  if (role!=remoteRole && role!=frontendRole) {
    websocket.close(1003, '{status: "ko", "code":1003, "reason":"WRONG ROLE"');
  }else{
    clients[role]=websocket;
    websocket.send('{"connection":"ok"}');
    websocket.on('message', function (message) {
      var messageObject={};
      try {
        messageObject=JSON.parse(message);
        var target=messageObject.to;
        if (target==remoteRole || target==frontendRole) {
          clients[target].send(message);
        }else{
          websocket.send ('{"status":"ko","code":"1003","reason":"wrong receipt"}');
        }
      } catch (exception) {
        websocket.send ('{"status":"ko","code":"1003","reason":"malformed json"}');
      }
    });
  }

}

module.exports=Server;
