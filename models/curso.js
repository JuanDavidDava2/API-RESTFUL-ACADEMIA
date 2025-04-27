module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define('Curso', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      duracion_horas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return Curso;
  };