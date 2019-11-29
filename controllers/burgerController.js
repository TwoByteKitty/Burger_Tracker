const router = require("express").Router();
const db = require("../models/index");
const path = require("path");

const Burger = db.sequelize.import(path.resolve(__dirname, "../models/burger_track"));

router.get("/", (req, res) => {
    Burger.findAll().then(burgers => (res.send(burgers)));
});

//Called when burger is created/added
router.post("/", (req, res) => {
    Burger.create({ name: req.body.name }).then(burger => {
        console.log(burger);
        res.send(burger)
    });
});

//Called when burger is devoured
router.put("/:id", (req, res) => {
    console.log(req.params.id);
    Burger.findByPk(req.params.id).then(burger => {
        burger.isDevoured = true;
        burger.save().then(burger => {
            console.log(burger);
            res.send(burger);
        }
        );
    });
});

module.exports = router;