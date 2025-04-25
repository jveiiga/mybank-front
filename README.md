
# Front-End do Teste Técnico

Este projeto é o front-end do um sistema de movimentações. Ele permite que o usuários realize depósitos e retiradas, visualize o saldo e o extrato de suas contas bancárias.

## 📸 Visão Geral

O sistema é composto por uma interface que permite:
- Criar um usuário
- Criar diversas contas para esse usuário
- Selecionar um usuário.
- Selecionar uma conta vinculada ao usuário e visualizar o saldo atual.
- Realizar movimentações financeiras (depósitos e retiradas).
- Visualizar o extrato de movimentações de uma conta.

## 🚀 Tecnologias Utilizadas

- **React.js**: Biblioteca de JavaScript para a construção de interfaces de usuário.
- **Axios**: Cliente HTTP usado para comunicação com o backend.
- **CSS**: Para estilização personalizada.
- **Vite**: Ferramenta para desenvolvimento e build do projeto.
- **JavaScript (ES6)**: Linguagem principal para o desenvolvimento.
  
## 📂 Estrutura do Projeto

Abaixo está a organização do diretório `src`:

```
src
├── api
│   └── api.js            # Configuração do Axios para chamadas HTTP
├── assets
│   └── images            # Imagens utilizadas no projeto (logos, ícones, etc.)
├── components
│   ├── Footer.jsx         # Componente de rodapé
│   └── Header.jsx         # Componente de cabeçalho
├── pages
│   ├── Conta.jsx          # Página para visualização e gerenciamento de contas
│   ├── Movimentacao.jsx   # Página principal para movimentações bancárias
│   └── Pessoa.jsx         # Página para gerenciamento de usuários
├── styles
│   ├── App               # Estilização dos componentes globais (ex: App.css)
│   ├── components        # Estilização específica para componentes
│   ├── global            # Estilos globais e variáveis CSS
│   └── pages             # Estilos específicos para páginas
└── utils
    ├── Animations.css     # Animações globais utilizadas no projeto
    ├── App.jsx            # Componente principal do aplicativo
    └── main.jsx           # Ponto de entrada do React
```

---


## 📋 Funcionalidades

1. **Seleção de Usuário**:  
   Permite selecionar um usuário registrado no sistema. As contas associadas ao usuário serão carregadas automaticamente.

2. **Seleção de Conta e Visualização do Saldo**:  
   Permite selecionar uma conta específica e visualizar o saldo atual associado a ela.

3. **Movimentações Bancárias**:
   - **Depósitos**: Permite adicionar um valor ao saldo da conta.
   - **Retiradas**: Permite subtrair um valor do saldo da conta, respeitando as validações de saldo disponível.

4. **Visualização de Extrato**:
   - Exibe as movimentações de uma conta em formato tabular, com os valores negativos (retiradas) destacados em vermelho e os positivos (depósitos) em verde.
   - O extrato é atualizado automaticamente após cada movimentação.

## 🛠️ Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Configuração do Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/SENAI-SD/prova-java-junior-00933-2025-364.850.238-79.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd mybank-front
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse o sistema no navegador:
   ```
   http://localhost:5173
   ```

## 🔄 Fluxo de Uso

1. Para melhor usabilidade do sistema, inicie primeiro pelo Backend.
2. Acesse o sistema no navegador.
3. Cadatre um usuário.
4. Cadastre uma conta para esse usuário.
5. Selecione um usuário na lista.
6. Escolha uma conta vinculada ao usuário e visualize o saldo atual.
7. Realize uma movimentação (depósito ou retirada).
8. Veja o saldo e o extrato serem atualizados automaticamente.

## 📌 Notas Importantes

- O saldo exibido no `select` de contas será atualizado automaticamente após cada movimentação realizada.
- O backend deve estar configurado e rodando.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:
1. Crie um fork do projeto.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.



## 📞 Contato

Obrigado pela oportunidade, é sempre um prazer desenvolver e ter novos desafios. Isso foi o que deu para ser feito no periodo estipulado pelo teste.

---

Feito com ❤️ por [jveiiga](https://github.com/jveiiga).
