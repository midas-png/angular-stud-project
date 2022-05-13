const Router = require("express");
const router = new Router();
const UserController = require("../../controllers/userController/index");
const authMiddleware = require("../../middleware/authHandler/index")

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.auth);
router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.getOne);

module.exports = router;
