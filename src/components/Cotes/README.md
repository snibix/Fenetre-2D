# 🧮 Cotes (Dimensions)

Composant React utilisé avec `react-konva` pour afficher les **côtes de largeur et de hauteur** autour d'une ou plusieurs fenêtres ou zones rectangulaires. Affiche des flèches avec mesures (en mm) selon les options activées.

## ✨ Aperçu

- 📏 Flèches horizontales (largeur) affichées en bas de chaque zone.
- 📐 Flèches verticales (hauteur) affichées à gauche de chaque zone.
- ✅ Compatible avec plusieurs fenêtres (`windows[]`).
- 🎯 Personnalisation facile des offsets X/Y.

---

## 📦 Props

| Nom              | Type             | Requis | Par défaut | Description                                                                        |
| ---------------- | ---------------- | ------ | ---------- | ---------------------------------------------------------------------------------- |
| `windows`        | `WindowMetric[]` | ✅     | –          | Liste des fenêtres à mesurer (chaque élément contient `x`, `y`, `width`, `height`) |
| `showWidthCote`  | `boolean`        | ❌     | `true`     | Affiche ou masque les flèches de **largeur**                                       |
| `showHeightCote` | `boolean`        | ❌     | `true`     | Affiche ou masque les flèches de **hauteur**                                       |
| `offsetX`        | `number`         | ❌     | `20`       | Décalage horizontal des flèches de hauteur                                         |
| `offsetY`        | `number`         | ❌     | `20`       | Décalage vertical des flèches de largeur                                           |

---

## 🧱 Exemple d'utilisation

```tsx
import Cotes from "./Cotes";

<Cotes
  windows={[
    { x: 0, y: 0, width: 300, height: 500 },
    { x: 400, y: 0, width: 200, height: 400 },
  ]}
  showWidthCote={true}
  showHeightCote={true}
  offsetX={30}
  offsetY={25}
/>;
```
