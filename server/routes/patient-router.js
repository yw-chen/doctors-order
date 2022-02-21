const express = require('express')

const PatientCtrl = require('../controllers/patient-controller')

const router = express.Router()

router.get('/patients', PatientCtrl.getPatients)
router.put('/patient/:id', PatientCtrl.updatePatient)

module.exports = router