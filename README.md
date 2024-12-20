# Éco-Game Territory

Un jeu éducatif sur l'environnement et le recyclage dans le parc des Cévennes.

## Structure du Projet

```
/src
  /components        # Composants React réutilisables
  /pages            # Pages principales de l'application
  /assets
    /images
      /backgrounds  # Fonds d'écran des différentes zones
      /items       # Items à recycler et objets remarquables
      /ui          # Éléments d'interface (boutons, icônes)
    /sounds        # Effets sonores et musiques
  /data           # Données JSON pour les items et configurations
  /hooks          # Custom hooks React
  /utils          # Fonctions utilitaires
```

## Installation

1. Cloner le repository
2. Installer les dépendances : `npm install`
3. Lancer le serveur de développement : `npm run dev`

## Assets à Intégrer

### Backgrounds
- Page d'accueil (plusieurs variations)
- Carte des Cévennes
- Fonds pour chaque zone de jeu (5 zones)

### Items à Recycler
- Plastique (plusieurs variations)
- Verre (plusieurs variations)
- Papier (plusieurs variations)

### Items Remarquables
- Liste des objets uniques à découvrir
- Description et histoire pour chaque objet

### Interface
- Boutons personnalisés
- Éléments de menu
- Icônes des poubelles
- Interface du sac à dos

## Configuration des Items

Les items sont définis dans `/src/data/items.json` avec la structure suivante :

```json
{
  "recyclable": [
    {
      "id": "plastic-1",
      "type": "plastique",
      "image": "/assets/items/plastic-1.png",
      "variants": ["plastic-1a", "plastic-1b"]
    }
  ],
  "remarkable": [
    {
      "id": "artifact-1",
      "name": "Nom de l'objet",
      "description": "Description de l'objet",
      "image": "/assets/items/remarkable/artifact-1.png",
      "location": "zone-1"
    }
  ]
}