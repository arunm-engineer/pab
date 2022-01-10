const path = require("path");
const express = require("express");
const router = express.Router();

const productsFunctions = require("../controllers/products.js");

router.get("/add-product", productsFunctions.getAddProducts) 

router.post("/product", productsFunctions.postAddProducts)


module.exports = router;