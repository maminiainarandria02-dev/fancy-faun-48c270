# Suivi de chantier et installation

Application web installable (PWA) pour suivre des chantiers solaires, les interventions SAV, les notes, les photos et exporter des PDF.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Application complète (interface + logique) |
| `sw.js` | Service worker : fonctionnement hors ligne et cache |
| `manifest.json` | Informations d'installation (nom, icônes, couleurs) |
| `supabase.js` | Bibliothèque Supabase (synchronisation et comptes) |
| `jspdf.umd.min.js` | Bibliothèque d'export PDF |
| `icon-*.png` | Icônes de l'application |
| `*.woff2` | Polices (Inter, Space Grotesk, JetBrains Mono) |

## Mettre en ligne avec GitHub Pages

1. Dans le dépôt : **Settings** → **Pages**.
2. **Source** : *Deploy from a branch*, branche `main`, dossier `/ (root)`, puis **Save**.
3. Après 1 à 2 minutes, l'adresse apparaît : `https://VOTRE-NOM.github.io/NOM-DU-DEPOT/`.
4. Ouvrir cette adresse sur le téléphone, puis « Ajouter à l'écran d'accueil » (ou « Installer l'application »).

## Mettre à jour l'application

À chaque modification, changer le numéro de cache dans `sw.js` (ligne `const CACHE = 'chantiers-vXX'`), sinon les téléphones gardent l'ancienne version.

## Sécurité

- `index.html` contient l'adresse du projet Supabase et une clé **publique** (`sb_publishable_…`). Elle est faite pour être visible, mais la protection des données repose sur les règles **Row Level Security (RLS)** de Supabase : à vérifier dans le tableau de bord Supabase.
- Ne jamais mettre dans ce dépôt une clé `service_role` ni un mot de passe.

## Test en local

Ouvrir un terminal dans le dossier et lancer : `python3 -m http.server 8000`, puis aller sur `http://localhost:8000`. (Le service worker ne fonctionne pas en ouvrant le fichier directement.)
