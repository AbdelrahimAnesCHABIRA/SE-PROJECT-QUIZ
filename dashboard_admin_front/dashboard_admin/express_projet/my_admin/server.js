const express = require("express");
const error_handler = require("./middleware/error_handler");
const dotenv = require("dotenv").config();
const connectiondb = require("./config/db");
connectiondb();
const cors = require("cors");
const app = express();
app.use(cors());


const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", require("./routes/adminroutes"));

// Error handler
app.use(error_handler);

app.get("/", (req, res)=> {
res.send("Welcome")
}    
)
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});