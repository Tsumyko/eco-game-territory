# Éco-Game Territory

Jeu éducatif sur l'environnement et le recyclage situé dans le parc des Cévennes

## Description

Éco-Game Territory est un jeu en deux phases qui vise à sensibiliser aux enjeux environnementaux :

1. Tri'athlon : Un jeu de tri des déchets
2. Territoire : Une exploration du parc des Cévennes

## Installation

```bash
# Cloner le projet
git clone https://github.com/Tsumyko/eco-game-territory.git
cd eco-game-territory

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

## État d'Avancement

### Composants Terminés

#### Pages Principales
- [x] App.jsx - Structure principale de l'application
- [x] HomePage - Page d'accueil avec menu principal
- [x] GameMap - Carte interactive des Cévennes
- [x] InventoryPage - Gestion de l'inventaire des objets remarquables
- [x] ZoneGame - Page de jeu pour chaque zone
- [x] SettingsPage - Page des paramètres

#### Composants de Jeu
- [x] TriathlonGame - Jeu principal de tri des déchets
- [x] TrashItem - Éléments à trier
- [x] TrashBin - Poubelles de tri
- [x] BackpackContainer - Sac à dos pour objets remarquables

#### Composants UI Réutilisables
- [x] Button - Boutons personnalisés avec variantes et tailles
- [x] Card - Cartes pour l'affichage des informations
- [x] Modal - Fenêtres modales avec Radix UI
- [x] Toast - Notifications

#### Systèmes
- [x] Sauvegarde locale avec versionning
- [x] Sons et musique

### En Développement

#### Prochaines Étapes
1. Mettre en place les tests de base
2. Développer les pages manquantes (HighScores, Credits)
3. Intégrer les assets graphiques finaux
4. Optimisation des performances

## Structure du Projet

```
/src
  /components
    /ui          # Composants d'interface
    /game        # Composants spécifiques au jeu
    /pages       # Pages de l'application
  /assets
    /images
      /backgrounds # Images de fond (menu, zones)
      /items
        /trash     # Items à recycler
        /collectibles # Objets à collecter
      /ui        # Éléments d'interface
    /sounds      # Effets sonores et musiques
  /data         # Fichiers de configuration JSON
  /hooks        # Hooks personnalisés
  /utils        # Utilitaires (stockage, audio)
```

## Prérequis Visuels

### Backgrounds nécessaires
- Menu principal (3-4 variations)
- Carte des Cévennes avec les 5 zones :
  - Mont Lozère
  - Vallée Française
  - Mont Aigoual
  - Causses
  - Vallée Longue

### Items de jeu
1. Déchets recyclables (plusieurs variations par type) :
   - Plastique : 5-6 versions
   - Verre : 5-6 versions
   - Papier : 5-6 versions

2. Objets collectionnables :
   - Un objet unique par zone
   - Image objet + carte d'information

### Interface utilisateur
- Boutons menu (normal/hover/pressed)
- Icônes poubelles (par type)
- Interface sac à dos
- Score et progression