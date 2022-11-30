
// EXPRESS
import express from 'express'
const app = express();
app.use( express.json())

// CONTROLLERS
import { GET, PUT, POST, DELETE, METHOD } from './controllers/products.controller.js';
import { categMETHOD, categPUT, categGET, categPOST, categDELETE } from './controllers/categories.controller.js';
import { subGET, subPOST, subMETHOD, subPUT, subDELETE } from './controllers/subCategory.controller.js';




// CATEGORY

// categories GET
app.get('/categories', categGET)

// categories PARAMS
app.get('/categories/:id', categMETHOD)

// categories PUT
app.put('/categories/:id', categPUT)

// categories POST
app.post('/categories', categPOST)

app.delete('/categories/:id', categDELETE)



// SUBCATEGORY

// subCategory GET
app.get('/subCategory', subGET)

// subCategory METHOD
app.get('/subCategory/:id', subMETHOD)

// POST
app.post('/subCategory', subPOST)

// PUT 
app.put('/subCategory/:id', subPUT)

// DELETE
app.delete('/subCategory/:id', subDELETE)



// PRODUCT

// PRODUCT GET
app.get('/products', GET)

// PRODUCT POST
app.post('/products', POST)

// PRODUCT PUT
app.put("/products/:id", PUT)

// PRODUCT DELETE
app.delete("/products/:id", DELETE)

// PRODUCT PARAMS
app.get('/products/:id', METHOD)


app.listen(5001, () => { console.log(`Example app listening on port http://localhost:5001`) })