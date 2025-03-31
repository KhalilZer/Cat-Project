# 📱 Fullstack Node.js (Sequelize MySQL) & Vue.js (Tailwind CSS) Project

This is a full-stack project using **Node.js** with **Sequelize** for the backend and **Vue.js** with **Tailwind CSS** for the frontend.

The database used is **MySQL**, and the database name is **cat_db**.

---

## 🚀 Getting Started

### 📌 Prerequisites
Before starting, make sure your environment is set up with **Node.js**, **Vue.js**, **MySQL**, and **Docker** installed.

---

## 💻 Backend - Node.js & Sequelize with MySQL

### 1️⃣ Start the Backend with Docker
The backend is dockerized, and you can start it by running the following script in the **backend** directory:

```sh
./docker-build.sh
```

This script starts the Node.js backend with Sequelize and connects to the MySQL database called **cat_db**.

If Docker does not work properly, try running the following commands manually:
```sh
npm install
npm run dev
```

### 2️⃣ API Routes

Here are the available routes to interact with the backend API:

#### **Get all tags:**
```http
GET http://localhost:3000/api/v1/tags
```

#### **Get tags with filters for pagination:**
```http
GET http://localhost:3000/api/v1/cats/filter?tag=orange&omit=0&total=10
```
This route adds a new entry to the database with pagination filters.

#### **Get tags matching a search string:**
```http
GET http://localhost:3000/api/v1/cats/match?string=orange
```

#### **Get popular requests:**
```http
GET http://localhost:3000/api/v1/popular
```

#### **Get popular tags:**
```http
GET http://localhost:3000/api/v1/popular-tags
```

---

## 🎨 Frontend - Vue.js with Tailwind CSS

### 1️⃣ Start the Frontend with Docker

The frontend is also dockerized, and you can start it by running the following script in the **frontend** directory:

```sh
./script.sh
```

This script starts the frontend application using **Vue.js** and **Tailwind CSS**.

If Docker does not work properly, try running the following commands manually:
```sh
npm install
npm run dev
```

### 2️⃣ Customization & Development

You can modify the Vue.js components in the `src/` directory to adjust the application according to your needs. Styling is managed with **Tailwind CSS**.

---

## 🛠 Useful Commands

| Command                           | Description                              |
|-------------------------------------|------------------------------------------|
| `./docker-build.sh`                 | Start the backend with Docker          |
| `./script.sh`                       | Start the frontend with Docker         |
| `npm run serve` / `yarn serve`      | Start the Vue.js frontend locally     |
| `npx sequelize-cli db:migrate`      | Run Sequelize migrations              |

---

## 📝 License

This project is licensed under the [MIT](LICENSE) license.

Happy coding! 🚀







# 📱 Projeto Fullstack Node.js (Sequelize MySQL) & Vue.js (Tailwind CSS)

Este é um projeto full-stack usando **Node.js** com **Sequelize** para o backend e **Vue.js** com **Tailwind CSS** para o frontend.

O banco de dados utilizado é **MySQL**, e o nome do banco de dados é **cat_db**.

---

## 🚀 Iniciando

### 📌 Pré-requisitos
Antes de começar, certifique-se de que seu ambiente está configurado com **Node.js**, **Vue.js**, **MySQL** e **Docker** instalados.

---

## 💻 Backend - Node.js & Sequelize com MySQL

### 1️⃣ Iniciar o Backend com Docker
O backend está dockerizado e pode ser iniciado executando o seguinte script no diretório **backend**:

```sh
./docker-build.sh
```

Este script inicia o backend Node.js com Sequelize e conecta ao banco de dados MySQL chamado **cat_db**.

Se o Docker não funcionar corretamente, tente rodar os seguintes comandos manualmente:
```sh
npm install
npm run dev
```

### 2️⃣ Rotas da API

Aqui estão as rotas disponíveis para interagir com a API do backend:

#### **Obter todas as tags:**
```http
GET http://localhost:3000/api/v1/tags
```

#### **Obter tags com filtros para paginação:**
```http
GET http://localhost:3000/api/v1/cats/filter?tag=orange&omit=0&total=10
```
Esta rota adiciona uma nova entrada ao banco de dados com filtros de paginação.

#### **Obter tags que correspondem a uma string de pesquisa:**
```http
GET http://localhost:3000/api/v1/cats/match?string=orange
```

#### **Obter requisições populares:**
```http
GET http://localhost:3000/api/v1/popular
```

#### **Obter tags populares:**
```http
GET http://localhost:3000/api/v1/popular-tags
```

---

## 🎨 Frontend - Vue.js com Tailwind CSS

### 1️⃣ Iniciar o Frontend com Docker

O frontend também está dockerizado e pode ser iniciado executando o seguinte script no diretório **frontend**:

```sh
./script.sh
```

Este script inicia a aplicação frontend usando **Vue.js** e **Tailwind CSS**.

Se o Docker não funcionar corretamente, tente rodar os seguintes comandos manualmente:
```sh
npm install
npm run dev
```

### 2️⃣ Personalização & Desenvolvimento

Você pode modificar os componentes Vue.js no diretório `src/` para ajustar a aplicação conforme suas necessidades. O estilo é gerenciado com **Tailwind CSS**.

---

## 🛠 Comandos Úteis

| Comando                           | Descrição                              |
|-------------------------------------|------------------------------------------|
| `./docker-build.sh`                 | Iniciar o backend com Docker          |
| `./script.sh`                       | Iniciar o frontend com Docker         |
| `npm run serve` / `yarn serve`      | Iniciar o frontend Vue.js localmente  |
| `npx sequelize-cli db:migrate`      | Executar migrações do Sequelize      |

---

## 📝 Licença

Este projeto está licenciado sob a [MIT](LICENSE).

Boa programação! 🚀

---

