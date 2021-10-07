const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminData = require("./routes/adminRoute.js");
const shopRoutes = require("./routes/shopRoute");

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
    console.log("This always runs", req.url);
    next();
})

app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    res.status(404).render("404");
})

let port = 3000;
app.listen(port, () => {
    console.log("Listening to port:", port);
})