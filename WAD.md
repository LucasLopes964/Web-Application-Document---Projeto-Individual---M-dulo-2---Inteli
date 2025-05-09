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


**4. Tabela Material**

Representa os materiais de estudo. (Baseado na entidade materiais da imagem, com o campo grupo_id removido conforme solicitado).

Relações:

1 Material : 1 Usuário (Uploader): Cada material é enviado por um usuário. (Material.usuario_id -> Usuario.id)

1 Material : 1 Disciplina (Opcional): Um material pode ser associado a uma disciplina. (Material.disciplina_id -> Disciplina.id)


**5. Tabela Notificacao**

Representa as notificações do sistema. (Baseado na entidade notificacoes da imagem).

Relações:

1 Notificação : 1 Usuário (Destinatário): Cada notificação é destinada a um usuário. (Notificacao.usuario_id -> Usuario.id)

1 Notificação : 1 Tarefa (Opcional): Uma notificação pode estar relacionada a uma tarefa específica. (Notificacao.tarefa_id -> Tarefa.id)


### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

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
