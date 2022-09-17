const express = require("express");
const router = express.Router();
//................Importing controller from "./controller.js"
const controller = require("../controller/controller");

//............GET-->User Route (Get All Users)
router.get("/users", controller.getUsers);

//............GET-->User/:id Route (Get a single User)
router.get("/users/:id", controller.getSingleUserById);

//............POST-->User Route (Add New User in the Database)
router.post("/users", controller.insertNewUser);

//............PUT-->User/:id Route (Update Users By Id)
router.put("/users/:id", controller.updateSingleUser);

//............DELETE-->User Route (DELETE a single User)
router.delete("/users/:id", controller.deleteUser);

//.....Exporting router
module.exports = router;
