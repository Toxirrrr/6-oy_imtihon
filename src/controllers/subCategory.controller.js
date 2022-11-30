// READ & WRITE
import { read, write } from "../utils/model.js"
let subCategory = read('subCategory')

// METHODS

// GET
let subGET = (req, res) => {
    res.send(subCategory)

}

// POST
let subPOST = function (req, res) {
    let { sub_category_name } = req.body

    try {
        let newSubCategory = { sub_category_id: subCategory.at(-1)?.sub_category_id + 1 || 1, sub_category_name }
        subCategory.push(newSubCategory)
        write('subCategory', subCategory)
        console.log(subCategory)

        res.status(201).send({ message: 'subCategory added', data: subCategory })
    } catch (error) {
        // res.status(404).send({ message: error.message })

    }

}

let subPUT = function (req, res) {

    let subCategory = read('subCategory')


    // VARIABLES
    let { id } = req.params
    let { sub_category_name } = req.body
    let finded = subCategory.find((e) => e.sub_category_id == id)

    console.log(finded)

    if (finded) {
        finded.sub_category_name = sub_category_name ? sub_category_name : finded.sub_category_name

        write('subCategory', subCategory)
        res.status(200).send({ messageage: 'subCategory edited', data: finded })
    } else {
        res.send('end')
    }
}

let subDELETE = function (req, res) {

    let { id } = req.params

    let finded = subCategory.findIndex((e) => e.sub_category_id == id)

    if (finded != -1) {
        let del = subCategory.splice(finded, 1)
        write('subCategory', subCategory)
    } else {
        res.status(404).send({ message: 'subCategory not succesfully' })
    }

}

// PARAMS
let subMETHOD = function (req, res) {
    let { id } = req.params

    let subCategories = subCategory.find(subCategories => subCategories.sub_category_id == id || subCategories.sub_category_name == id)
    res.send(subCategories)
}

export {
    subGET,
    subPOST,
    subPUT,
    subDELETE,
    subMETHOD
}