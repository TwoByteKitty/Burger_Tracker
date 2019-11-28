const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Burger = db.sequelize.import(path.resolve(__dirname, "../models/burger_track"));

router.get("/", (req, res) => {
    Burger.findAll().then(burgers => (res.send(burgers)));
});

router.post("/", (req, res) => {
    Burger.create({name: req.body.name}).then(burger => (res.send(burger)));
});
module.exports = router;