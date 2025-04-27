const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matriculaController');

router.get('/', matriculaController.getAllMatriculas);
router.post('/', matriculaController.createMatricula);

module.exports = router;