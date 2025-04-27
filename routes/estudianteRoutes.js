const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.get('/', estudianteController.getAllEstudiantes);
router.get('/:id', estudianteController.getEstudianteById);
router.post('/', estudianteController.createEstudiante);
router.put('/:id', estudianteController.updateEstudiante);
router.delete('/:id', estudianteController.deleteEstudiante);
router.get('/:id/cursos', estudianteController.getCursosByEstudiante);

module.exports = router;