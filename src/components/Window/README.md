# 🪟 Composant `<Window />`

Composant React basé sur `react-konva` permettant d'afficher un schéma de fenêtre personnalisable avec options de soubassement, petits bois, ouverture, et côtes (dimensions affichées avec des flèches).

---

## ✨ Props disponibles

### Dimensions et positionnement

| Prop            | Type     | Description                              | Par défaut |
| --------------- | -------- | ---------------------------------------- | ---------- |
| `windowWidth`   | `number` | Largeur totale de la fenêtre (en px)     | `required` |
| `windowHeight`  | `number` | Hauteur totale de la fenêtre (en px)     | `required` |
| `borderColor`   | `string` | Couleur du cadre extérieur de la fenêtre | `"white"`  |
| `margin`        | `number` | Marge intérieure autour de la vitre      | `10`       |
| `windowBorderX` | `number` | Position X du groupe sur le canvas       | `400`      |
| `windowBorderY` | `number` | Position Y du groupe sur le canvas       | `100`      |

---

### 🔁 Ouverture

| Prop                         | Type                     | Description                               | Par défaut |
| ---------------------------- | ------------------------ | ----------------------------------------- | ---------- |
| `horizontalOpeningDirection` | `"gauche"` \| `"droite"` | Sens d'ouverture horizontal de la fenêtre | `optional` |
| `verticalOpeningDirection`   | `"haut"` \| `"bas"`      | Sens d'ouverture vertical de la fenêtre   | `optional` |

---

### 🧱 Soubassement

| Prop                      | Type      | Description                                 | Par défaut |
| ------------------------- | --------- | ------------------------------------------- | ---------- |
| `hasSoubassement`         | `boolean` | Active l'affichage d'un soubassement        | `false`    |
| `hasSoubassementVitre`    | `boolean` | Soubassement vitré au lieu de plein         | `false`    |
| `soubassementVitreMargin` | `number`  | Hauteur de la partie vitrée du soubassement | `10`       |
| `soubassementHeight`      | `number`  | Hauteur totale du soubassement              | `20`       |
| `soubassementMargin`      | `number`  | Marge interne dans le soubassement          | `15`       |
| `soubassementColor`       | `string`  | Couleur intérieure du soubassement          | `"white"`  |

---

### 🪟 Petits bois

| Prop                    | Type      | Description                           | Par défaut |
| ----------------------- | --------- | ------------------------------------- | ---------- |
| `showPetitsBois`        | `boolean` | Affiche les petits bois dans la vitre | `false`    |
| `petitsBoisCountX`      | `number`  | Nombre de divisions verticales        | `2`        |
| `petitsBoisCountY`      | `number`  | Nombre de divisions horizontales      | `2`        |
| `petitsBoisStrokeColor` | `string`  | Couleur des petits bois               | `"black"`  |
| `petitsBoisStrokeWidth` | `number`  | Épaisseur des traits                  | `2`        |

---

### 📏 Affichage des côtes

| Prop             | Type      | Description                                             | Par défaut |
| ---------------- | --------- | ------------------------------------------------------- | ---------- |
| `showWidthCote`  | `boolean` | Affiche les flèches de largeur (en bas de la fenêtre)   | `false`    |
| `showHeightCote` | `boolean` | Affiche les flèches de hauteur (à droite de la fenêtre) | `false`    |

---

## 🧪 Exemple d’utilisation

```tsx
import Window from "./components/Window";

<Window
  windowWidth={300}
  windowHeight={500}
  borderColor="gray"
  windowBorderX={100}
  windowBorderY={100}
  horizontalOpeningDirection="gauche"
  verticalOpeningDirection="haut"
  hasSoubassement={true}
  hasSoubassementVitre={false}
  soubassementHeight={50}
  soubassementColor="lightgray"
  showPetitsBois={true}
  petitsBoisCountX={3}
  petitsBoisCountY={2}
  showWidthCote={true}
  showHeightCote={true}
/>;
```
