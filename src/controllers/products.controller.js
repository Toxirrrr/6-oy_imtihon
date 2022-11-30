// READ & WRITE
import { read, write } from '../utils/model.js'
let products = read('products')

let GET = (req, res) => {
    res.send(products)

}

let POST = function (req, res) {

    let products = read('products')

    let { model, product_name, price, color } = req.body

    try {

        let newProducts = { product_id: products.at(-1)?.product_id + 1 || 1, model, product_name, color, price }

        products.push(newProducts)

        write('products', products)

        res.status(200).send({message: 'succesfully', data: products.at(-1)})

    } catch (error) {
        // res.status(404).send({ message: 'Error' })
    }
}

let PUT = function (req, res) {
    let { id } = req.params
    let { model, product_name, price, color } = req.body

    let finded = products.find((e) => e.product_id == id)
    if (finded) {
        finded.model = model ? model : finded.model
        finded.product_name = product_name ? product_name : finded.product_name
        finded.price = price ? price : finded.price
        finded.color = color ? color : finded.color
        write('products', products)
        res.status(200).send({ message: '', data: finded })
    } else {
        res.status(404).send('prodect not found')
    }

}

let DELETE = function (req, res) {
    let { id } = req.params
    let finded = products.findIndex(e => e.product_id == id)
    console.log(finded);

    if (finded != -1) {
        let del = products.splice(finded, 1)
        write('products', products)
        res.status(200).send({ message: '', data: del })
    } else {
        // res.status(404).send('prodect not found')
    }


    res.json(finded)
}

let METHOD = function (req, res) {

    let { id } = req.params

    console.log(req.query)

    let product = products.find(product => product.product_id == id || product.product_name == id)

    res.send(product)
}

export {
    GET,
    POST,
    PUT,
    DELETE,
    METHOD
} 