# 🏛️ ArchedWindow (Fenêtre cintrée)

Composant React basé sur [`react-konva`](https://konvajs.org/docs/react/) pour afficher une **fenêtre cintrée** (arc en haut, base droite), avec contour extérieur et vitrage intérieur personnalisables. Il prend aussi en charge les **ouvertures**, les **petits bois**, les **traverses**, les **soubassements**, et les **cotes dimensionnelles**.

---

## ✨ Aperçu

- 🌀 Dessin vectoriel d'une fenêtre avec une **forme arquée** réaliste
- 🎨 Personnalisation des **couleurs**, **épaisseurs**, **marges**, **arcs**
- 🧩 Intégration simple dans une scène Konva (`Stage`, `Layer`, etc.)
- 📐 Position configurable avec `windowBorderX` / `windowBorderY`
- 🚪 Affichage d’**ouvertures** gauche/droite ou haut/bas
- 🪟 Ajout de **petits bois** (barreaux décoratifs)
- 🧱 Support d’un **soubassement** plein ou vitré
- 📏 Affichage optionnel des **cotes** de hauteur/largeur

---

## 📦 Props

| Nom                | Type     | Requis | Par défaut  | Description                                    |
| ------------------ | -------- | ------ | ----------- | ---------------------------------------------- |
| `windowWidth`      | `number` | ✅     | –           | Largeur totale de la fenêtre (en pixels)       |
| `windowHeight`     | `number` | ✅     | –           | Hauteur totale de la fenêtre (en pixels)       |
| `borderColor`      | `string` | ❌     | `"white"`   | Couleur de remplissage du cadre extérieur      |
| `strokeColor`      | `string` | ❌     | `"black"`   | Couleur du trait du cadre extérieur            |
| `strokeWidth`      | `number` | ❌     | `2`         | Épaisseur du contour principal                 |
| `innerStrokeColor` | `string` | ❌     | `"black"`   | Couleur du contour de la vitre intérieure      |
| `innerFillColor`   | `string` | ❌     | `"#cceeff"` | Couleur de remplissage de la vitre intérieure  |
| `innerMargin`      | `number` | ❌     | `8`         | Marge entre le contour extérieur et le vitrage |
| `windowBorderX`    | `number` | ❌     | `100`       | Position horizontale (X) de la fenêtre         |
| `windowBorderY`    | `number` | ❌     | `100`       | Position verticale (Y) de la fenêtre           |

### 🧭 Ouvertures

| Nom                          | Type                  | Requis | Par défaut  | Description                                       |
| ---------------------------- | --------------------- | ------ | ----------- | ------------------------------------------------- |
| `horizontalOpeningDirection` | `"left"` \| `"right"` | ❌     | `undefined` | Affiche une ouverture horizontale (gauche/droite) |
| `verticalOpeningDirection`   | `"up"` \| `"down"`    | ❌     | `undefined` | Affiche une ouverture verticale (haut/bas)        |

### 🧱 Soubassement

| Nom                | Type      | Requis | Par défaut | Description                                  |
| ------------------ | --------- | ------ | ---------- | -------------------------------------------- |
| `hasBase`          | `boolean` | ❌     | `false`    | Active l'affichage du soubassement           |
| `hasBaseWindow`    | `boolean` | ❌     | `false`    | Affiche une vitre dans le soubassement       |
| `baseWindowMargin` | `number`  | ❌     | `10`       | Marge intérieure de la vitre du soubassement |
| `baseHeight`       | `number`  | ❌     | `40`       | Hauteur du soubassement                      |
| `baseMargin`       | `number`  | ❌     | `10`       | Marge autour du soubassement                 |
| `baseColor`        | `string`  | ❌     | `"gray"`   | Couleur de fond du soubassement              |

### 🪵 Petits bois

| Nom          | Type      | Requis | Par défaut | Description                        |
| ------------ | --------- | ------ | ---------- | ---------------------------------- |
| `hasSill`    | `boolean` | ❌     | `false`    | Active les petits bois             |
| `sillCountX` | `number`  | ❌     | `2`        | Nombre de séparations verticales   |
| `sillCountY` | `number`  | ❌     | `2`        | Nombre de séparations horizontales |

### 🧱 Traverses

| Nom              | Type      | Requis | Par défaut | Description                      |
| ---------------- | --------- | ------ | ---------- | -------------------------------- |
| `hasTraverse`    | `boolean` | ❌     | `false`    | Affiche les traverses            |
| `traverseCountX` | `number`  | ❌     | `1`        | Nombre de traverses verticales   |
| `traverseCountY` | `number`  | ❌     | `1`        | Nombre de traverses horizontales |
| `traverseWidth`  | `number`  | ❌     | `2`        | Épaisseur des traverses          |

### 🔄 Forme de l’arc

| Nom       | Type                          | Requis | Par défaut | Description                                      |
| --------- | ----------------------------- | ------ | ---------- | ------------------------------------------------ |
| `arcType` | `"leger"` \| `"plein-cintre"` | ❌     | `"leger"`  | Forme de l’arc supérieur : léger ou plein cintre |

### 📏 Cotes

| Nom              | Type      | Requis | Par défaut | Description                |
| ---------------- | --------- | ------ | ---------- | -------------------------- |
| `showWidthCote`  | `boolean` | ❌     | `false`    | Affiche la cote de largeur |
| `showHeightCote` | `boolean` | ❌     | `false`    | Affiche la cote de hauteur |

---

## 🧪 Exemple d'utilisation

```tsx
import ArchedWindow from "./ArchedWindow";
import { Stage, Layer } from "react-konva";

<Stage width={800} height={600}>
  <Layer>
    <ArchedWindow
      windowWidth={300}
      windowHeight={400}
      borderColor="white"
      strokeColor="black"
      strokeWidth={3}
      innerStrokeColor="gray"
      innerFillColor="#aaddff"
      innerMargin={10}
      windowBorderX={50}
      windowBorderY={50}
      horizontalOpeningDirection="left"
      hasBase={true}
      hasBaseWindow={true}
      baseHeight={50}
      baseColor="lightgray"
      hasSill={true}
      sillCountX={2}
      sillCountY={3}
      hasTraverse={true}
      traverseCountX={1}
      traverseCountY={2}
      traverseWidth={2}
      arcType="plein-cintre"
      showWidthCote={true}
      showHeightCote={true}
    />
  </Layer>
</Stage>;
```
