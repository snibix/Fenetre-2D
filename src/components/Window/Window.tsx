import React from "react";
import { Group, Line, Rect } from "react-konva";
import Cotes from "../Cotes/Cotes";

type WindowProps = {
  windowWidth: number;
  windowHeight: number;
  borderColor?: string;
  margin?: number;
  windowBorderX?: number;
  windowBorderY?: number;
  horizontalOpeningDirection?: "gauche" | "droite";
  verticalOpeningDirection?: "haut" | "bas";

  hasSoubassement?: boolean;
  hasSoubassementVitre?: boolean;
  soubassementVitreMargin?: number;
  soubassementHeight?: number;
  soubassementMargin?: number;
  soubassementColor?: string;
  soubassementStrokeWidth?: number;

  showPetitsBois?: boolean;
  petitsBoisCountX?: number;
  petitsBoisCountY?: number;
  petitsBoisStrokeColor?: string;
  petitsBoisStrokeWidth?: number;

  // Nouveaux props pour les traverses
  hasTraverse?: boolean;
  traverseCountX?: number;
  traverseCountY?: number;
  traverseWidth?: number;

  showWidthCote?: boolean;
  showHeightCote?: boolean;
};

const Window: React.FC<WindowProps> = ({
  windowWidth,
  windowHeight,
  borderColor = "white",
  margin = 10,
  windowBorderX = 400,
  windowBorderY = 100,
  horizontalOpeningDirection,
  verticalOpeningDirection,

  hasSoubassement = false,
  hasSoubassementVitre = false,
  soubassementVitreMargin = 10,
  soubassementHeight = 20,
  soubassementMargin = 15,
  soubassementColor = "white",
  soubassementStrokeWidth = 2,

  showPetitsBois = false,
  petitsBoisCountX = 2,
  petitsBoisCountY = 2,
  petitsBoisStrokeColor = "black",
  petitsBoisStrokeWidth = 2,

  // Valeurs par défaut pour les traverses
  hasTraverse = false,
  traverseCountX = 0,
  traverseCountY = 0,
  traverseWidth = 20,

  showWidthCote = true,
  showHeightCote = true,
}) => {
  const borderStroke = "black";
  const borderStrokeWidth = 2;
  const innerWindowColor = "#cceeff";

  // Dimensions intérieures
  const innerWindowWidth = windowWidth - margin * 2;
  const innerWindowHeight = windowHeight - margin * 2;

  // Hauteur utile sans soubassement
  const effectiveInnerHeight = hasSoubassement
    ? innerWindowHeight - soubassementHeight
    : innerWindowHeight;

  const innerSoubassementWidth = innerWindowWidth - soubassementMargin * 2;
  const innerSoubassementHeight = soubassementHeight - soubassementMargin * 2;

  // Position de la poignée (horizontal)
  const handleX =
    horizontalOpeningDirection === "droite" ? windowWidth - margin : 0;

  const handleY = effectiveInnerHeight * 0.5;
  const handleYWithMargin = margin + handleY;

  return (
    <Group x={windowBorderX} y={windowBorderY}>
      {/* Cadre extérieur */}
      <Rect
        x={0}
        y={0}
        width={windowWidth}
        height={windowHeight}
        fill={borderColor}
        stroke={borderStroke}
        strokeWidth={2}
      />

      {/* Fenêtre intérieure */}
      <Rect
        x={margin}
        y={margin}
        width={innerWindowWidth}
        height={innerWindowHeight}
        fill={innerWindowColor}
        stroke={borderStroke}
        strokeWidth={borderStrokeWidth}
      />

      {hasSoubassement && (
        <>
          <Rect
            x={margin}
            y={windowHeight - margin - soubassementHeight}
            width={innerWindowWidth}
            height={soubassementHeight}
            fill={soubassementColor}
            stroke={borderStroke}
            strokeWidth={soubassementStrokeWidth}
          />

          <Rect
            x={margin + soubassementMargin}
            y={windowHeight - margin - soubassementHeight + soubassementMargin}
            width={innerSoubassementWidth}
            height={innerSoubassementHeight}
            fill={borderColor}
            stroke={borderStroke}
            strokeWidth={soubassementStrokeWidth}
          />
        </>
      )}

      {hasSoubassementVitre && (
        <>
          <Rect
            x={margin}
            y={windowHeight - margin - soubassementHeight}
            width={innerWindowWidth}
            height={soubassementHeight}
            fill="#cceeff"
            stroke={borderStroke}
            strokeWidth={soubassementStrokeWidth}
          />

          <Rect
            x={margin + soubassementMargin}
            y={windowHeight - margin - soubassementHeight + soubassementMargin}
            width={innerSoubassementWidth}
            height={soubassementVitreMargin}
            stroke={borderStroke}
            fill="white"
            strokeWidth={soubassementStrokeWidth}
          />
        </>
      )}

      {/* TRAVERSES */}
      {hasTraverse && (
        <>
          {/* Traverses horizontales */}
          {[...Array(Number(traverseCountY) || 0)].map((_, i) => {
            const hauteurDisponible = effectiveInnerHeight;
            const espaceY = hauteurDisponible / (traverseCountY + 1);
            const centerY = margin + espaceY * (i + 1);

            return (
              <React.Fragment key={`traverse-horizontal-${i}`}>
                {/* Traverse horizontale avec bordure */}
                <Rect
                  x={margin}
                  y={centerY - (traverseWidth + 4) / 2}
                  width={innerWindowWidth}
                  height={traverseWidth + 4}
                  fill="white"
                  stroke="black"
                  strokeWidth={2}
                />

                {/* Intérieur de la traverse horizontale */}
                <Rect
                  x={margin}
                  y={centerY - traverseWidth / 2}
                  width={innerWindowWidth}
                  height={traverseWidth}
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
            const centerX = margin + espaceX * (i + 1);

            return (
              <React.Fragment key={`traverse-vertical-${i}`}>
                {/* Traverse verticale avec bordure */}
                <Rect
                  x={centerX - (traverseWidth + 4) / 2}
                  y={margin}
                  width={traverseWidth + 4}
                  height={effectiveInnerHeight}
                  fill="white"
                  stroke="black"
                  strokeWidth={2}
                />

                {/* Intérieur de la traverse verticale */}
                <Rect
                  x={centerX - traverseWidth / 2}
                  y={margin}
                  width={traverseWidth}
                  height={effectiveInnerHeight}
                  fill="white"
                  stroke="white"
                  strokeWidth={3}
                />
              </React.Fragment>
            );
          })}

          {/* Croisements des traverses */}
          {hasTraverse &&
            traverseCountX > 0 &&
            traverseCountY > 0 &&
            [...Array(Number(traverseCountX) || 0)]
              .map((_, xIndex) => {
                const espaceX = innerWindowWidth / (traverseCountX + 1);
                const centerX = margin + espaceX * (xIndex + 1);

                return [...Array(Number(traverseCountY) || 0)].map(
                  (_, yIndex) => {
                    const hauteurDisponible = effectiveInnerHeight;
                    const espaceY = hauteurDisponible / (traverseCountY + 1);
                    const centerY = margin + espaceY * (yIndex + 1);

                    return (
                      <Rect
                        key={`croisement-${xIndex}-${yIndex}`}
                        x={centerX - (traverseWidth + 6) / 2}
                        y={centerY - (traverseWidth + 2) / 2}
                        width={traverseWidth + 6}
                        height={traverseWidth + 2}
                        fill="white"
                        stroke="white"
                        strokeWidth={1}
                      />
                    );
                  }
                );
              })
              .flat()
              .filter(Boolean)}
        </>
      )}

      {showPetitsBois && (
        <>
          {/* Petits bois verticaux */}
          {[...Array(petitsBoisCountX)].map((_, i) => {
            const espaceX = innerWindowWidth / (petitsBoisCountX + 1);
            const x = margin + espaceX * (i + 1);

            const hauteurDisponible = hasSoubassement
              ? innerWindowHeight - soubassementHeight
              : innerWindowHeight;

            return (
              <Line
                key={`petitbois-x-${i}`}
                points={[x, margin, x, margin + hauteurDisponible]}
                stroke={petitsBoisStrokeColor}
                strokeWidth={petitsBoisStrokeWidth}
              />
            );
          })}

          {/* Petits bois horizontaux */}
          {[...Array(petitsBoisCountY)].map((_, i) => {
            const hauteurDisponible = hasSoubassement
              ? innerWindowHeight - soubassementHeight
              : innerWindowHeight;

            const espaceY = hauteurDisponible / (petitsBoisCountY + 1);
            const y = margin + espaceY * (i + 1);

            return (
              <Line
                key={`petitbois-y-${i}`}
                points={[margin, y, margin + innerWindowWidth, y]}
                stroke={petitsBoisStrokeColor}
                strokeWidth={petitsBoisStrokeWidth}
              />
            );
          })}
        </>
      )}

      {/* Coins diagonaux */}
      <Line points={[0, 0, margin, margin]} stroke="black" strokeWidth={1} />
      <Line
        points={[windowWidth, 0, margin + innerWindowWidth, margin]}
        stroke="black"
        strokeWidth={1}
      />
      <Line
        points={[0, windowHeight, margin, margin + innerWindowHeight]}
        stroke="black"
        strokeWidth={1}
      />
      <Line
        points={[
          windowWidth,
          windowHeight,
          margin + innerWindowWidth,
          margin + innerWindowHeight,
        ]}
        stroke="black"
        strokeWidth={1}
      />

      {/* Ouverture horizontale */}
      {(horizontalOpeningDirection === "gauche" ||
        horizontalOpeningDirection === "droite") && (
        <>
          <Line
            points={[
              horizontalOpeningDirection === "droite"
                ? margin
                : margin + innerWindowWidth,
              margin,
              horizontalOpeningDirection === "droite"
                ? margin + innerWindowWidth
                : margin,
              handleYWithMargin,
            ]}
            stroke="black"
            strokeWidth={0.4}
            dash={[7, 7]}
          />

          <Line
            points={[
              horizontalOpeningDirection === "droite"
                ? margin
                : margin + innerWindowWidth,
              margin + effectiveInnerHeight,
              horizontalOpeningDirection === "droite"
                ? margin + innerWindowWidth
                : margin,
              handleYWithMargin,
            ]}
            stroke="black"
            strokeWidth={0.4}
            dash={[7, 7]}
          />

          {/* Poignée */}
          <Rect
            x={handleX}
            y={handleYWithMargin - margin / 2}
            width={margin}
            height={margin}
            fill="#888888"
            stroke="black"
            strokeWidth={0}
            cornerRadius={margin / 4}
          />
        </>
      )}

      {/* Ouverture verticale */}
      {(verticalOpeningDirection === "haut" ||
        verticalOpeningDirection === "bas") && (
        <>
          <Line
            points={[
              margin,
              verticalOpeningDirection === "haut"
                ? margin + effectiveInnerHeight
                : margin,
              margin + innerWindowWidth / 2,
              verticalOpeningDirection === "haut"
                ? margin
                : margin + effectiveInnerHeight,
            ]}
            stroke="black"
            strokeWidth={0.4}
            dash={[7, 7]}
          />
          <Line
            points={[
              margin + innerWindowWidth,
              verticalOpeningDirection === "haut"
                ? margin + effectiveInnerHeight
                : margin,
              margin + innerWindowWidth / 2,
              verticalOpeningDirection === "haut"
                ? margin
                : margin + effectiveInnerHeight,
            ]}
            stroke="black"
            strokeWidth={0.4}
            dash={[7, 7]}
          />
        </>
      )}

      {(showWidthCote || showHeightCote) && (
        <>
          {/* Cotes pour la fenêtre totale */}
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

          {/* Cotes du soubassement */}
          {hasSoubassement && (
            <Cotes
              windows={[
                {
                  x: margin,
                  y: windowHeight - margin - soubassementHeight,
                  width: windowWidth - margin * 2,
                  height: soubassementHeight,
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

export default Window;
