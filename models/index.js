const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Curso = require('./curso')(sequelize, Sequelize);
db.Estudiante = require('./estudiante')(sequelize, Sequelize);
db.Matricula = require('./matricula')(sequelize, Sequelize);


db.Estudiante.belongsToMany(db.Curso, {
  through: db.Matricula,
  foreignKey: 'estudianteId',
  as: 'cursos'  
});

db.Curso.belongsToMany(db.Estudiante, {
  through: db.Matricula,
  foreignKey: 'cursoId',
  as: 'estudiantes' 
});


db.Matricula.belongsTo(db.Estudiante, {
  foreignKey: 'estudianteId',
  as: 'estudiante' 
});

db.Matricula.belongsTo(db.Curso, {
  foreignKey: 'cursoId',
  as: 'curso'
});

module.exports = db;