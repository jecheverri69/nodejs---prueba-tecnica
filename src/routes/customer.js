const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');



//url's

router.get('/', customerController.list);
router.post('/add', customerController.add);



//exportar rutas
module.exports = router;