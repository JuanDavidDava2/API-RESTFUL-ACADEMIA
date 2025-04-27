const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Curso = require('./curso')(sequelize, Sequelize);
db.Estudiante = require('./estudiante')(sequelize, Sequelize);
db.Matricula = require('./matricula')(sequelize, Sequelize);

// Definir relaciones many-to-many
db.Estudiante.belongsToMany(db.Curso, {
  through: db.Matricula,
  foreignKey: 'estudianteId',
  as: 'cursos'  // Alias para acceder a los cursos desde Estudiante
});

db.Curso.belongsToMany(db.Estudiante, {
  through: db.Matricula,
  foreignKey: 'cursoId',
  as: 'estudiantes'  // Alias para acceder a los estudiantes desde Curso
});

// 🔥 Añade estas relaciones clave (belongsTo)
db.Matricula.belongsTo(db.Estudiante, {
  foreignKey: 'estudianteId',
  as: 'estudiante'  // Alias para acceder al estudiante desde Matricula
});

db.Matricula.belongsTo(db.Curso, {
  foreignKey: 'cursoId',
  as: 'curso'  // Alias para acceder al curso desde Matricula
});

module.exports = db;