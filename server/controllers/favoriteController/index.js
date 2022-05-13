const ApiError = require("../../errorApi/index");
const { Favorite } = require("../../models/index");

class FavoriteController {
    async handleChangeFavorite(req, res, next) {
        try {
            const { id } = req.params;
            const { jsonProperty } = req.body;

            if (!jsonProperty) {
                next(ApiError.badRequest("Property JSON was not passed"));
            }

            const favorite = await Favorite.update(
                {
                    favorite: jsonProperty,
                },
                { where: { id: id } }
            );

            return res.json(favorite);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }

    async getAll(req, res, next) {
        try {
            const favorite = await Favorite.findAll();
            return res.json(favorite);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const favorite = await Favorite.findOne({
                where: { id },
            });
            return res.json(favorite);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }
}

module.exports = new FavoriteController();
