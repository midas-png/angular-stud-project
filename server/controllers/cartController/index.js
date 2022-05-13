const ApiError = require("../../errorApi/index");
const { Cart } = require("../../models/index");

class CartController {
    async handleChangeCart(req, res, next) {
        try {
            const { id } = req.params;
            const { jsonProperty } = req.body;

            if (!jsonProperty) {
                next(ApiError.badRequest("Property JSON was not passed"));
            }

            const cart = await Cart.update(
                {
                    cart: jsonProperty,
                },
                { where: { id: id } }
            );

            return res.json(cart);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }

    async getAll(req, res, next) {
        try {
            const cart = await Cart.findAll();
            return res.json(cart);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const cart = await Cart.findOne({
                where: { id },
            });
            return res.json(cart);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }
}

module.exports = new CartController();
