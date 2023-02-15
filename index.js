var ws = require("nodejs-websocket");
console.log("开始建立连接...");

var [user1, user2, user1Ready, user2Ready] = [null, null, false, false];

ws.createServer(function (conn) {
  conn.on("text", function (str) {
    console.log("收到的信息为:" + str);
    if (str === "user1") {
      user1 = conn;
      user1Ready = true;
    }
    if (str === "user2") {
      user2 = conn;
      user2Ready = true;
    }
    if (user2Ready) {
      user2.sendText(str);
    }
    if (user1Ready) {
      user1.sendText(str);
    }
  });
  conn.on("close", function (code, reason) {
    console.log("关闭连接");
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭");
  });
}).listen(8001);
console.log("WebSocket建立完毕");
