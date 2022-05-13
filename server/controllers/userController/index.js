const { User, Cart, Favorite } = require("../../models/index");
const ApiError = require("../../errorApi/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwtToken = (id, email, role) => {
    return jwt.sign(
        {
            id,
            email,
            role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "120h" }
    );
};

class UserController {
    async signup(req, res, next) {
        try {
            const { first_name, last_name, email, password, role } = req.body;
            if (!first_name || !last_name || !email || !password) {
                next(ApiError.badRequest("Parameter was not passed"));
            }
            const userFound = await User.findOne({ where: { email } });
            if (userFound) {
                next(ApiError.badRequest("Email already used"));
            }
            const hashPassword = await bcrypt.hash(password, 4);
            const user = await User.create({
                first_name,
                last_name,
                email,
                password: hashPassword,
                role: role || "TENANT",
            });
            const cart = await Cart.create({
                userId: user.id,
                cart: [],
            });

            const favorite = await Favorite.create({
                userId: user.id,
                favorite: [],
            });
            const token = generateJwtToken(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.internal("User was not found"));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.internal("Wrond password"));
            }
            const token = generateJwtToken(user.id, user.email, user.role);
            return res.json({ token });
        } catch (e) {
            next(ApiError.badRequest(e));
        }
    }

    async auth(req, res, next) {
        const token = generateJwtToken(
            req.user.id,
            req.user.email,
            req.user.role
        );
        return res.json({ token });
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params;

        if (!id) {
            next(ApiError.badRequest("No ID was passed"));
        }

        try {
            const user = await User.findOne({
                where: { id },
                include: [
                    { model: Cart, as: "cart" },
                    { model: Favorite, as: "favorite" },
                ],
            });

            return res.json(user);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController();
