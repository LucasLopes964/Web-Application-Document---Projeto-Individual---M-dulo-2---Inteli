const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

// Página principal: lista de tarefas (renderiza view EJS)
router.get('/', TarefaController.listarTarefas);

// Criar nova tarefa (via formulário ou API)
router.post('/', TarefaController.criarTarefa);

// API: buscar tarefa por ID
router.get('/:id', TarefaController.buscarTarefa);

// API: editar tarefa
router.put('/:id', TarefaController.editarTarefa);

// API: excluir tarefa
router.delete('/:id', TarefaController.excluirTarefa);

module.exports = router;
