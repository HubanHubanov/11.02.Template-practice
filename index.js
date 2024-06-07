const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const {authMiddleware} = require("./middlewares/authMiddleware")

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware); 

app.engine("hbs", handlebars.engine({
    extname: "hbs"
}));
app.set("view engine", "hbs");

app.use(routes);

// mongoose.connect("mongodb://127.0.0.1/course-book")/
mongoose.connect("mongodb://localhost:27017/course-book");
mongoose.connection.on("connected", () => console.log("DB is connected"));
mongoose.connection.on("disconnected", () => console.log("DB is disconnected"));
mongoose.connection.on("error", (err) => console.log(err))

app.listen(5000, () => console.log("Server is listening on port http://localhost:5000"));
