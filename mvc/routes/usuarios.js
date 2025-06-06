const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');


// Exemplo de tarefas
const tarefas = [
  {
    titulo: 'Estudar Node.js',
    descricao: 'Ler documentação oficial',
    data_entrega: new Date(),
    status: 'Pendente',
    prioridade: 'Alta'
  }
];

// Rota GET /user
router.get('/', (req, res) => {
  // NÃO use res.json(tarefas) aqui!
  res.render('user', { tarefas });
});

module.exports = router;
// Exibe o formulário (tela de login)
router.get('/form', UsuarioController.mostrarLogin); // ⚠️ sem parênteses

// Cria novo usuário (POST)
router.post('/', UsuarioController.criarUsuario);

// Lista todos os usuários
router.get('/', UsuarioController.listarUsuarios);

// Demais rotas de API (se desejar manter)
router.get('/:id', UsuarioController.buscarUsuario);
router.put('/:id', UsuarioController.editarUsuario);
router.delete('/:id', UsuarioController.excluirUsuario);

module.exports = router;
