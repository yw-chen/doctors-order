const express = require('express')

const OrderCtrl = require('../controllers/order-controller')

const router = express.Router()

router.post('/order', OrderCtrl.createOrder)
router.put('/order/:id', OrderCtrl.updateOrder)
router.get('/order/:id', OrderCtrl.getOrdersById)

module.exports = router