const Router = require("express");
const router = new Router();
const FavoriteController = require("../../controllers/favoriteController/index");

router.patch("/handleChangeFavorite/:id", FavoriteController.handleChangeFavorite);
router.get("/usersFavorite", FavoriteController.getAll);
router.get("/userFavorite/:id", FavoriteController.getOne);

module.exports = router;
