const Patient = require('../models/patient-model')

updatePatient = async (req,res)=>{
    const body = res.body
    if(!body){
        return res.status(400).json({ 
            success: false, 
            error: 'No Patient provided', 
        })
    }

    Patient.findOne({Id: req.params.id},(err, patient)=>{
        if(err){
            return res.status(404).json({
                err,
                message: 'Patient not found',
            })
        }

        patient.OrderId = body.OrderId

        patient.save().
        then(() => {
            return res.status(200).json({ 
                success: true, 
                id: order.Id, 
                message: 'Patient updated', 
            })
        })
        .catch(error=>{
            return res.status(404).json({
                error,
                message: 'Patient not updated',
            })
        })
    }).catch(err=>console.log(err))
}

getPatients = async (req,res)=>{
    await Patient.find({},(err, patients)=>{
        if(err){
            return res.status(400).json({success: false, error:err})
        }
        if(!patients.length){
            return res.status(404).json({success: false, error:'Patient not found'})
        }
        return res.status(200).json({success:true, data:patients})
    }).catch(err=>console.log(err))
}

module.exports = {
    getPatients,
    updatePatient,
}