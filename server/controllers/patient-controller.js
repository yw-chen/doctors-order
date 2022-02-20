const Patient = require('../models/patient-model')

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

module.exports = {getPatients,}