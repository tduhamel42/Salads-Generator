function isInArray(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name == item.name) {
            return (true)
        }
    }
    return (false)
}

exports.getRandomIngredientsByType = function (ingredients, type, nbrType, blacklist) {
    let ret = []
    while (ret.length < nbrType) {
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].type == type
                && Math.floor((Math.random() * 50) + 1) == 10
                && !isInArray(blacklist, ingredients[i])
                && !isInArray(ret, ingredients[i])) {
                ret.push(ingredients[i])
                if (ret.length >= nbrType) {
                    return (ret)
                }
            }
        }
    }
    return (ret)
}
exports.getRandomIngredients = function (ingredients, size, color) {
    let ret = []
    let count = 0
    while (ret.length < size) {
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].color == color && Math.floor((Math.random() * 50) + 1) == 10) {
                ret.push(ingredients[i])
                if (ret.length >= size) {
                    return (ret)
                }
            }
        }
        count++
    }
    return (ret)
}

exports.getRandom = function (tab, blacklist) {
    let item = {}
    do {
        item = tab[Math.floor((Math.random() * (tab.length - 1)))]
    } while (isInArray(blacklist, item))
    return (item)
}