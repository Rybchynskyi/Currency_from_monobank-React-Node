import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors'
import { WebSocketServer } from "ws";

function getMonobankData(callback) {
  https.get('https://api.monobank.ua/bank/currency', (response) => {
    let rawData = '';
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        callback(null, parsedData);
      } catch (e) {
        callback(e, null);
      }
    });
  }).on('error', (e) => {
    callback(e, null);
  });
}

const app = express();
app.use(cors())
const wsServer = new WebSocketServer({port: 9000});

wsServer.on('connection', onConnect);

function onConnect(wsServer) {
  console.log('Новый пользователь');

  wsServer.on('message', function(message) {

    console.log('Отримано повідомлення від клієнта: ' + message);
    getMonobankData((err, data) => {
      if (err) {
        console.log(err);
      } else {
        const resMessage = JSON.stringify(data);
        wsServer.send(resMessage)
      }
    })
    setInterval(() => {
      getMonobankData((err, data) => {
        if (err) {
          console.log(err);
        } else {
          const resMessage = JSON.stringify(data);
          wsServer.send(resMessage)
        }
      })
    }, 5 * 60 * 1000);
  });

  wsServer.on('close', function() {
    console.log('User disconnected');
  })
}

const server = http.createServer(app)



// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   },
// });
//
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);
//   socket.on('request', function () {
//     getMonobankData((err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data[0].currencyCodeA)
//         io.emit("currency", data )
//       }
//     })
//   });
// })


server.listen(3001, () => {
  console.log('SERVER IS RUNNING')
});



// setInterval(() => {
//
// }, 1 * 60 * 1000);