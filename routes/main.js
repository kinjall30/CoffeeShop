const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', async(req,res,next) => {

    const data = req.context

    const itemCtr = controllers.item.instance()
    data.coffee = await itemCtr.get({category: 'coffee'})
    data.lunch = await itemCtr.get({category: 'lunch'})
    data.dessert = await itemCtr.get({category: 'dessert'})
    
    res.render('home', data)
})


router.get('/items', async(req, res, next) => {
    const filters = req.query
    const itemCtr = controllers.item.instance()
    const item = await itemCtr.get(filters)

    res.json({
        item
    })
})

router.get('/order', async (req, res, next) => {
    const orderData = req.body
    const orderCtr = controllers.order.instance()
    const order = await orderCtr.post(orderData)
    
    res.json(orderData)
})


module.exports = router