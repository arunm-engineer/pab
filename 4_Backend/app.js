const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/adminRoute.js");
const shopRoutes = require("./routes/shopRoute");
const errorController = require("./controllers/error.js");

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", (req, res, next) => {
//     console.log("This always runs", req.url);
//     next();
// })

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404)


let port = 3000;
app.listen(port, () => {
    console.log("Listening to port:", port);
}) 