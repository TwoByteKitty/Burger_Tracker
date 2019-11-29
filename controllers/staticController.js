const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Burger = db.sequelize.import(path.resolve(__dirname, "../models/burger_track"));
//resets and renders view with updated data from DB.
const resetPage = (res) => {
    
}
//Default Route
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
//Called when burger is created/added
router.post("/", (req, res) => {
    Burger.create({ name: req.body.name }).then(burger => {
        console.log(burger);
        res.redirect("/")
    });
});
//Called when burger is devoured
router.put("/:id", (req, res) => {
    console.log(req.params.id);
    Burger.findByPk(req.params.id).then(burger => {
        burger.isDevoured = true;
        burger.save().then(burger => {
            console.log(burger);
            resetPage(res);
        }
        );
    });
});

module.exports = router;