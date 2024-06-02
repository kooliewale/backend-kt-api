// In src/index.js 
const express = require("express"); 
const bodyParser = require("body-parser");
const cors=require("cors");
const v1Router = require("./v1/routes");
const v1OrderRouter = require("./v1/routes/orderRoutes");
const app = express(); 
const PORT = process.env.PORT||4500; 
const IP='http://127.0.0.1';
const PROJECT=process.env.PROJECT||'KT';
const VERSION=process.env.VERSION|'v0.0.1';
const serverStartTime = new Date();  
app.use(bodyParser.json());
app.use(cors());   
// For testing purposes 
app.get("/", (req, res) => { 
    res.send(`<h2>Welcome to ${PROJECT} Order API  version ${VERSION}</h2>     ${serverStartTime} `); 
}); 

app.use("/api/v1", v1Router);

app.use("/api/v1/orders", v1OrderRouter);


app.listen(PORT, () => { 
    console.log(`${PROJECT} API version ${VERSION} is listening on port ${IP}:${PORT}      ${serverStartTime} `); 
});