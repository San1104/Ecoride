# Ecoride
🔹 1. Vérifier que Git est bien installé

Ouvre Git Bash (ou CMD/PowerShell si tu préfères) et tape :

git --version


👉 Tu dois voir un message du genre :

git version 2.51.0.windows.1

🔹 2. Configurer ton identité

C’est la première chose à faire pour que tes commits soient correctement attribués à toi :

git config --global user.name "TonNom"
git config --global user.email "ton.email@example.com"


Vérifie ta config :

git config --list

🔹 3. Cloner un dépôt GitHub

Va dans le dossier où tu veux mettre ton projet. Exemple :

cd /c/xampp/htdocs


Puis clone ton dépôt :

git clone https://github.com/ton-utilisateur/ton-repo.git


👉 Ça va créer un dossier ton-repo avec tous les fichiers.

🔹 4. Travailler dans ton dépôt

Entre dans ton projet :

cd ton-repo


Vérifie l’état :

git status

🔹 5. Sauvegarder tes changements

Quand tu modifies ou ajoutes des fichiers :

Ajouter les fichiers au suivi

git add .


(le . ajoute tout, sinon mets un fichier précis comme git add index.html)

Créer un commit

git commit -m "Mon premier commit"

🔹 6. Envoyer tes changements sur GitHub
git push


⚠️ La première fois, il te demandera peut-être ton identifiant/mot de passe ou ton token GitHub (ou ta clé SSH si tu configures SSH).

🔹 7. Récupérer les dernières modifications de GitHub

Si quelqu’un d’autre a modifié le projet :

git pull


👉 En résumé, tes commandes principales seront :

git clone → pour récupérer un projet

git status → pour voir l’état

git add → pour préparer les fichiers

git commit → pour sauvegarder localement

git push → pour envoyer sur GitHub

git pull → pour récupérer depuis GitHub

Tu veux que je te fasse un exemple concret en live : créer un dépôt GitHub vide → le cloner → faire une modif → push ?

Vous avez dit :
rédige moi un readme qui explique comment j'ai déployer mon app en locale :
j'ai créer un repertoire github "Ecoride"
je l'ai clonner avec git clone sur mon dossier htdocs de Xamp sur mon pc,
puis j'active Apache et MySQL
et j'ouvre dans mon navigateur mon localhost, je séléctionne mon dossier Ecoride et je peux visualiser mon projet déployer en local
ChatGPT a dit :

Voici un README.md clair et structuré que tu peux mettre directement dans ton dépôt Ecoride 👇

# 🚲 Ecoride  

## 📌 Déploiement en local avec XAMPP

### 1. Cloner le projet
Commencez par cloner le dépôt GitHub dans le dossier **htdocs** de XAMPP :  
```bash
cd C:/xampp/htdocs
git clone https://github.com/<ton-utilisateur>/Ecoride.git

2. Lancer XAMPP

Démarrez XAMPP Control Panel

Activez les modules Apache et MySQL

3. Accéder au projet

Ouvrez votre navigateur et allez sur :

http://localhost/Ecoride


👉 Vous pouvez maintenant visualiser l’application Ecoride déployée en local.

🛠️ Prérequis

XAMPP
 installé sur votre machine

Git
 installé pour cloner le dépôt

🚀 Résumé du workflow

Cloner le dépôt dans htdocs

Lancer Apache et MySQL avec XAMPP

Accéder à http://localhost/Ecoride
