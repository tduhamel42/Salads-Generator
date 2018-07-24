const mongoose = require('mongoose')

var baseSchema = mongoose.Schema({
    name: String,
    img: String
});
var Base = mongoose.model('Base', baseSchema)

var sauceSchema = mongoose.Schema({
    name: String
});
var Sauce = mongoose.model('Sauce', sauceSchema)

var saladeSchema = mongoose.Schema({
    name: String,
    menu: String,
    base: mongoose.Schema.Types.Mixed,
    sauce: String,
    ingredients: []
});
var Salade = mongoose.model('Salade', saladeSchema)

var ingredientSchema = mongoose.Schema({
    name: String,
    color: Number,
    price: String,
    img: String,
    type: String
});
var Ingredient = mongoose.model('Ingredient', ingredientSchema)

var menuSchema = mongoose.Schema({
    name: String,
    desc: String,
    nbrBlue: Number,
    nbrGreen: Number,
    price: String
});
var Menu = mongoose.model('Menu', menuSchema)

var userSchema = mongoose.Schema({
    name: String,
    blacklist: []
});
var User = mongoose.model('User', userSchema)

var ingredientTypeSchema = mongoose.Schema({
    name: String
});
var IngredientType = mongoose.model('ingredientType', ingredientTypeSchema)

module.exports = {
    Base: Base,
    Sauce: Sauce,
    Salade: Salade,
    Ingredient: Ingredient,
    Menu: Menu,
    User: User,
    IngredientType: IngredientType
}