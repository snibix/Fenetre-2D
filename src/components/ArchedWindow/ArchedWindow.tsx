import React from "react";
import { Group, Line, Rect, Shape } from "react-konva";
import Cotes from "../Cotes/Cotes";

type ArchedWindowProps = {
  // Dimensions principales de la fenêtre
  windowWidth: number;
  windowHeight: number;

  // Apparence de la bordure extérieure de la fenêtre
  borderColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  innerStrokeColor?: string;
  innerFillColor?: string;
  innerMargin?: number;
  windowBorderX?: number;
  windowBorderY?: number;

  // Propriétés liées à l'ouverture de la fenêtre
  horizontalOpeningDirection?: "left" | "right";
  verticalOpeningDirection?: "up" | "down";

  // Propriétés liées au soubassement
  hasBase?: boolean;
  hasBaseWindow?: boolean;
  baseWindowMargin?: number;
  baseHeight?: number;
  baseMargin?: number;
  baseColor?: string;
  soubassementStrokeWidth?: number; // Déjà présent mais rendre optionnel

  // Petits bois
  hasSill?: boolean;
  sillCountX?: number;
  sillCountY?: number;
  sillStrokeColor?: string;
  sillStrokeWidth?: number;
  petitsBoisStyle?: string;

  // Traverses
  hasTraverse?: boolean;
  traverseCountX?: number;
  traverseCountY?: number;
  traverseWidth?: number;

  // Forme de l'arc supérieur de la fenêtre
  arcType?: "leger" | "plein-cintre";

  // Affichage des cotes dimensionnelles
  showWidthCote?: boolean;
  showHeightCote?: boolean;
};

