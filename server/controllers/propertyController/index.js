const uuid = require("uuid");
const path = require("path");
const ApiError = require("../../errorApi/index");
const { Property } = require("../../models/index");

class PropertyController {
    async addProperty(req, res, next) {
        try {
            const {
                title,
                price,
                exactAddress,
                city,
                furnished,
                bedrooms,
                bathrooms,
                squareMeters,
                description,
            } = req.body;

            const { imageURL } = req.files;
            let images = [];

            try {
                imageURL.forEach((image) => {
                    let fileName = uuid.v4() + ".jpg";
                    image.mv(path.resolve(__dirname, "../../assets", fileName));
                    images.push(fileName);
                });
            } catch (e) {
                next(ApiError.badRequest('Add at least 1 more image'))
            }

            if (
                !title ||
                !imageURL ||
                !price ||
                !exactAddress ||
                !city ||
                !furnished ||
                !bedrooms ||
                !bathrooms ||
                !squareMeters ||
                !description
            ) {
                next(ApiError.badRequest("Parameter was not passed"));
            }

            res.setHeader('Content-Type', 'application/json');
            const property = await Property.create({
                title,
                imageURL: images,
                price,
                exactAddress,
                city,
                furnished,
                bedrooms,
                bathrooms,
                squareMeters,
                description,
            });

            return res.json(property);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let { limit, page } = req.query;

            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            const property = await Property.findAll({
                limit,
                offset,
            });
            return res.json(property);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;

            const property = await Property.findOne({
                where: { id },
            });
            return res.json(property);
        } catch (e) {
            next(ApiError.internal(e));
        }
    }
}

module.exports = new PropertyController();
