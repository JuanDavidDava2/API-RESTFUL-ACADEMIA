const { Curso, Matricula, Estudiante } = require('../models');

// Obtener todos los cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un curso por ID
exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo curso
exports.createCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un curso
exports.updateCurso = async (req, res) => {
  try {
    const [updated] = await Curso.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCurso = await Curso.findByPk(req.params.id);
      return res.json(updatedCurso);
    }
    throw new Error('Curso no encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un curso
exports.deleteCurso = async (req, res) => {
  try {
    const deleted = await Curso.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.json({ message: 'Curso eliminado' });
    }
    throw new Error('Curso no encontrado');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener estudiantes de un curso
exports.getEstudiantesByCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id, {
      include: [{
        model: Estudiante,
        as: 'estudiantes',
        through: { attributes: ['fecha_matricula'] },
      }],
    });
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(curso.estudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};