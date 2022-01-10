const rootDir = require("../util/path.js");

const Product = require("../models/product.js");

exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "add-product.html"));
    res.render("admin/add-product");
}

exports.postAddProducts = (req, res, next) => {
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
}

exports.getAllProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, "views", "shop.html"));
    Product.fetchAll((products) => {
        // console.log(products);
        res.render("shop/product-list", { prods: products });
    });
}