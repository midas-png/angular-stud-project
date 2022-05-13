const Router = require("express");
const router = new Router();
const cartRouter = require("./cartRouter/index");
const favoriteRouter = require("./favoriteRouter/index");
const propertyRouter = require("./propertyRouter/index");
const userRouter = require("./userRouter/index");

router.use("/cart", cartRouter);
router.use("/favorite", favoriteRouter);
router.use("/property", propertyRouter);
router.use("/user", userRouter);

module.exports = router;
