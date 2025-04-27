module.exports = (sequelize, DataTypes) => {
    const Matricula = sequelize.define('Matricula', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      estudianteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Estudiantes',
          key: 'id',
        },
      },
      cursoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Cursos',
          key: 'id',
        },
      },
      fecha_matricula: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return Matricula;
  };