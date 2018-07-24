const express = require('express')
const mongoose = require('mongoose')
const app = express()
const models = require('./models/models')
const generator = require('./utils/generator')
mongoose.connect('mongodb://localhost/salade')


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database")
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/v1', (req, res, next) => {
    res.send(JSON.stringify({
        name: "SaladeAPI",
        version: "0.1"
    }))
})

// Base
app.get('/v1/bases', async (req, res, next) => {

    let bases = await models.Base.find()
    res.send({ bases })
})

app.get('/v1/base/:id', async (req, res, next) => {

    let base = await models.Base.findOne({ _id: req.params.id })
    res.send({ base })
})

app.post('/v1/base', async (req, res, next) => {
    console.log('New base requested')

    var base = new models.Base({
        name: req.query.name,
        img: req.query.img
    })
    console.log(base)

    base.save((err) => {
        if (err) {
            console.log(err)
            res.send('Error while creating base: ' + err)
        }
        else res.send({ base })
    })
})

// Sauce
app.get('/v1/sauces', async (req, res, next) => {

    let sauces = await models.Sauce.find()
    res.send({ sauces })
})

app.get('/v1/sauce/:id', async (req, res, next) => {

    let sauce = await models.Sauce.findOne({ _id: req.params.id })
    res.send({ sauce })
})

app.post('/v1/sauce', async (req, res, next) => {
    console.log('New sauce requested')

    var sauce = new models.Sauce({
        name: req.query.name
    })
    console.log(sauce)

    sauce.save((err) => {
        if (err) {
            console.log(err)
            res.send('Error while creating sauce: ' + err)
        }
        else res.send({ sauce })
    })
})

// Salade
app.get('/v1/salades', async (req, res, next) => {

    let tmpsalades = await models.Salade.find()
    let salades = []
    for (let i = 0; i < tmpsalades.length; i++) {
        salades.push({
            name: tmpsalades[i].name,
            menu: tmpsalades[i].menu,
            base: JSON.stringify(tmpsalades[i].base),
            sauce: tmpsalades[i].sauce,
            ingredients: JSON.stringify(tmpsalades[i].ingredients)
        })
    }
    res.send({ salades })
})

app.get('/v1/salade/:id', async (req, res, next) => {

    let salade = await models.Salade.findOne({ _id: req.params.id })
    res.send({ salade })
})

app.post('/v1/salade', async (req, res, next) => {
    console.log('New salade requested')

    var salade = new models.Salade({
        name: req.query.name,
        menu: req.query.menu,
        base: JSON.parse(req.query.base),
        sauce: req.query.sauce,
        ingredients: JSON.parse(req.query.ingredients)
    })
    console.log(salade)

    salade.save((err) => {
        if (err) {
            console.log(err)
            res.send('Error while creating salade: ' + err)
        }
        else res.send({ salade })
    })
})

// Ingredients
app.get('/v1/ingredients', async (req, res, next) => {

    let ingredients = await models.Ingredient.find()
    res.send({ ingredients })
})

app.post('/v1/ingredient', async (req, res, next) => {
    console.log('New ingredient requested')

    var ingredient = new models.Ingredient({
        name: req.query.name,
        color: req.query.color,
        price: 0,
        img: req.query.img
    })

    ingredient.save((err) => {
        if (err) {
            console.log(err)
            res.send('Error while creating ingredient: ' + err)
        }
        else res.send({ ingredient })
    })
})

app.get('/v1/ingredient/:id', async (req, res, next) => {

    let ingredient = await models.Ingredient.findOne({ _id: req.params.id })
    res.send({ ingredient })
})

// Menus
app.get('/v1/menus', async (req, res, next) => {

    let menus = await models.Menu.find()
    res.send({ menus })
})

app.post('/v1/menu', async (req, res, next) => {
    console.log('New menu requested')

    var menu = new models.Menu({
        name: req.query.name,
        desc: req.query.desc,
        nbrBlue: req.query.nbrBlue,
        nbrGreen: req.query.nbrGreen,
        price: req.query.price
    })

    menu.save((err) => {
        if (err) res.send('Error while creating menu: ' + err)
        else res.send({ menu })
    })
})

