const http = require("http");
const app = require("./backend/app");

// const server = http.createServer((req, res)=>{

//     res.end("Welcome to My 1st Node JS Server");

// });

const server = http.createServer(app);

server.listen(3000, ()=>{
    console.log("Check Port no 3000");
});