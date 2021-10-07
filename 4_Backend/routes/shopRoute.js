const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../util/path.js");

const adminData = require("./adminRoute.js");

router.get("/", (req, res, next) => {
    console.log(adminData.products);
    // res.sendFile(path.join(rootDir, "views", "shop.html"));
    res.render("shop", { prods: adminData.products });
})

module.exports = router;