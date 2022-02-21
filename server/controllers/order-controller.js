const Order = require('../models/order-model')

createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({ 
            success: false, 
            error: 'No order provided', 
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order.save()
        .then(() => {
            return res.status(201).json({ 
                success: true, 
                id: order._id, 
                message: 'Order created', 
            })
        })
        .catch(error=>{
            return res.status(400).json({
                success:false,
                message: 'Order not created',
            })
        })
}

updateOrder = async (req,res)=>{
    const body = req.body
    if(!body){
        return res.status(400).json({ 
            success: false, 
            error: 'No order provided', 
        })
    }

    Order.findOne({Id: req.params.id})
    .then((order)=>{
        order.Message = body.Message
        
        order.save()
        .then(() => {
            return res.status(200).json({ 
                success: true, 
                id: order.Id, 
                message: 'Order updated', 
            })
        })
        .catch(error=>{
            return res.status(404).json({
                error,
                message: 'Order not updated',
            })
        })
    })
}

getOrderById = async (req, res) => {
    Order.findOne({Id: req.params.id}, (err, order)=>{
        if(err){
            return res.status(404).json({
                err,
                message: 'Order not found',
            })
        }

        if(!order){
            return res.status(404)
            .json({success:false,error: 'Order nnot found'})
        }

        return res.status(200).json({success:true, data:order})
    }).catch(err => console.log(err))
}

module.exports = { 
    createOrder, 
    updateOrder,
    getOrderById,
}