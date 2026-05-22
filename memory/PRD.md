# ULPGL-Goma — Landing Page + CMS (PRD)

**Dernière mise à jour :** 22 Mai 2026 (itération 4)

## Énoncé original
> "voici un landing page, je voudrais que tu optimise les menus sur mobile et tablette, proposes les pages qui manquent entre autre les pages des facultés et domaines, implémente la recherche qui peut être un événement, une activité, une fac, une filière, ... puis ajoute un petit dashboard qui va me permettre de publier les articles, les événements, activités... crée deux groupes d'utilisateurs (publieur faculté + super-admin valideur). Newsletter, form contact côté front et backend en NodeJS-Express, Sequelize, MySQL."

## Stack
- **Frontend** : React 19 + TypeScript + Sass + Bootstrap + Framer Motion + Axios + React Toastify
- **Backend** : Node.js + Express + Sequelize + MariaDB
- **Auth** : JWT (bcryptjs, jsonwebtoken)
- **Mail** : SendGrid (`@sendgrid/mail`) — *configuration optionnelle*

## Architecture
```
/app
├── backend/                Node.js / Express / Sequelize / MySQL
│   ├── config/database.js  Connexion Sequelize
│   ├── models/index.js     User · Faculty · Filiere · Content · Newsletter · ContactMessage
│   ├── routes/{auth,contents,misc}.js
│   ├── middleware/auth.js  JWT requireAuth + requireRole
│   ├── utils/{seed,mailer}.js
│   └── server.js
└── frontend/               React TS (CRA)
    ├── src/contexts/AuthContext.tsx
    ├── src/pages/{Login,Dashboard,Faculties,FacultyDetail,Search,Articles,...}
    ├── src/components/{Header,Footer,Contactform,...}
    └── src/utils/api.ts    (axios + token JWT depuis localStorage)
```

## Personas
1. **Visiteur public** — Consulte facultés, articles, événements, contacte l'université, s'inscrit à la newsletter
2. **Publieur faculté** (role `faculty_publisher`) — Lié à une faculté ; soumet contenus en `pending`
3. **Super Admin** (role `super_admin`) — Valide ou refuse les contenus, gère utilisateurs/messages/newsletter

## Fonctionnalités implémentées

### ✅ Phase 1 — MVP livré
- **Header mobile/tablette** : hamburger menu fonctionnel < 992px, barre de recherche intégrée dans le menu mobile, top-bar empilable, recherche desktop dédiée
- **Pages Facultés** :
  - `/app/facultes` — Grille des 6 facultés ULPGL (Sciences & Technologies, Économiques & Gestion, Psycho & Éducation, Santé, Juridiques, Homme & Société)
  - `/app/facultes/:slug` — Détail faculté + filières + actualités liées + direction
- **Recherche unifiée** `/search?q=` — Cherche dans Articles + Événements + Activités + Facultés + Filières
- **Authentification JWT** : `/login` + AuthContext + token localStorage
- **Dashboard** `/dashboard` (6 onglets) :
  - Vue d'ensemble (stats : total, pending, published, rejected, newsletter, messages)
  - Articles / Événements / Activités (CRUD modal)
  - À valider (super-admin) — actions Approuver / Rejeter
  - Newsletter (super-admin) — liste des abonnés
  - Messages (super-admin) — messages reçus du formulaire contact
  - Utilisateurs (super-admin) — liste des comptes
- **Workflow de validation** : Publieur soumet → `pending` → Super-admin approve/reject → site public
- **Newsletter** : Footer → POST `/api/newsletter` → stockage BDD + email de bienvenue (SendGrid si configuré)
- **Formulaire contact** : `/app/contacts` → POST `/api/contact` → stockage BDD + email admin (si SendGrid)
- **Pages publiques connectées à l'API** : Articles, Article détail, Faculty detail

### ✅ Phase 2 — Itération 2 (21 Mai 2026)
- **Upload d'images Cloudinary** (signed upload via `/api/cloudinary/signature`) — composant `ImageUpload` (drag & drop, prévisualisation, suppression). Clés à fournir dans `.env` : `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`. Endpoint renvoie 503 si non configuré.
- **Éditeur WYSIWYG TipTap** (`RichEditor`) — H1/H2/H3/paragraphe, gras/italique/code, listes (à puces & numérotées), citation, liens, **insertion d'images directement via Cloudinary**, undo/redo. Remplace l'ancien textarea HTML brut dans le dashboard.
- **Création de comptes utilisateurs** — Bouton "Créer un publieur" dans l'onglet *Utilisateurs* du dashboard (super-admin uniquement). Modal avec nom, email, mot de passe, rôle (publieur faculté / super-admin), faculté associée. Branché sur `POST /api/auth/register`.

### ✅ Phase 3 — Itération 3 (22 Mai 2026)
- **Mot de passe oublié / réinitialisation** — Endpoints `POST /api/auth/forgot-password` (anti-leak : toujours 200) + `POST /api/auth/reset-password` (token 32-bytes hex, expiration 1h, marquage `usedAt` anti-replay). Modèle `PasswordResetToken`. Pages `/forgot-password` + `/reset-password?token=...`. Lien sur la page Login. Si SendGrid non configuré, le `devLink` est renvoyé en réponse pour usage développeur.
- **Dashboard sur layout dédié** — Route `/app/admin` avec `AdminLayout` (sidebar permanente à gauche + topbar minimaliste) **sans le Header/Footer du site public**. Sidebar responsive (drawer < 992px). `AdminDashboard` est désormais route-driven (`/app/admin`, `/app/admin/articles`, `/app/admin/schedules`, etc.). Lien "Voir le site" dans la sidebar pour retourner à la home.
- **TopNavigation mobile fonctionnelle** — Réécriture en simple `<ul>` flexbox (Bibliothèque / Metanoia / Kauta / Crèche). Sur mobile (<768px), liens en scroll horizontal lisses, scroll tactile activé.
- **Horaires cours & examens** — Nouveau modèle `Schedule` (type cours/examen, faculté, filière, promotion L1/L2/L3/M1/M2, année académique, semestre, dates début/fin, lieu, fichier joint via Cloudinary, description). CRUD `/api/schedules` avec workflow de validation (publisher → pending, admin → published, approve/reject). Onglet *Horaires* dans le dashboard. **Page publique** `/app/horaires` avec 3 filtres (type / faculté / promotion) et cartes détaillées avec téléchargement du document.