app.get('/v1/menu/:id', async (req, res, next) => {

    let menu = await models.Menu.findOne({ _id: req.params.id })
    res.send({ menu })
})

// User
app.get('/v1/users', async (req, res, next) => {

    let users = await models.User.find()
    res.send({ users })
})

app.post('/v1/user', async (req, res, next) => {
    console.log('New user requested')

    var user = new models.User({
        name: req.query.name
    })

    user.save((err) => {
        if (err) res.send('Error while creating user: ' + err)
        else res.send({ user })
    })
})

app.get('/v1/user/:id', async (req, res, next) => {

    console.log('User requested by id')

    let user = await models.User.findOne({ _id: req.params.id })
    res.send({ user })
})

app.post('/v1/updateUser/:id', async (req, res, next) => {
    console.log(req.query.blacklist)
    models.User.findById(req.params.id, async (err, u) => {
        u.update({ blacklist: JSON.parse(req.query.blacklist) }, null, async (err, numberAffected, raw) => {
            let user = await models.User.findOne({ _id: req.params.id })
            res.send(user)
        })
    })
})

// IngredientType
app.get('/v1/ingredientTypes', async (req, res, next) => {

    let ingredientTypes = await models.IngredientType.find()
    res.send({ ingredientTypes })
})

app.post('/v1/ingredientType', async (req, res, next) => {
    console.log('New ingredientType requested')

    var ingredientType = new models.IngredientType({
        name: req.query.name
    })

    ingredientType.save((err) => {
        if (err) res.send('Error while creating ingredientType: ' + err)
        else res.send({ ingredientType })
    })
})

app.get('/v1/ingredientType/:id', async (req, res, next) => {

    console.log('IngredientType requested by id')

    let ingredientType = await models.IngredientType.findOne({ _id: req.params.id })
    res.send({ ingredientType })
})

// Get all element
app.get('/v1/all', async (req, res, next) => {

    console.log('All element requestd')

    let ingredients = await models.Ingredient.find()
    let bases = await models.Base.find()
    let sauces = await models.Sauce.find()
    res.send({ all: ingredients.concat(bases).concat(sauces) })
})

// Salades Generation
app.get('/v1/generate', async (req, res, next) => {

    console.log("New generation")

    let menu = await models.Menu.findOne({ _id: req.query.menu })
    let ingredients = await models.Ingredient.find()
    let blue = generator.getRandomIngredients(ingredients, menu.nbrBlue, 1)
    let green = generator.getRandomIngredients(ingredients, menu.nbrGreen, 0)

    var salade = {
        name: "Generated",
        menu: menu._id,
        ingredients: blue.concat(green)
    }
    res.send({ salade })
})

// Salades Generation v2
app.get('/v2/generate', async (req, res, next) => {

    console.log("New generation v2")

    let nbrByType = req.query.nbrByType.split(',')
    let ingredients = await models.Ingredient.find()
    let ingredientTypes = await models.IngredientType.find()
    let user = await models.User.findOne({ _id: req.query.id })
    let bases = await models.Base.find()
    let sauces = await models.Sauce.find()
    let final_ingredients = []
    for (let i = 0; i < ingredientTypes.length; i++) {
        let tmp = generator.getRandomIngredientsByType(ingredients, ingredientTypes[i].name, nbrByType[i], user.blacklist)
        final_ingredients = final_ingredients.concat(tmp)
    }

    let base = generator.getRandom(bases, user.blacklist)
    let sauce = generator.getRandom(sauces, user.blacklist)

    var salade = {
        name: "Generated v2",
        menu: "0",
        base: base,
        sauce: sauce,
        ingredients: final_ingredients
    }
    res.send({ salade })
})

app.listen(3000, () => console.log('Salade app listening on port 3000!'))