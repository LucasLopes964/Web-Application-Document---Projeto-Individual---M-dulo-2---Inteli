# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## HELP BROS.

Lucas Garcia Rodrigues Lopes
## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)
O sistema HELP BROS é uma aplicação web de gerenciamento de tarefas acadêmicas feita para estudantes de faculdade. A aplicação web irá permitir que os estudantes se organizem, prazos das atividades e provas em um único lugar, com notificações para não perder a data. O objetivo é ajudar os estudantes a melhorar sua organização, reduzindo o estresse causado pela sobrecarga de trabalhos e prazos.

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

Nome: Ana Carolina Silva

Idade: 22 anos

Ocupação: Estudante de Engenharia de Software


Hábitos digitais:

Ativa em redes sociais educacionais

Utiliza frequentemente apps de produtividade

Estuda pelo smartphone e notebook


Necessidades:

Organizar tarefas e prazos 

Receber lembretes sobre entregas 


Dores:

Dificuldade em acompanhar os prazos

Perde tempo procurando materiais 

Estresse com sobrecarga de trabalhos


Solução: O sistema ajudará Ana Carolina a centralizar todas suas tarefas, com categorização por disciplinas, alertas e funcionalidades de compartilhamento, permitindo que ela se organize melhor e diminua sua ansiedade em relação aos prazos.

### 2.2. User Stories (Semana 01)

US01 | Como estudante universitário, quero cadastrar minhas tarefas acadêmicas com prazos e prioridades, para que eu possa me organizar melhor e cumprir os prazos.

US02 | Como membro do grupo de estudos, quero ter minhas tarefas com facil disponibilidade, para assim compartilhar tarefas e materiais com meus colegas, para colaborar mais eficientemente nos trabalhos em equipe.

US03 | Como usuário do sistema, quero receber notificações sobre prazos próximos, para que eu não perca nenhuma entrega importante.

Análise INVEST da US01:

I - Independente: A funcionalidade de cadastro de tarefas não depende de outras features para ser implementada.

N - Negociável: Os detalhes de implementação (campos, interface) podem ser ajustados conforme feedback.

V - Valiosa: Resolve uma dor direta da persona (organização de prazos).

E - Estimável: O esforço de desenvolvimento pode ser facilmente calculado.

S - Pequena: Pode ser implementada em um ciclo curto de desenvolvimento.

T - Testável: Pode ser verificada através de testes de cadastro e listagem de tarefas.


