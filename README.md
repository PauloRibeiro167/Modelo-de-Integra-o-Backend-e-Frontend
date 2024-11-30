# Modelo-de-Integra-o-Backend-e-Frontend
Este repositório serve como modelo para iniciar e gerenciar projetos React com backend e frontend separados de forma integrada e simplificada. Ele foi criado para resolver os desafios de gerenciar projetos separados, permitindo que ambos sejam iniciados simultaneamente com um único comando.


# Modelo de Integração Backend e Frontend  

Este repositório serve como modelo para iniciar e gerenciar projetos React com backend e frontend de forma integrada e simplificada. Ele foi criado para resolver os desafios de gerenciar projetos separados, permitindo que ambos sejam iniciados simultaneamente com um único comando.  

## 📦 Instalação das Dependências  

Para instalar todas as dependências (root, Frontend e Backend) de uma só vez, execute:  
```sh
npm run install:all
```

### Instalação Individual

**Root:**
```sh
npm run install:root
```

**Frontend:**
```sh
cd Frontend
npm install
```

**Backend:**
```sh
cd Backend
npm install
```

## 🚀 Iniciando o Projeto

**Iniciar Backend e Frontend Simultaneamente:**
```sh
npm run dev
```

**Iniciar o Frontend Individualmente:**
```sh
cd Frontend
npm run dev
```

**Iniciar o Backend Individualmente:**
```sh
cd Backend
npm run dev
```

## 🛠️ Build do Projeto

Para criar a build do frontend:
```sh
npm run build
```

## 🌐 Iniciar o Backend em Produção

Para iniciar o backend em modo de produção:
```sh
npm start
```
Isso iniciará o servidor backend usando o arquivo `Backend/server.mjs`.