const ArchedWindow: React.FC<ArchedWindowProps> = ({
  windowWidth,
  windowHeight,
  borderColor = "white",
  strokeColor = "black",
  strokeWidth = 2,
  innerStrokeColor = "black",
  innerFillColor = "#cceeff",
  innerMargin = 10,
  windowBorderX = 100,
  windowBorderY = 100,

  // Propriétés d'ouverture
  horizontalOpeningDirection,
  verticalOpeningDirection,

  // Propriétés de soubassement
  hasBase = false,
  hasBaseWindow = false,
  baseWindowMargin = 10,
  baseHeight = 20,
  baseMargin = 10,
  baseColor = "white",

  // Propriétés des petits bois
  hasSill = false,
  sillCountX = 2,
  sillCountY = 2,

  // Propriétés de la traverse
  hasTraverse = false,
  traverseCountX = 1,
  traverseCountY = 1,
  traverseWidth = 6,

  // Forme de l'arc
  arcType = "leger",

  // Propriétés des cotes
  showWidthCote = true,
  showHeightCote = true,
}) => {
  const arcHeight =
    arcType === "plein-cintre"
      ? windowWidth / 2
      : Math.min(windowHeight * 0.15, windowWidth * 0.25);

  const radiusX = windowWidth / 2;

  // Dimensions intérieures
  const innerWindowWidth = windowWidth - innerMargin * 2;
  const innerWindowHeight = windowHeight - innerMargin * 2;

  // Calculer la hauteur d'arc intérieure en fonction de l'arc extérieur
  const innerArcHeight = Math.max(arcHeight - innerMargin, innerMargin);

  // Hauteur utile sans soubassement pour la partie vitrée
  const effectiveInnerHeight = hasBase
    ? innerWindowHeight - baseHeight
    : innerWindowHeight;

  // Dimensions intérieures du soubassement
  const innerSoubassementWidth = innerWindowWidth - baseMargin * 2;
  const innerSoubassementHeight = baseHeight - baseMargin * 2;

  // Position de la poignée (horizontal)
  const handleX =
    horizontalOpeningDirection === "right" ? windowWidth - innerMargin : 0;

  // Calculer la vraie hauteur totale vitrée pour centrer la poignée
  const totalVitrageHeight = effectiveInnerHeight - innerArcHeight;
  const handleY = innerArcHeight + totalVitrageHeight * 0.5;
  const handleYWithMargin = innerMargin + handleY;

  const getArcYAtX = (x: number, margin = 0) => {
    const centerX = innerMargin + innerWindowWidth / 2;
    const distFromCenter = Math.abs(x - centerX);
    const halfWidth = innerWindowWidth / 2;

    // Si on est en dehors de l'arc, retourner le point de base de l'arc
    if (distFromCenter >= halfWidth) {
      return innerMargin + innerArcHeight + margin;
    }

    // L'arc part du point le plus haut (innerMargin) et descend jusqu'à (innerMargin + innerArcHeight)
    const ratio = distFromCenter / halfWidth;
    const arcHeightAtX = innerArcHeight * Math.sqrt(1 - Math.pow(ratio, 2));

    // La position Y finale : on part du bas de l'arc et on remonte
    return innerMargin + innerArcHeight - arcHeightAtX + margin;
  };

  return (
    <Group x={windowBorderX} y={windowBorderY}>
      {/* Cadre extérieur */}
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(0, windowHeight);
          context.lineTo(0, arcHeight);
          context.ellipse(
            windowWidth / 2, // Centre X
            arcHeight, // Centre Y
            radiusX, // Rayon horizontal
            arcHeight, // Rayon vertical
            0, // Rotation
            Math.PI, // Angle de départ
            0, // Angle de fin
            false // Sens horaire
          );
          context.lineTo(windowWidth, windowHeight);
          context.lineTo(0, windowHeight);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        stroke={strokeColor}
        fill={borderColor}
        strokeWidth={strokeWidth}
      />

      {/* Vitre intérieure */}
      <Shape
        sceneFunc={(context, shape) => {
          const w = innerWindowWidth;
          const h = hasBase
            ? innerWindowHeight - baseHeight
            : innerWindowHeight;
          const rX = w / 2;
          const offsetX = innerMargin;
          const offsetY = innerMargin;

          context.beginPath();
          context.moveTo(offsetX, offsetY + h);
          context.lineTo(offsetX, offsetY + innerArcHeight);
          context.ellipse(
            offsetX + w / 2,
            offsetY + innerArcHeight,
            rX,
            innerArcHeight,
            0,
            Math.PI,
            0,
            false
          );
          context.lineTo(offsetX + w, offsetY + h);
          context.lineTo(offsetX, offsetY + h);
          context.closePath();

          context.fillStrokeShape(shape);
        }}
        stroke={innerStrokeColor}
        fill={innerFillColor}
        strokeWidth={1}
      />

      {/* Soubassement */}
      {hasBase && (
        <>
          <Rect
            x={innerMargin}
            y={windowHeight - innerMargin - baseHeight}
            width={innerWindowWidth}
            height={baseHeight}
            fill={baseColor}
            stroke={strokeColor}
            strokeWidth={2}
          />

          <Rect
            x={innerMargin + baseMargin}
            y={windowHeight - innerMargin - baseHeight + baseMargin}
            width={innerSoubassementWidth}
            height={innerSoubassementHeight}
            fill={borderColor}
            stroke={strokeColor}
            strokeWidth={2}
          />
        </>
      )}

      {/* Soubassement vitré */}
      {hasBaseWindow && (
        <>
          <Rect
            x={innerMargin}
            y={windowHeight - innerMargin - baseHeight}
            width={innerWindowWidth}
            height={baseHeight}
            fill="#cceeff"
            stroke={strokeColor}
            strokeWidth={2}
          />

          <Rect
            x={innerMargin + baseMargin}
            y={windowHeight - innerMargin - baseHeight + baseMargin}
            width={innerSoubassementWidth}
            height={baseWindowMargin}
            stroke={strokeColor}
            fill="white"
            strokeWidth={2}
          />
        </>
      )}

      {/* Petits bois */}
      {hasSill && (
        <>
          {/* Petits bois verticaux */}
          {[...Array(sillCountX)].map((_, i) => {
            const espaceX = innerWindowWidth / (sillCountX + 1);
            const x = innerMargin + espaceX * (i + 1);

            const hauteurDisponible = hasBase
              ? effectiveInnerHeight
              : innerWindowHeight;

            return (
              <Shape
                key={`petitbois-x-${i}`}
                sceneFunc={(context, shape) => {
                  const centerX = innerMargin + innerWindowWidth / 2;
                  const distFromCenter = Math.abs(x - centerX);
                  const halfWidth = innerWindowWidth / 2;

                  // Si on est en dehors de l'arc, ne pas dessiner
                  if (distFromCenter >= halfWidth) {
                    return;
                  }

                  // Calculer la hauteur Y où commence l'arc pour cette position X
                  const ratio = distFromCenter / halfWidth;
                  const arcHeightAtX =
                    innerArcHeight * Math.sqrt(1 - Math.pow(ratio, 2));
                  const topY = innerMargin + innerArcHeight - arcHeightAtX;

                  context.beginPath();
                  context.moveTo(x, topY);
                  context.lineTo(x, innerMargin + hauteurDisponible);
                  context.stroke();

                  context.fillStrokeShape(shape);
                }}
                stroke="black"
                strokeWidth={2}
              />
            );
          })}

          {/* Petits bois horizontaux */}
          {[...Array(sillCountY)].map((_, i) => {
            const hauteurDisponible = hasBase
              ? effectiveInnerHeight
              : innerWindowHeight;

            const espaceY = hauteurDisponible / (sillCountY + 1);
            const y = innerMargin + espaceY * (i + 1);

            // Vérifier si la ligne est dans la zone arquée
            if (y < innerMargin + innerArcHeight) {
              // Pour les lignes dans la zone arquée, calculer les points de début et fin
              return (
                <Shape
                  key={`petitbois-y-${i}`}
                  sceneFunc={(context, shape) => {
                    const centerX = innerMargin + innerWindowWidth / 2;
                    const arcCenterY = innerMargin + innerArcHeight;
                    const distFromArcCenter = Math.abs(y - arcCenterY);

                    // Si la ligne est au-dessus du centre de l'arc
                    if (y <= arcCenterY) {
                      const ratio = distFromArcCenter / innerArcHeight;
                      if (ratio >= 1) return; // Pas de ligne si on est en dehors de l'arc

                      // Calculer la largeur disponible à cette hauteur
                      const availableWidth =
                        innerWindowWidth * Math.sqrt(1 - Math.pow(ratio, 2));
                      const halfWidth = availableWidth / 2;

                      const leftX = centerX - halfWidth;
                      const rightX = centerX + halfWidth;

                      context.beginPath();
                      context.moveTo(leftX, y);
                      context.lineTo(rightX, y);
                      context.stroke();
                    }

                    context.fillStrokeShape(shape);
                  }}
                  stroke="black"
                  strokeWidth={2}
                />
              );
            }

            // Pour les lignes en dessous de l'arc, dessiner normalement
            return (
              <Line
                key={`petitbois-y-${i}`}
                points={[innerMargin, y, innerMargin + innerWindowWidth, y]}
                stroke="black"
                strokeWidth={2}
              />
            );
          })}
        </>
      )}

      {/* Traverses */}
      {hasTraverse && (
        <>
          {/* Traverses horizontales */}
          {[...Array(Number(traverseCountY) || 0)].map((_, i) => {
            const hauteurDisponible = hasBase
              ? effectiveInnerHeight
              : innerWindowHeight;

            const espaceY = hauteurDisponible / (traverseCountY + 1);
            const centerY = innerMargin + espaceY * (i + 1);

            return (
              <React.Fragment key={`traverse-horizontal-${i}`}>
                {/* Traverse horizontale avec effet de bordure */}
                <Shape
                  sceneFunc={(context, shape) => {
                    const borderWidth = 2;
                    const centerX = innerMargin + innerWindowWidth / 2;

                    const halfTraverseHeight =
                      (traverseWidth + borderWidth * 2) / 2;
                    const topY = centerY - halfTraverseHeight;
                    const bottomY = centerY + halfTraverseHeight;

                    const getArcWidthAtY = (y: number) => {
                      const arcCenterY = innerMargin + innerArcHeight;
                      const distFromArcCenter = Math.abs(y - arcCenterY);

                      if (y >= arcCenterY) {
                        return innerWindowWidth;
                      }

                      const ratio = distFromArcCenter / innerArcHeight;
                      if (ratio >= 1) return 0;

                      return (
                        innerWindowWidth * Math.sqrt(1 - Math.pow(ratio, 2))
                      );
                    };

                    const availableWidthAtTop = getArcWidthAtY(topY);
                    const availableWidthAtBottom = getArcWidthAtY(bottomY);

                    // Vérifier si la traverse est complètement en dehors de l'arc
                    if (
                      availableWidthAtTop === 0 &&
                      availableWidthAtBottom === 0
                    ) {
                      return;
                    }

                    const EF = Math.min(
                      availableWidthAtTop,
                      availableWidthAtBottom
                    );
                    const leftX = centerX - EF / 2;
                    const rightX = centerX + EF / 2;

                    context.beginPath();
                    context.moveTo(leftX, bottomY);
                    context.lineTo(rightX, bottomY);
                    context.lineTo(rightX - EF, topY);
                    context.lineTo(leftX + EF, topY);
                    context.lineTo(leftX, bottomY);
                    context.closePath();

                    context.fillStrokeShape(shape);
                  }}
                  fill="white"
                  stroke="black"
                  strokeWidth={2}
                />

                {/* Intérieur de la traverse */}
                <Shape
                  sceneFunc={(context, shape) => {
                    const centerX = innerMargin + innerWindowWidth / 2;
                    const halfTraverseHeight = traverseWidth / 2;

                    const topY = centerY - halfTraverseHeight;
                    const bottomY = centerY + halfTraverseHeight;

                    const getArcWidthAtY = (y: number) => {
                      const arcCenterY = innerMargin + innerArcHeight;
                      const distFromArcCenter = Math.abs(y - arcCenterY);

                      if (y >= arcCenterY) {
                        return innerWindowWidth;
                      }

                      const ratio = distFromArcCenter / innerArcHeight;
                      if (ratio >= 1) return 0;

                      return (
                        innerWindowWidth * Math.sqrt(1 - Math.pow(ratio, 2))
                      );
                    };

                    const availableWidthAtTop = getArcWidthAtY(topY);
                    const availableWidthAtBottom = getArcWidthAtY(bottomY);

                    // Vérifier si la traverse est complètement en dehors de l'arc
                    if (
                      availableWidthAtTop === 0 &&
                      availableWidthAtBottom === 0
                    ) {
                      return; // Ne pas dessiner l'intérieur
                    }

                    const EF =
                      Math.min(availableWidthAtTop, availableWidthAtBottom) + 4;
                    const leftX = centerX - EF / 2;

                    context.beginPath();
                    context.rect(leftX, topY, EF, bottomY - topY);
                    context.closePath();

                    context.fillStrokeShape(shape);
                  }}
                  fill="white"
                  stroke="white"
                  strokeWidth={3}
                />
              </React.Fragment>
            );
          })}

          {/* Traverses verticales */}
          {[...Array(Number(traverseCountX) || 0)].map((_, i) => {
            const espaceX = innerWindowWidth / (traverseCountX + 1);
            const centerX = innerMargin + espaceX * (i + 1);

            return (
              <React.Fragment key={`traverse-vertical-${i}`}>
                {/* Traverse verticale avec effet de bordure */}
                <Shape
                  sceneFunc={(context, shape) => {
                    const borderWidth = 2;
                    const halfWidth = (traverseWidth + borderWidth * 2) / 2;
                    const leftX = centerX - halfWidth;
                    const rightX = centerX + halfWidth;

                    context.beginPath();

                    const topLeftY = getArcYAtX(leftX);
                    context.moveTo(leftX, topLeftY);

                    const topRightY = getArcYAtX(rightX);
                    context.lineTo(rightX, topRightY);

                    context.lineTo(rightX, innerMargin + effectiveInnerHeight);
                    context.lineTo(leftX, innerMargin + effectiveInnerHeight);
                    context.lineTo(leftX, topLeftY);

                    context.closePath();
                    context.fillStrokeShape(shape);
                  }}
                  fill="white"
                  stroke="black"
                  strokeWidth={1}
                />

                {/* Intérieur de la traverse verticale */}
                <Shape
                  sceneFunc={(context, shape) => {
                    const halfWidth = traverseWidth / 2;
                    const leftX = centerX - halfWidth;
                    const rightX = centerX + halfWidth;

                    context.beginPath();

                    const topLeftY = getArcYAtX(leftX);
                    context.moveTo(leftX, topLeftY);

                    const topRightY = getArcYAtX(rightX);
                    context.lineTo(rightX, topRightY);

                    context.lineTo(rightX, innerMargin + effectiveInnerHeight);
                    context.lineTo(leftX, innerMargin + effectiveInnerHeight);
                    context.lineTo(leftX, topLeftY);

                    context.closePath();
                    context.fillStrokeShape(shape);
                  }}
                  fill="white"
                  stroke="white"
                  strokeWidth={3}
                />
              </React.Fragment>
            );
          })}
          {hasTraverse &&
            traverseCountX > 0 &&
            traverseCountY > 0 &&
            [...Array(Number(traverseCountX) || 0)]
              .map((_, xIndex) => {
                const espaceX = innerWindowWidth / (traverseCountX + 1);
                const centerX = innerMargin + espaceX * (xIndex + 1) - 2;

                return [...Array(Number(traverseCountY) || 0)].map(
                  (_, yIndex) => {
                    const hauteurDisponible = hasBase
                      ? effectiveInnerHeight
                      : innerWindowHeight;
                    const espaceY = hauteurDisponible / (traverseCountY + 1);
                    const centerY = innerMargin + espaceY * (yIndex + 1);

                    // Vérifier si le croisement est dans une zone valide
                    const getArcWidthAtY = (y: number) => {
                      const arcCenterY = innerMargin + innerArcHeight;
                      const distFromArcCenter = Math.abs(y - arcCenterY);

                      if (y >= arcCenterY) {
                        return innerWindowWidth;
                      }

                      const ratio = distFromArcCenter / innerArcHeight;
                      if (ratio >= 1) return 0;

                      return (
                        innerWindowWidth * Math.sqrt(1 - Math.pow(ratio, 2))
                      );
                    };

                    const availableWidth = getArcWidthAtY(centerY);
                    const leftBound =
                      innerMargin + innerWindowWidth / 2 - availableWidth / 2;
                    const rightBound =
                      innerMargin + innerWindowWidth / 2 + availableWidth / 2;

                    if (
                      centerX >= leftBound &&
                      centerX <= rightBound &&
                      availableWidth > 0
                    ) {
                      return (
                        <Rect
                          key={`croisement-${xIndex}-${yIndex}`}
                          x={centerX - traverseWidth / 2}
                          y={centerY - traverseWidth / 2}
                          width={traverseWidth + 4}
                          height={traverseWidth + 0.5}
                          fill="white"
                          stroke="white"
                          strokeWidth={2}
                        />
                      );
                    }
                    return null;
                  }
                );
              })
              .flat()
              .filter(Boolean)}
        </>
      )}

      {/* Coins diagonaux */}

      <Line
        points={[0, windowHeight, innerMargin, innerMargin + innerWindowHeight]}
        stroke="black"
        strokeWidth={1}
      />
      <Line
        points={[
          windowWidth,
          windowHeight,
          innerMargin + innerWindowWidth,
          innerMargin + innerWindowHeight,
        ]}
        stroke="black"
        strokeWidth={1}
      />

      {/* Ouverture horizontale */}
      {(horizontalOpeningDirection === "left" ||
        horizontalOpeningDirection === "right") && (
        <>
          <Line
            points={[
              horizontalOpeningDirection === "right"
                ? innerMargin
                : innerMargin + innerWindowWidth,
              innerMargin + innerArcHeight,
              horizontalOpeningDirection === "right"
                ? innerMargin + innerWindowWidth
                : innerMargin,
              handleYWithMargin,
            ]}
            stroke="black"
            strokeWidth={0.4}
            dash={[7, 7]}
          />

          <Line
            points={[
              horizontalOpeningDirection === "right"
                ? innerMargin
                : innerMargin + innerWindowWidth,
              innerMargin + effectiveInnerHeight,
              horizontalOpeningDirection === "right"
                ? innerMargin + innerWindowWidth
                : innerMargin,
              handleYWithMargin,
            ]}
            stroke="black"
            strokeWidth={0.4}
            dash={[7, 7]}
          />

          {/* Poignée */}
          <Rect
            x={handleX}
            y={handleYWithMargin - innerMargin / 2}
            width={innerMargin}
            height={innerMargin}
            fill="#888888"
            stroke="black"
            strokeWidth={0}
            cornerRadius={innerMargin / 4}
          />
        </>
      )}

      {/* Ouverture verticale */}
      {(verticalOpeningDirection === "up" ||
        verticalOpeningDirection === "down") && (
        <>
          {verticalOpeningDirection === "down" && (
            <>
              <Line
                points={[
                  innerMargin,
                  getArcYAtX(innerMargin),
                  innerMargin + innerWindowWidth / 2,
                  innerMargin + effectiveInnerHeight,
                ]}
                stroke="black"
                strokeWidth={0.4}
                dash={[7, 7]}
              />
              <Line
                points={[
                  innerMargin + innerWindowWidth,
                  getArcYAtX(innerMargin + innerWindowWidth),
                  innerMargin + innerWindowWidth / 2,
                  innerMargin + effectiveInnerHeight,
                ]}
                stroke="black"
                strokeWidth={0.4}
                dash={[7, 7]}
              />
            </>
          )}
          {verticalOpeningDirection === "up" && (
            <>
              <Line
                points={[
                  innerMargin,
                  innerMargin + effectiveInnerHeight,
                  innerMargin + innerWindowWidth / 2,
                  innerMargin,
                ]}
                stroke="black"
                strokeWidth={0.4}
                dash={[7, 7]}
              />
              <Line
                points={[
                  innerMargin + innerWindowWidth,
                  innerMargin + effectiveInnerHeight,
                  innerMargin + innerWindowWidth / 2,
                  innerMargin,
                ]}
                stroke="black"
                strokeWidth={0.4}
                dash={[7, 7]}
              />
            </>
          )}
        </>
      )}

      {/* Cotes */}
      {(showWidthCote || showHeightCote) && (
        <>
          <Cotes
            windows={[
              {
                x: 0,
                y: 0,
                width: windowWidth,
                height: windowHeight,
              },
            ]}
            showWidthCote={showWidthCote}
            showHeightCote={showHeightCote}
            offsetY={60}
            offsetX={80}
          />

          {hasBase && (
            <Cotes
              windows={[
                {
                  x: innerMargin,
                  y: windowHeight - innerMargin - baseHeight,
                  width: windowWidth - innerMargin * 2,
                  height: baseHeight,
                },
              ]}
              showWidthCote={showWidthCote}
              showHeightCote={showHeightCote}
              offsetY={40}
              offsetX={50}
            />
          )}
        </>
      )}
    </Group>
  );
};

export default ArchedWindow;
