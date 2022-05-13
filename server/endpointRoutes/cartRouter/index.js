const Router = require("express");
const router = new Router();
const CartController = require("../../controllers/cartController/index");

router.patch("/handleChangeCart/:id", CartController.handleChangeCart);
router.get("/usersCart", CartController.getAll);
router.get("/userCart/:id", CartController.getOne);

module.exports = router;
