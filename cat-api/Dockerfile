# Étape 1 : Utiliser l'image officielle de Node.js comme base
FROM node:23.9.0

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3 : Copier package.json et package-lock.json (ou yarn.lock) dans le conteneur
COPY package*.json ./

# Étape 4 : Installer les dépendances du projet (y compris nodemon qui est en devDependencies)
RUN npm install

# Étape 5 : Copier tout le code source dans le conteneur
COPY . .

# Étape 6 : Exposer le port sur lequel le serveur écoute
EXPOSE 3000

# Étape 7 : Démarrer l'application avec nodemon (en mode développement)
CMD ["npm", "run", "dev"]
