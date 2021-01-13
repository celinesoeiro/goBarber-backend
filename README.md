# GoBarber Back-end

# Funcionalidades

### Recuperação de senha ###
**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar MailTrap para testar envios de email em ambiente dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emmails deve acontecer em segundo plano (background job);

**Regras de Negócio**

- O link enviado por email para resetar senha deve expirar em 2h;
- O usuário precisar confirmar a nova senha ao resetar a antiga;

### Atualização do perfil ###
**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha;

**Requisitos Não Funcionais**

**Regras de Negócio**

- O usuário não pode alterar seu email já utilizado;
- Para atualizar sua senha o usuário deve informar sua senha antiga;
- Para atualizar sua senha o usuário precisa confirmar a nova senha;

### Painel do prestador ###
**Requisitos Funcionais**

- O usuário deve poder listar seus agendamento de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- AS notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negócio**

- A notificação deve ter um status de lida ou não lida para que prestador possa controlar;

### Agendamento de serviços ###
**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos 1 horário disponível de um prestador específico;
- O usuário deve poder listar os horários disponíveis de um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponível entre 8h às 18h (primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

