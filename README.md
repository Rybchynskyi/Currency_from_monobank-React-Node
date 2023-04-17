## For deploying:
1. Download the app
2. Install npm dependencies:
- in folder 'client' `npm install`
- in folder 'server' `npm install`
3. Run backend file: server/index.js
4. Run frontent `npm start` or build frontend `npm run build` in folder "client"

## Main task
The goal of this project is to develop an app using Dockerfile which implements a REST API that forwards to a public WebSocket channel and updates all connected clients as soon as some information on https://api.monobank.ua/bank/currency is updated. Additionally, a frontend will be developed that will subscribe to this WebSocket channel and show the currency table from web sockets.
git init
## Backend implementation (Laravel):
On the backend side, a web socket protocol is launched using the "npm ws" library. When shaking hands with the frontend side, users receive the result of the API request with a callback function added as a recurring request every 5 minutes.

## Frontend implementation (React):
For convenience and understanding, the user receives information about the connection status to the WebSocket using UseState. When clicked, the user initiates a handshake with the WebSocket port that is implemented using the Ratchet library and receives a response from the WebSocket protocol.
