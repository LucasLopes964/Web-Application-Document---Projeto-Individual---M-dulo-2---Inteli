const express = require('express');
const router = express.Router();
const DisciplinaController = require('../controllers/DisciplinaController');

router.get('/', DisciplinaController.listarDisciplinas);

router.get('/novo', DisciplinaController.mostrarFormularioCriar);
router.post('/', DisciplinaController.criarDisciplina);

router.get('/editar/:id', DisciplinaController.mostrarFormularioEditar);
router.post('/editar/:id', DisciplinaController.editarDisciplina);

router.post('/excluir/:id', DisciplinaController.excluirDisciplina);

module.exports = router;
