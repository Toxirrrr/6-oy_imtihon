// READ & WRITE
import { read, write } from "./../utils/model.js"
let categories = read('categories')
let subCategory = read('subCategory')


// PARAMS 
let categMETHOD = (req, res) => {
    let { id } = req.params

    console.log(req.body.name);

    let category = categories.find(category => category.categories_id == id || category.categories_name == id)
    res.send(category)
}

// GET
let categGET = function (req, res) {
    res.send(categories)

    categories.map(category => {
        category.subCategory = subCategory.filter(sc => sc.category_id == category.category_id)
        category.subCategory.map(item => delete item.category_id)
    })

}

// PUT
let categPUT = function (req, res) {

    let categories = read('categories')

    let { id } = req.params
    let { categories_name } = req.body

    let finded = categories.find((t) => t.categories_id == id)
    if (finded) {
        finded.categories_name = categories_name ? categories_name : finded.categories_name

        write('categories', categories)
        res.status(200).send({ message: 'category added', data: finded })
    } else {
        res.status(404).send({ message: 'error in adding category' })
    }

    res.json(finded)
}

let categPOST = function (req, res) {

    let { categories_name } = req.body

    try {
        let newCategories = { categories_id: categories.at(-1)?.categories_id + 1 || 1, categories_name }

        categories.push(newCategories)

        console.log(newCategories)

        write("categories", categories)

        res.status(200).send({ message: 'category added', data: newCategories })

    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

let categDELETE = function (req, res) {
    let categories = read('categories')

    let { id } = req.params
    let finded = categories.findIndex(e => e.categories_id == id)
    console.log(finded)

    if (finded != -1) {
        let del = categories.splice(finded, 1)
        write('categories', categories)
        res.status(200).send({ message: 'post succesfully deleted', data: del })
    } else {
        res.status(404).send({ message: 'error' })
    }
}

export {
    categGET,
    categPUT,
    categPOST,
    categDELETE,
    categMETHOD
}