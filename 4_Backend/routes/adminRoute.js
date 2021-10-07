const path = require("path");
const express = require("express");
const router = express.Router();

const products = [];

const rootDir = require("../util/path.js");

router.get("/add-product", (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "add-product.html"));;
    res.render("add-product");
}) 

router.post("/product", (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect("/");
})
 
exports.router = router;
exports.products = products;