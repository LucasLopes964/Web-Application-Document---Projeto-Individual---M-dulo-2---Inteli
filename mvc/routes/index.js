// routes/index.js
const express = require('express');
const router = express.Router();

// Importa as rotas específicas de cada entidade
const tarefasRoutes = require('./tarefas');
const disciplinasRoutes = require('./disciplina');  // singular mesmo, pois seu arquivo é disciplina.js
const usuariosRoutes = require('./usuarios');

// Define os caminhos base para cada grupo de rotas
router.use('/tarefas', tarefasRoutes);
router.use('/disciplinas', disciplinasRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;
