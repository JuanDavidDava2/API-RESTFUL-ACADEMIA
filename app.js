const express = require('express');
const cors = require('cors');
const cursoRoutes = require('./routes/cursoRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const matriculaRoutes = require('./routes/matriculaRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/cursos', cursoRoutes);
app.use('/estudiantes', estudianteRoutes);
app.use('/matriculas', matriculaRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

module.exports = app;