# 🪟 WindowArc (Fenêtre avec Arc)

Composant React utilisant `react-konva` pour afficher une **fenêtre avec arc supérieur**, composée d’un demi-cercle et d’une base rectangulaire.

---

## ✨ Aperçu

- 🌀 Arc supérieur semi-circulaire (180°)
- ⬛ Base rectangulaire en bas de l'arc
- 🎨 Couleurs de bord et de remplissage personnalisables
- 📐 Calcul dynamique basé sur la largeur et la marge

---

## 📦 Props

| Nom           | Type     | Requis | Par défaut | Description                                                |
| ------------- | -------- | ------ | ---------- | ---------------------------------------------------------- |
| `width`       | `number` | ❌     | `200`      | Largeur totale de la fenêtre (l’arc et la base)            |
| `positionX`   | `number` | ❌     | `550`      | Position X du coin supérieur gauche de la base             |
| `positionY`   | `number` | ❌     | `250`      | Position Y du haut de l'arc (centre du rayon)              |
| `margin`      | `number` | ❌     | `10`       | Épaisseur de la bordure entre l’arc extérieur et intérieur |
| `borderColor` | `string` | ❌     | `"white"`  | Couleur de la bordure et de la base rectangulaire          |

---

## 🧱 Exemple d'utilisation

```tsx
import WindowArc from "./WindowArc";

<WindowArc
  width={300}
  positionX={400}
  positionY={200}
  margin={15}
  borderColor="white"
/>;
```
