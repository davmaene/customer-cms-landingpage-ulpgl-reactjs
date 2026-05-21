# ULPGL-Goma — Landing Page + CMS (PRD)

**Dernière mise à jour :** 21 Mai 2026

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
