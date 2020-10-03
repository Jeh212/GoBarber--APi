# Recuperacao de senha

**Requesitos Funcionais**

  - O usuario deve poder recuperar sua senha informando o seu e-mail;
  - O usuario deve receber um e-mail com instruçoes de recuperçao de senha;
  - O usuario deve poder resetar sua senha;

**Requesitos nao Funcionais**
  - Utilizar Mailtrap para testar envio de mail
  - Utilizar o Amazon SES para envios em produçao;
  - O envio de emails deve acontecer em segundo plano (background job);
  - 

**Regras de Negocio**
  - O link enviado por email para resetar senha, deve expirar em 2h;
  - O usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualizaç~ao do perfil
  
**Requesitos Funcionais**

- O usuario deve poder atualizar seu nome,email e senha;

**Regras de Negocio**

- O usuario n~ao pode alterar  seus email para um email ja atualizado;
- Para atualizar sua senha, o usuario deve informar a senha antiga;
- Para atualizar sua senham o usuario precisa confirmar a nova senha;


# Painel do prestador
**Requesitos Funcionais**

- O usuario deve poder listar seus agendamentos de um dia especifico;
- O Prestador deve receber uma notificaçao sempre que houver um novo agendamento;
- O Prestador deve poder visualizar as notificaçoes nao lidas;


**Requesitos nao Funcionais**

 -  O agendamento do prestador no dia devem ser armazenado em cache;
 -  As notificaçoes do prestador devem ser armazenadas no MongoDB; 
 -  AS notificacoes do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Requesitos Funcionais**

- A notificaçao deve ter um status de lida ou nao-lida para que o prestador possa controlar;


# Agendamento de serviços

**Requesitos Funcionais**

- O usuario deve poder listar todos prestadores de serviços cadastrados;
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador;
- O usuario deve poder listar o horarios disponives em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um  prestador;


**Requesitos nao Funcionais**

- A listagem de prestadores deve ser armazenadas em cache;

**Requesitos Funcionais**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis entre 8H as 18H (Primeiro as 8H, ultimo as 17H);
- O usuario nao pode agendar em um horario ja ocupado;
- O usuario nao pode em horario que ja passou;
- O usuairo nao pode agender consigo mesmo;