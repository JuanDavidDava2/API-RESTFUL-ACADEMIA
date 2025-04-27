const { Estudiante, Matricula, Curso } = require('../models');

// Obtener todos los estudiantes
exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un estudiante por ID
exports.getEstudianteById = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo estudiante
exports.createEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un estudiante
exports.updateEstudiante = async (req, res) => {
  try {
    const [updated] = await Estudiante.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedEstudiante = await Estudiante.findByPk(req.params.id);
      return res.json(updatedEstudiante);
    }
    throw new Error('Estudiante no encontrado');
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un estudiante
exports.deleteEstudiante = async (req, res) => {
  try {
    const deleted = await Estudiante.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: 'Estudiante eliminado' });
    }
    throw new Error('Estudiante no encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener cursos de un estudiante
exports.getCursosByEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id, {
      include: [{
        model: Curso,
        as: 'cursos',
        through: { attributes: ['fecha_matricula'] },
      }],
    });
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(estudiante.cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};