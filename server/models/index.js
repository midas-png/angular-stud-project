const sequelize = require("../database/index");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, dafaultValue: "USER" },
});

const Cart = sequelize.define("cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cart: { type: DataTypes.ARRAY(DataTypes.JSON) },
});

const Favorite = sequelize.define("favorite", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    favorite: { type: DataTypes.ARRAY(DataTypes.JSON) },
});

const Property = sequelize.define("properties", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    imageURL: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    exactAddress: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    furnished: { type: DataTypes.INTEGER, allowNull: false }, // 1 - Furnished | 0 - Not Furnished
    bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    bathrooms: { type: DataTypes.INTEGER, allowNull: false },
    squareMeters: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasOne(Favorite);
Favorite.belongsTo(User);

module.exports = {
    User,
    Cart,
    Favorite,
    Property,
};
