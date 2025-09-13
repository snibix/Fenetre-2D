import { Arc, Group, Line, Rect } from "react-konva";

type WindowArcProps = {
  width?: number;
  positionX?: number;
  positionY?: number;
  margin?: number;
  borderColor?: string;
};

const WindowArc: React.FC<WindowArcProps> = ({
  width = 200,
  positionX = 550,
  positionY = 250,
  margin = 10,
  borderColor = "white",
}) => {
  const strokeColor = "black";

  // Calculer le rayon à partir de la largeur souhaitée
  const outerRadius = width / 2;
  const innerRadius = outerRadius - margin;
  const angle = 180;
  const rotation = 180;

  // Point central de l'arc (positionX est le bord gauche)
  const centerX = positionX + outerRadius;

  return (
    <Group>
      {/* Demi-cercle extérieur */}
      <Arc
        x={centerX}
        y={positionY}
        innerRadius={0}
        outerRadius={outerRadius}
        angle={angle}
        rotation={rotation}
        stroke={strokeColor}
        strokeWidth={2}
        fill={borderColor}
      />

      {/* Demi-cercle intérieur rempli */}
      <Arc
        x={centerX}
        y={positionY}
        innerRadius={0}
        outerRadius={innerRadius}
        angle={angle}
        rotation={rotation}
        fill="#cceeff"
        stroke={strokeColor}
        strokeWidth={2}
      />

      {/* Base rectangulaire */}
      <Rect
        x={positionX}
        y={positionY}
        stroke={strokeColor}
        strokeWidth={2}
        width={width}
        height={margin}
        fill={borderColor}
      />

      {/* Traits horizontaux gauche et droit */}
      <Line
        points={[positionX + 1, positionY, positionX - 1 + margin, positionY]}
        stroke={borderColor}
        strokeWidth={2}
      />
      <Line
        points={[
          positionX + width - 1,
          positionY,
          positionX + width + 1 - margin,
          positionY,
        ]}
        stroke={borderColor}
        strokeWidth={2}
      />
    </Group>
  );
};

export default WindowArc;
