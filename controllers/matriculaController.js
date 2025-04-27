const { Matricula, Estudiante, Curso } = require('../models');

// Obtener todas las matrículas con datos de estudiantes y cursos
exports.getAllMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.findAll({
      include: [
        { 
          model: Estudiante, 
          as: 'estudiante', 
          attributes: ['id', 'nombre', 'email'] 
        },
        { 
          model: Curso, 
          as: 'curso', 
          attributes: ['id', 'nombre', 'duracion_horas'] 
        },
      ],
    });
    res.json(matriculas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Crear una nueva matrícula
exports.createMatricula = async (req, res) => {
  try {
    const { estudianteId, cursoId } = req.body;
    
    // Verificar si el estudiante y el curso existen
    const estudiante = await Estudiante.findByPk(estudianteId);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    
    const curso = await Curso.findByPk(cursoId);
    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    
    // Verificar si la matrícula ya existe
    const matriculaExistente = await Matricula.findOne({
      where: { estudianteId, cursoId },
    });
    
    if (matriculaExistente) {
      return res.status(400).json({ error: 'El estudiante ya está matriculado en este curso' });
    }
    
    const matricula = await Matricula.create({
      estudianteId,
      cursoId,
      fecha_matricula: new Date(),
    });
    
    res.status(201).json(matricula);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};