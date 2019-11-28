const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Burger = db.sequelize.import(path.resolve(__dirname, "../models/burger_track"));

router.get("/", (req, res) => {
    const renderPage = burgers => {
        console.log(burgers.length ? JSON.stringify(burgers) : "No Burgers Found");

        const undevouredList = burgers.filter((burger) => (!burger.isDevoured));
        const devouredList = burgers.filter((burger) => (burger.isDevoured));

        const viewData = {
            undevoured: undevouredList,
            devoured: devouredList,
            helpers: {
                json: function (data) {
                    return JSON.stringify(data);
                }
            }
        }
        res.render("index", viewData);
    }

    Burger.findAll().then(renderPage);
});


module.exports = router;