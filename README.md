# 💻 Présence App - Frontend (Next.js)

## 📖 Description

Ce projet représente la partie **frontend** de l'application **Présence App**, une interface moderne et intuitive développée avec **Next.js** et **Tailwind CSS**.
L’objectif est de permettre aux utilisateurs et aux administrateurs de gérer les présences, sessions et statistiques en se connectant au backend Spring Boot.

---

## ⚙️ Technologies utilisées

* Next.js 14+
* React 18+
* Tailwind CSS
* Axios
* Zustand (gestion d’état)
* TypeScript

---

## 🚀 Installation et exécution

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/TON_UTILISATEUR/presence-frontend.git
cd presence-frontend
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Configurer l’API backend

Crée un fichier `.env.local` à la racine du projet :

```bash
NEXT_PUBLIC_API_URL=http://localhost:9090/api
```

### 4️⃣ Lancer le serveur de développement

```bash
npm run dev
```

L’application sera accessible sur :
👉 [http://localhost:3000](http://localhost:3000)

---

## ✨ Fonctionnalités principales

* 🔐 Authentification (Login / Register)
* 🧑‍💼 Espace **Admin** : gestion des utilisateurs, sessions et statistiques
* 👤 Espace **Utilisateur** : profil, historique et suivi des présences
* 📊 Dashboard dynamique et moderne
* 📱 Interface responsive (adaptée mobile & desktop)

---

## 🔗 Backend associé

👉 [Presence Backend (Spring Boot)](https://github.com/Belghieti/presence-app.git)
