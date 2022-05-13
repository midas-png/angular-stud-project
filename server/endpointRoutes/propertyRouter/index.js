const Router = require("express");
const router = new Router();
const PropertyController = require("../../controllers/propertyController/index");

router.post("/addProperty", PropertyController.addProperty);
router.get("/properties", PropertyController.getAll);
router.get("/property/:id", PropertyController.getOne);

module.exports = router;
