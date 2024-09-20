# ControlAccess

Bem-vindo ao **ControlAccess**, um sistema centralizado projetado para gerenciar usuários e suas permissões de acesso em múltiplos sistemas dentro de uma empresa. Este projeto adota uma abordagem de microserviços, proporcionando uma administração eficiente e organizada das informações dos usuários, além de facilitar a atribuição de acessos.

## 🚀 Sobre o Projeto

O **ControlAccess** serve como uma solução robusta para o gerenciamento de usuários, permitindo que empresas definam e controlem quem pode acessar quais sistemas. O sistema não apenas armazena informações essenciais, como CPF e horário de almoço, mas também organiza usuários em grupos, permitindo uma gestão simplificada de permissões em massa.

### Objetivos
- Centralizar a gestão de usuários e suas permissões.
- Facilitar a supervisão e hierarquia de acesso, permitindo a atribuição de supervisores a usuários.
- Integrar com outros sistemas para autenticação centralizada.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Laravel
- **Frontend**: React
- **Banco de Dados**: MySQL

Essas tecnologias foram escolhidas por suas robustez e escalabilidade, permitindo que o **ControlAccess** atenda a uma variedade de necessidades empresariais.

## 🎯 Funcionalidades

- **Gerenciamento de Usuários**: 
  - Criação, edição e exclusão de usuários de forma intuitiva.
  - Armazenamento de informações críticas, como CPF e horários de almoço.

- **Controle de Acesso**:
  - Atribuição de diferentes níveis de acesso a cada usuário, garantindo que apenas usuários autorizados possam acessar sistemas específicos.
  - Organização de usuários em grupos, facilitando a gestão de permissões em larga escala.

- **Supervisão de Usuários**:
  - Atribuição de um ou mais supervisores a um usuário, criando uma hierarquia clara de gestão.

- **Integração com Outros Sistemas**:
  - O **ControlAccess** foi desenvolvido para funcionar como um ponto central de autenticação, permitindo que outros sistemas se conectem e verifiquem as permissões dos usuários.

## 🔍 Revisão de Código

Atualmente, o código do sistema está em processo de revisão para refatoração. Este passo é essencial para melhorar a legibilidade e organização do código, garantindo que o projeto permaneça sustentável e fácil de manter a longo prazo.

## 📦 Instalação e Configuração

Para rodar o **ControlAccess** em sua máquina local, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/controlaccess.git

2. Clone o repositório:
    cd controlaccess

3. Instale as dependências do backend:
    composer install

4. Instale as dependências do frontend:
    npm install

5. Crie um arquivo .env baseado no .env.example e configure suas credenciais de banco de dados.

6. Execute as migrações para configurar o banco de dados:
    php artisan migrate

7. Inicie o servidor:
    php artisan serve

8. Em outro terminal, inicie o servidor do React:
    npm start

🤝 Contribuições
Contribuições são sempre bem-vindas! Se você deseja colaborar ou melhorar o projeto, sinta-se à vontade para abrir um pull request ou relatar problemas.

📧 Contato
Para mais informações, você pode entrar em contato:

E-mail: jogadordaverdade@gmail.com
LinkedIn: Jorge Miguel
GitHub: Jorgemiguelaviles
