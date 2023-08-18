const express = require("express");
const userController = require("../controllers/usersController");
const auth = require("../middleware/auth");
const router = express.Router();

//{login}
router.post("/login", userController.login);


router.use(auth.validateAdmin)
//create {user, admin}
router.post("", userController.createUser);
// {getAllUsers}
router.get("/getUsers", userController.getUsers);
// {updateUser}
router.patch("/updateUser", userController.updateUser);
// delete {user}
router.delete("/deleteUser", userController.deleteUser);


module.exports = router;