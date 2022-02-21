const Table = require('../models/table-model')

updateTable = async (req,res)=>{
    const body = req.body
    if(!body){
        return res.status(400).json({ 
            success: false, 
            error: 'No table provided', 
        })
    }

    Table.findOne({Name: req.params.name})
    .then((table)=>{
        table.LastId = body.LastId
        
        table.save()
        .then(() => {
            return res.status(200).json({ 
                success: true, 
                id: table.LastId, 
                message: 'Table updated', 
            })
        })
        .catch(error=>{
            return res.status(404).json({
                error,
                message: 'Table not updated',
            })
        })
    }).catch(error=>console.log(error))
}

getTableByName = async (req, res) => {
    Table.findOne({Name: req.params.name}, (err, table)=>{
        if(err){
            return res.status(404).json({
                err,
                message: 'Table not found',
            })
        }

        if(!table){
            return res.status(404)
            .json({success:false,error: 'Table nnot found'})
        }

        return res.status(200).json({success:true, data:table})
    }).catch(err => console.log(err))
}

module.exports = { 
    updateTable,
    getTableByName,
}