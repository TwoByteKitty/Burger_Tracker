const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const db = require("./models/index");
const staticRouter = require("./controllers/staticController");
const burgerRouter = require("./controllers/burgerController");

const PORT = process.env.PORT || 8080;

const app = express();

//view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));

//routes
app.use(staticRouter);
app.use("/burgers", burgerRouter);

//sync schema
db.sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`==> Server listening at http://localhost:${PORT}`)
        });
    });

