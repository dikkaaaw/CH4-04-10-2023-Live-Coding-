const router = require("express").Router();

const User = require("../controllers/userController");

router.post("/", User.createUser);
router.get("/", User.findAllUsers);
router.get("/:id", User.findUserById);
router.patch("/:id", User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;
