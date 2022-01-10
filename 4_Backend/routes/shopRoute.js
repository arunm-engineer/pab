const path = require("path");
const express = require("express");
const router = express.Router();

const productsFunctions = require("../controllers/products.js");

router.get("/", productsFunctions.getAllProducts);

module.exports = router;