### ✅ Phase 4 — Itération 4 (22 Mai 2026)
- **Tout chargé depuis l'API** (plus de données statiques côté React) :
  - Section "Articles et dernières nouvelles" de la **home** → `GET /api/contents?limit=3`
  - Page publique **Articles** → API + **filtre par faculté** (sélecteur avec "Toutes les facultés" par défaut)
  - Page **Centres** + détail d'un centre → API (`/api/centers`, `/api/centers/slug/:slug`)
- **Centres de recherche — CRUD complet** (modèle calqué sur CREDDA) :
  - Champs : `title`, `slug`, `description`, `profile` (HTML), `coverImage`, `images[]`, `direction{name, role, email[], phone[]}`, `domaineInterventions[]`, `etudesRealisees[]`, `partenaires[]`, `contacts[]`
  - Stockage : colonnes TEXT en MariaDB + helpers `serializeCenter`/`deserializeCenter` pour gérer les arrays/objects en JSON
  - Workflow : publisher → pending, super-admin → published direct, approve/reject
  - Onglet **Centres** dans le dashboard admin (sidebar) avec modal complet incluant RichEditor pour le profil
  - 3 centres seedés : CREDDA, CRIPE, BERSAC
- **Layout des pages auth nettoyé** :
  - `/login`, `/forgot-password`, `/reset-password` sont désormais des pages **bare full-screen** (fond bleu dégradé)
  - PAS de Header/Footer du site public — clarifie le contexte "espace admin"
  - PAS de sidebar AdminLayout puisque l'utilisateur n'est pas encore connecté

### Tests
- Backend : 30 tests pytest, **100% passants**
- Frontend : Tous les flows critiques validés (login, dashboard, validation workflow, newsletter, contact, search, mobile menu)
- Fichier test backend : `/app/backend/tests/test_ulpgl_backend.py`

## Identifiants test (voir `/app/memory/test_credentials.md`)
- Admin : `admin@ulpgl.net` / `Admin@2026`
- Publieur : `publisher@ulpgl.net` / `Publisher@2026`

## Setup environnement (résumé)
- **MariaDB** : supervisor `mariadb`, db `ulpgl_db`, user `ulpgl`/`ulpgl_pass_2026`
- **Backend Node.js** : supervisor `nodebackend` → port 8001
- **Frontend React** : supervisor `frontend` → port 3000
- **Variables clés** : `/app/backend/.env` (DB, JWT, ADMIN_*, SENDGRID_*) — `/app/frontend/.env` (REACT_APP_BACKEND_URL)
- **SendGrid** : non configuré (clé vide). Newsletter/contact stockés en BDD; emails skipped gracieusement.

## Issues mineures (non bloquantes)
- `Hrseparator` rendu dans certains `<p>` → warning HTML invalide (LOW)
- 2 barres de recherche desktop visibles simultanément (mega-menu legacy) — UX à simplifier
- `sequelize.sync({ alter: true })` — OK dev, migrations à mettre en place pour prod

## Backlog / Améliorations futures
- **P1** — Bouton "Créer un publieur" dans onglet Utilisateurs du dashboard
- **P1** — Upload d'images (au lieu d'URL coverImage manuel) — intégration Cloudinary
- **P2** — Migrations Sequelize CLI pour prod
- **P2** — Mots de passe oubliés (forgot/reset password)
- **P2** — Pagination côté backend pour /api/contents
- **P2** — Editeur WYSIWYG (TipTap / Quill) à la place du textarea HTML
- **P2** — Analytics et statistiques (vues, etc.) sur dashboard
- **P3** — Multi-langue FR/EN

## API Endpoints
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST   | `/api/auth/login`           | public | Login |
| GET    | `/api/auth/me`              | jwt    | Profil |
| POST   | `/api/auth/register`        | admin  | Créer un compte |
| GET    | `/api/faculties`            | public | Liste facultés + filières |
| GET    | `/api/faculties/:slug`      | public | Détail |
| GET    | `/api/contents?type=&...`   | public | Articles/events/activities publiés |
| GET    | `/api/contents/slug/:slug`  | public | Détail contenu |
| GET    | `/api/contents/admin`       | jwt    | Liste pour le dashboard |
| POST   | `/api/contents`             | jwt    | Créer (publieur → pending, admin → published) |
| PUT    | `/api/contents/:id`         | jwt    | Modifier |
| DELETE | `/api/contents/:id`         | jwt    | Supprimer |
| POST   | `/api/contents/:id/approve` | admin  | Approuver |
| POST   | `/api/contents/:id/reject`  | admin  | Refuser |
| GET    | `/api/search?q=`            | public | Recherche unifiée |
| POST   | `/api/newsletter`           | public | S'abonner |
| GET    | `/api/newsletter`           | admin  | Liste abonnés |
| POST   | `/api/contact`              | public | Envoyer message |
| GET    | `/api/contact`              | admin  | Liste messages |
| GET    | `/api/dashboard/stats`      | jwt    | Stats |
| GET    | `/api/users`                | admin  | Liste utilisateurs |
| PUT    | `/api/users/:id`            | admin  | Mettre à jour |
