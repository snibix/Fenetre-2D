import { Arrow, Group, Line, Text } from "react-konva";

type WindowMetric = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CotesProps = {
  windows: WindowMetric[];
  showWidthCote?: boolean;
  showHeightCote?: boolean;
  offsetY?: number;
  offsetX?: number;
};

const Cotes: React.FC<CotesProps> = ({
  windows,
  showWidthCote = true,
  showHeightCote = true,
  offsetY = 20,
  offsetX = 20,
}) => {
  return (
    <>
      {windows.map((win, index) => {
        const { x, y, width, height } = win;

        return (
          <Group key={index}>
            {/* Largeur (horizontal, en bas) */}
            {showWidthCote && (
              <>
                {/* Traits verticaux aux extrémités */}
                <Line
                  points={[x, y + height, x, y + height + offsetY]}
                  stroke="black"
                  strokeWidth={1}
                />
                <Line
                  points={[
                    x + width,
                    y + height,
                    x + width,
                    y + height + offsetY,
                  ]}
                  stroke="black"
                  strokeWidth={1}
                />

                {/* Flèche double */}
                <Arrow
                  points={[
                    x + 5,
                    y + height + offsetY,
                    x + width - 5,
                    y + height + offsetY,
                  ]}
                  stroke="black"
                  fill="black"
                  pointerLength={10}
                  pointerWidth={10}
                  pointerAtBeginning={true}
                />

                {/* Texte centré */}
                <Text
                  x={x + width / 2 - 30}
                  y={y + height + offsetY - 20}
                  text={`${Math.round(width)} mm`}
                  fontSize={14}
                  fill="black"
                />
              </>
            )}

            {/* Hauteur (vertical, à gauche) */}
            {showHeightCote && (
              <>
                {/* Traits horizontaux aux extrémités */}
                <Line
                  points={[x, y, x - offsetX, y]}
                  stroke="black"
                  strokeWidth={1}
                />
                <Line
                  points={[x, y + height, x - offsetX, y + height]}
                  stroke="black"
                  strokeWidth={1}
                />

                {/* Flèche double */}
                <Arrow
                  points={[x - offsetX, y + 5, x - offsetX, y + height - 5]}
                  stroke="black"
                  fill="black"
                  pointerLength={10}
                  pointerWidth={10}
                  pointerAtBeginning={true}
                />

                {/* Texte centré et pivoté */}
                <Text
                  x={x - offsetX - 20}
                  y={y + height / 2 + 20}
                  text={`${Math.round(height)} mm`}
                  fontSize={14}
                  fill="black"
                  rotation={-90}
                />
              </>
            )}
          </Group>
        );
      })}
    </>
  );
};

export default Cotes;
