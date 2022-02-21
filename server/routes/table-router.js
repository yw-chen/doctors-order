const express = require('express')

const TableCtrl = require('../controllers/table-controller')

const router = express.Router()

router.put('/table/:name', TableCtrl.updateTable)
router.get('/table/:name', TableCtrl.getTableByName)

module.exports = router