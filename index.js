require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/notes",loginRequired, ensureCorrectUser, notesRoutes);

app.use(function(req, res, next){
    let err = new Error("Not found");
    err.status = 400;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server started at port ${PORT}`);
})