---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![2025-05-09 (3)](https://github.com/user-attachments/assets/996cf645-df74-4cd4-b274-f79c1267f56f)


**1. Tabela Usuario**

Representa os usuários do sistema. (Consolidado das entidades usuario e usuarios da imagem).

Relações:

1 Usuário : N Disciplinas: Um usuário pode ter várias disciplinas. (Disciplina.usuario_id -> Usuario.id)

1 Usuário : N Tarefas: Um usuário pode ter várias tarefas. (Tarefa.usuario_id -> Usuario.id)

1 Usuário : N Materiais: Um usuário pode fazer upload de vários materiais. (Material.usuario_id -> Usuario.id)

1 Usuário : N Notificações: Um usuário pode receber várias notificações. (Notificacao.usuario_id -> Usuario.id)


**2. Tabela Disciplina**

Representa as disciplinas ou matérias. (Consolidado das entidades disciplina e disciplinas da imagem, incluindo o campo codigo).

Relações:

1 Disciplina : 1 Usuário: Cada disciplina pertence a um usuário. (Disciplina.usuario_id -> Usuario.id)

1 Disciplina : N Tarefas: Uma disciplina pode ter várias tarefas associadas. (Tarefa.disciplina_id -> Disciplina.id)

1 Disciplina : N Materiais: Uma disciplina pode ter vários materiais associados. (Material.disciplina_id -> Disciplina.id)


**3. Tabela Tarefa**

Representa as tarefas a serem realizadas. (Consolidado das entidades tarefa e tarefas da imagem).

Relações:

1 Tarefa : 1 Usuário: Cada tarefa é associada a um usuário. (Tarefa.usuario_id -> Usuario.id)

1 Tarefa : 1 Disciplina (Opcional): Uma tarefa pode ser associada a uma disciplina. (Tarefa.disciplina_id -> Disciplina.id)

1 Tarefa : N Notificações: Uma tarefa pode gerar várias notificações. (Notificacao.tarefa_id -> Tarefa.id)

```sql
-- Remove tabelas existentes em ordem correta de dependência
DROP TABLE IF EXISTS Tarefa CASCADE;
DROP TABLE IF EXISTS Disciplina CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criação da tabela Disciplina
CREATE TABLE Disciplina (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
);

-- Criação da tabela Tarefa
CREATE TABLE Tarefa (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_entrega TIMESTAMP WITH TIME ZONE NOT NULL,
    prioridade VARCHAR(10) CHECK (prioridade IN ('baixa', 'media', 'alta')) DEFAULT 'media',
    status VARCHAR(10) CHECK (status IN ('pendente', 'concluido', 'atrasado')) DEFAULT 'pendente',
    usuario_id INT NOT NULL,
    disciplina_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(id) ON DELETE SET NULL
);
```
### 3.1.1 BD e Models (Semana 5)

###  Usuario (`models/Usuario.js`)
Representa os dados dos usuários cadastrados no sistema.

**Atributos:**
- `id`: Identificador único
- `nome`: Nome do usuário
- `email`: E-mail do usuário
- `senha`: Senha do usuário

**Métodos:**
- `getAll()`: Retorna todos os usuários
- `getById(id)`: Retorna um usuário específico pelo ID
- `create(data)`: Cria um novo usuário
- `update(id, data)`: Atualiza um usuário existente
- `delete(id)`: Remove um usuário pelo ID

---

###  Tarefa (`models/Tarefa.js`)
Gerencia as tarefas vinculadas aos usuários e disciplinas.

**Atributos:**
- `id`: Identificador da tarefa
- `titulo`, `descricao`: Informações descritivas da tarefa
- `data_entrega`, `prioridade`, `status`: Metadados da tarefa
- `usuario_id`, `disciplina_id`: Relações com outras tabelas

**Métodos:**
- `getAll()`: Lista todas as tarefas
- `getById(id)`: Retorna uma tarefa específica
- `create(data)`: Insere uma nova tarefa
- `update(id, data)`: Atualiza os dados de uma tarefa
- `delete(id)`: Exclui uma tarefa

---

###  Disciplina (`models/Disciplina.js`)
Responsável pelas disciplinas cadastradas no sistema.

**Atributos:**
- `id`: Identificador da disciplina
- `nome`: Nome da disciplina
- `usuario_id`: ID do usuário responsável

**Métodos:**
- `getAll()`: Lista todas as disciplinas
- `getById(id)`: Retorna uma disciplina pelo ID
- `create(data)`: Cria uma nova disciplina
- `update(id, data)`: Atualiza os dados de uma disciplina
- `delete(id)`: Remove uma disciplina do banco de dados

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)


![0279d928-1b5f-44d0-88a9-b98f17190094](https://github.com/user-attachments/assets/67afeb89-860c-44ac-92f8-42cf20542a3c)


### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

##  Usuários (`/api/usuarios`)

| Método | Rota                | Descrição                                 |
|--------|---------------------|-------------------------------------------|
| GET    | `/api/usuarios`     | Lista todos os usuários                   |
| GET    | `/api/usuarios/:id` | Busca um usuário pelo ID                  |
| POST   | `/api/usuarios`     | Cria um novo usuário                      |
| PUT    | `/api/usuarios/:id` | Atualiza os dados de um usuário existente |
| DELETE | `/api/usuarios/:id` | Exclui um usuário                         |

##  Tarefas (`/api/tarefas`)

| Método | Rota                | Descrição                          |
|--------|---------------------|------------------------------------|
| GET    | `/api/tarefas`      | Lista todas as tarefas             |
| GET    | `/api/tarefas/:id`  | Busca uma tarefa pelo ID           |
| POST   | `/api/tarefas`      | Cria uma nova tarefa               |
| PUT    | `/api/tarefas/:id`  | Atualiza uma tarefa existente      |
| DELETE | `/api/tarefas/:id`  | Exclui uma tarefa                  |

##  Disciplinas (`/api/disciplinas`)

| Método | Rota                     | Descrição                                     |
|--------|--------------------------|-----------------------------------------------|
| GET    | `/api/disciplinas`       | Lista todas as disciplinas                    |
| POST   | `/api/disciplinas`       | Cria uma nova disciplina                      |
| PUT    | `/api/disciplinas/:id`   | Atualiza os dados de uma disciplina existente |
| DELETE | `/api/disciplinas/:id`   | Exclui uma disciplina                         |


### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
