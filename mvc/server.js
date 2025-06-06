const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');
const UsuarioController = require('./controllers/UsuarioController');

const app = express();
const PORT = 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Array para armazenar tarefas temporariamente
let tarefas = [
  {
    titulo: 'Estudar Node.js',
    descricao: 'Ler documentação oficial',
    data_entrega: new Date(),
    status: 'Pendente',
    prioridade: 'Alta'
  }
];

// Rota GET para /user
app.get('/user', (req, res) => {
  res.render('user', { tarefas });
});

app.post('/user', (req, res) => {
  // Aqui você pode tratar os dados enviados pelo formulário se quiser
  res.render('user', { tarefas });
});

// Rota raiz: tela de login
app.get('/', UsuarioController.mostrarLogin);

// Rotas de tarefas (devem vir antes das rotas agrupadas)
app.get('/tarefas/nova', (req, res) => {
  res.render('criartarefa');
});

app.post('/tarefas', (req, res) => {
  const { titulo, descricao } = req.body;
  tarefas.push({
    titulo,
    descricao,
    data_entrega: new Date(),
    status: 'Pendente',
    prioridade: 'Normal'
  });
  res.redirect('/user');
});

app.delete('/tarefas/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (!isNaN(index)) {
    tarefas.splice(index, 1);
  }
  res.redirect('/user');
});

// Rotas principais agrupadas (deixe por último)
app.use('/', routes);

// Inicia servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${PORT}`);
});

