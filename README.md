# 🪟 Fenêtre 2D - Configurateur sur mesure

Un configurateur de fenêtres interactif développé pour répondre aux besoins spécifiques d'un client. Cette application permet de concevoir et visualiser des fenêtres personnalisées en temps réel.

## 🎯 Objectif du projet

Ce projet a été développé pour un besoin client spécifique : permettre la création de fenêtres sur mesure avec une interface intuitive et une prévisualisation en temps réel. L'outil offre une grande flexibilité dans la personnalisation des dimensions, styles et options de fenêtres.

## ✨ Fonctionnalités

- **Configurateur interactif** : Ajustement en temps réel des dimensions et propriétés
- **Types de fenêtres** : Support des fenêtres normales (carrées) et cintrées
- **Personnalisation complète** :
  - Dimensions (largeur/hauteur)
  - Couleurs (bordure, vitre)
  - Options de soubassement (avec ou sans vitrage)
  - Petits bois configurables
  - Traverses personnalisables
  - Sens d'ouverture (horizontal/vertical)
- **Cotation automatique** : Affichage des dimensions sur le dessin
- **Prévisualisation en temps réel** : Rendu graphique instantané avec Konva.js

## 🛠️ Technologies utilisées

- **React** - Framework JavaScript pour l'interface utilisateur
- **TypeScript** - Typage statique pour plus de robustesse
- **Konva.js** - Bibliothèque 2D pour le rendu graphique haute performance
- **Bootstrap** - Framework CSS pour le design responsive
- **Vite** - Outil de build moderne et rapide

## 🚀 Démo en ligne

[**🔗 Voir la démo**](https://snibix.github.io/Fenetre-2D/)

## 💻 Installation et développement

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/snibix/Fenetre-2D.git

# Naviguer dans le dossier
cd Fenetre-2D

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:5173 dans votre navigateur
```

### Build de production
```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── ArchedWindow/     # Composant fenêtre cintrée
│   └── Window/           # Composant fenêtre normale
├── App.tsx               # Composant principal avec le configurateur
├── main.tsx             # Point d'entrée de l'application
└── ...
```
## 📝 Utilisation

1. **Sélectionner le type de fenêtre** (normale ou cintrée)
2. **Ajuster les dimensions** selon vos besoins
3. **Personnaliser l'apparence** (couleurs, bordures)
4. **Configurer les options** (soubassement, petits bois, traverses)
5. **Choisir le sens d'ouverture** si nécessaire
6. **Visualiser le résultat** en temps réel dans le canvas

## 🤝 Contribution

Ce projet a été développé pour un besoin client spécifique. Les contributions sont les bienvenues pour améliorer les fonctionnalités existantes.
