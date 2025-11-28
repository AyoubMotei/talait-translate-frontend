# TalAIt Translate - Frontend

> Interface web sécurisée pour la plateforme de traduction FR ⇄ EN de TalAIt

##  Vue d'ensemble

Interface frontend  (HTML/CSS/JavaScript) pour la plateforme de traduction sécurisée de TalAIt. Cette application permet aux employés authentifiés de traduire du texte entre le français et l'anglais via une API backend FastAPI intégrant Hugging Face.

##  Fonctionnalités

- **Authentification sécurisée** : Inscription et connexion avec gestion de tokens JWT
- **Traduction bidirectionnelle** : Support FR → EN et EN → FR
- **Interface intuitive** : Design moderne et responsive
- **Gestion de sessions** : Stockage sécurisé du token d'authentification
- **Feedback en temps réel** : Statuts de chargement et messages d'erreur clairs

##  Structure du projet

```
frontend/
├─ index.html          # Page d'accueil
├─ login.html          # Page de connexion
├─ signup.html         # Page d'inscription
├─ translate.html      # Interface de traduction
├─ css/
│  └─ style.css        # Styles globaux
└─ js/
   ├─ auth.js          # Logique d'authentification
   └─ translate.js     # Logique de traduction
```

##  Installation et démarrage

### Prérequis

- Backend FastAPI fonctionnel sur `http://localhost:8000`
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur HTTP local 

### Méthode 1 : Serveur HTTP Python

```bash
# Dans le dossier frontend/
python -m http.server 3000
```

Accéder à l'application : `http://localhost:3000`

### Méthode 2 : Live Server (VS Code)

1. Installer l'extension "Live Server" dans VS Code
2. Clic droit sur `index.html` → "Open with Live Server"

### Méthode 3 : Docker (avec docker-compose)

```bash
# Depuis la racine du projet
docker-compose up frontend
```

## Configuration

### URL du Backend

Modifier la constante dans les fichiers JavaScript :

**`js/auth.js`** :
```javascript
const BACKEND_BASE_URL = "http://localhost:8000";
```

**`js/translate.js`** :
```javascript
const BACKEND_BASE_URL = "http://localhost:8000";
```

Pour un déploiement en production, remplacer par l'URL de votre API backend.

##  Guide d'utilisation

### 1. Inscription

1. Accéder à la page d'inscription via `signup.html`
2. Créer un compte avec un nom d'utilisateur et un mot de passe (min. 6 caractères)
3. Redirection automatique vers la page de connexion

### 2. Connexion

1. Se connecter avec vos identifiants sur `login.html`
2. Le token JWT est stocké automatiquement dans `localStorage`
3. Redirection vers l'interface de traduction

### 3. Traduction

1. Sur `translate.html`, saisir le texte à traduire (max. 4000 caractères)
2. Sélectionner la langue source (FR/EN)
3. Sélectionner la langue cible (EN/FR)
4. Cliquer sur "Traduire"
5. Le résultat s'affiche dans la zone prévue

### 4. Déconnexion

Cliquer sur "Déconnexion" pour supprimer le token et retourner à la page de connexion.

##  Sécurité

- **Authentification JWT** : Toutes les requêtes de traduction nécessitent un token valide
- **Gestion automatique** : Redirection vers login si le token est invalide ou expiré
- **Stockage local** : Token stocké dans `localStorage` (clé : `talait_token`)
- **Headers sécurisés** : Token transmis via header `token` dans les requêtes

##  Design

- **Framework CSS** : Styles CSS personnalisés (variables CSS)
- **Responsive** : Compatible mobile, tablette et desktop
- **Couleurs principales** :
  - Accent : `#4b35c3` (violet)
  - Background : `#f7f8fb` (gris clair)
  - Card : `#ffffff` (blanc)
  - Muted : `#6b7280` (gris)
  - Danger : `#d9534f` (rouge)

##  Personnalisation

### Modifier les styles

Éditer `css/style.css` et ajuster les variables CSS dans `:root` :

```css
:root {
  --bg: #f7f8fb;
  --card: #ffffff;
  --accent: #4b35c3;
  --muted: #6b7280;
  --danger: #d9534f;
  --radius: 8px;
  --maxw: 900px;
}
```
##  Dépannage

### Erreur CORS

Si vous rencontrez des erreurs CORS :
- Vérifier que le backend FastAPI autorise les requêtes depuis votre origine
- Configurer les CORS dans FastAPI avec `CORSMiddleware`

### Token invalide

Si le message "Token invalide ou expiré" s'affiche :
- Se reconnecter via `login.html`
- Vérifier que le backend génère correctement les JWT
- Vérifier la configuration du secret JWT côté backend

### Backend inaccessible

Message : "Erreur réseau — vérifie le backend"
- Vérifier que le backend est démarré sur `http://localhost:8000`
- Tester l'API avec `curl http://localhost:8000/docs`
- Vérifier les logs du backend

##  API Endpoints utilisés

| Endpoint | Méthode | Description | Auth requise |
|----------|---------|-------------|--------------|
| `/register` | POST | Inscription d'un nouvel utilisateur | Non |
| `/login` | POST | Connexion et récupération du JWT | Non |
| `/translate` | POST | Traduction de texte | Oui (JWT) |

### Exemple de requête `/translate`

```javascript
{
  "text": "Bonjour le monde",
  "source_language": "fr",
  "target_language": "en"
}
```

### Réponse attendue

```javascript
{
  "translated_text": "Hello world"
}
```

## Auteur

**Ayoub Motei**  
