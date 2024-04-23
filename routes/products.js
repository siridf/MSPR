const express = require('express')
const router = express.Router()
const Product = require('../models/products')

//get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
});

//create product by id
router.post('/', async(req, res) => {
    const product = new Product({
        name: req.body.name, 
        price: req.body.price, 
        description : req.body.description, 
        color: req.body.color, 
        stock: req.body.stock
    })
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }
    catch (error) {
        res.status(400).json({ message : error.message })
    }
})


//update product by id
router.patch('/:id', getProduct, async (req, res) => {
    if(req.body.name != null) {
        res.product.name = req.body.name;
    }
    if(req.body.price != null) {
        res.product.price = req.body.price;
    }
    if(req.body.description != null) {
        res.product.description = req.body.description;
    }
    if(req.body.color != null) {
        res.product.color = req.body.color;
    }
    if(req.body.stock != null) {
        res.product.stock = req.body.stock;
    }

    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(400).json({ message : error.message })
    }
})

//get product by id
router.get('/:id', getProduct, (req, res) => {
    res.send(res.product)
})

//delete product by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Cannot find this product. Please check the id or product validity' }); 
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
});

async function getProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Cannot find this product. Please check the id or product validity' }); 
        }
        res.product = product; 
        next();
    } catch (error) {
        return res.status(500).json({ message : error.message });
    }
}



module.exports = router; 