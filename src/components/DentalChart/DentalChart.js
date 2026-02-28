import React, { useState } from "react";
import { motion } from "framer-motion";

// Componente principal del gráfico dental
const DentalChart = ({ onMarkTooth, markedTeeth = {} }) => {
  const [hoveredTooth, setHoveredTooth] = useState(null);

  // Definición de los 5 puntos (caras) del diente
  const points = [
    // LÍNEAS 9-14: Nomenclatura clínica
    { id: "distal-occlusal", pos: [-14, -10] },
    { id: "mesial-occlusal", pos: [14, -10] },
    { id: "distal-gingival", pos: [-14, 10] },
    { id: "mesial-gingival", pos: [14, 10] },
    { id: "occlusal-center", pos: [0, 0] },
  ];

  // =================================================================
  // 1. Números de Dientes PERMANENTES (16 en cada arcada)
  // =================================================================

  const upperPermanent = [
    "18",
    "17",
    "16",
    "15",
    "14",
    "13",
    "12",
    "11",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
  ];
  const lowerPermanent = [
    "48",
    "47",
    "46",
    "45",
    "44",
    "43",
    "42",
    "41",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
  ];

  // =================================================================
  // 2. Números de Dientes ADICIONALES/TEMPORALES (10 en cada arcada)
  // Usamos los cuadrantes 5 y 6 para la arcada superior.
  // Usamos los cuadrantes 8 y 7 para la arcada inferior.
  // Se simulan 10 dientes, 5 por cuadrante.
  // =================================================================

  // Nota: De 55 a 51 y de 61 a 65
  const upperAdditional = [
    "55",
    "54",
    "53",
    "52",
    "51",
    "61",
    "62",
    "63",
    "64",
    "65",
  ];

  // Nota: De 85 a 81 y de 71 a 75
  const lowerAdditional = [
    "85",
    "84",
    "83",
    "82",
    "81",
    "71",
    "72",
    "73",
    "74",
    "75",
  ];

  // =================================================================

  const Tooth = ({ number, index, isUpper, isAdditional }) => {
    const marks = markedTeeth[number] || [false, false, false, false, false];
    const isHovered = hoveredTooth === number;

    // Constantes de Posición Y:
    // Distancia entre dientes permanentes y adicionales
    const SPACING_Y = 24;

    // Posición Y de la corona base (permanente)
    const BASE_Y = isUpper ? -18 : 18;

    // Ajuste de posición Y para dientes adicionales
    let offsetY = 0;
    if (isAdditional) {
      // Dientes superiores adicionales (van ABAJO): BASE_Y + SPACING_Y
      if (isUpper) {
        offsetY = SPACING_Y;
      }
      // Dientes inferiores adicionales (van ARRIBA): BASE_Y - SPACING_Y
      else {
        offsetY = -SPACING_Y;
      }
    }

    // Posición Y final de la corona
    const crownY = BASE_Y + offsetY;

    // Centro Y para los puntos (caras del diente)
    const rectCenterY = (isUpper ? -11 : 26) + offsetY;

    // Multiplicador para invertir el eje Y de los puntos en la arcada inferior.
    const yFlip = isUpper ? 1 : -1;

    // Espaciado X: Para los dientes adicionales, necesitamos un espaciado diferente
    // ya que solo hay 10 dientes en total (5 por cuadrante).
    const TOTAL_PERMANENT_COUNT = 16;
    const PERMANENT_SPACING = 40;

    // Si es adicional, solo hay 10 dientes. Los centramos con un offset.
    const ADDITIONAL_COUNT = 10;
    const ADDITIONAL_SPACING =
      (PERMANENT_SPACING * TOTAL_PERMANENT_COUNT) / ADDITIONAL_COUNT; // 44.8, ajustamos a 45 para espaciado

    // Calculamos el espaciado X:
    const spacingX = isAdditional ? 45 : PERMANENT_SPACING;
    let finalIndex = index;

    // Si es adicional, el índice debe ser ajustado porque solo hay 10 dientes.
    // Esto requiere un cálculo de centrado para que queden alineados a los 10 centrales.
    if (isAdditional) {
      // Ajustamos el índice y añadimos un pequeño desplazamiento para centrar
      // los 10 dientes adicionales bajo los 10 dientes centrales permanentes (15-16 / 25-26 y 45-46 / 35-36)
      finalIndex = index + 3;
    }

    const toothX = finalIndex * spacingX;

    const toothWidth = 32;  // 34
    const toothHeight = 18; // 12

    return (
      <g
        key={number}
        onMouseEnter={() => setHoveredTooth(number)}
        onMouseLeave={() => setHoveredTooth(null)}
      >
        {/* Rectángulo que representa la corona del diente */}
        <motion.rect
          x={toothX}
          y={crownY}
          width={toothWidth}
          height={toothHeight}
          rx={3}
          fill={isHovered ? "#dbeafe" : isAdditional ? "#fffbe7" : "white"}
          stroke={marks.some((m) => m) ? "#ef4444" : "#3b82f6"}
          strokeWidth={marks.some((m) => m) ? 3 : 1}
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            // Click en diente: toggle all points
            const newMarks = marks.map((m) => !m);
            onMarkTooth(number, newMarks);
          }}
        />

        {/* Renderizado de los 5 puntos de la superficie */}
        {points.map((point, pIdx) => (
          <motion.circle
            key={point.id}
            cx={toothX + (toothWidth / 2) + point.pos[0]}
            cy={rectCenterY + point.pos[1] * yFlip}
            r={marks[pIdx] ? 5 : 4} // Tamaño original de los puntos
            fill={marks[pIdx] ? "#ef4444" : "#f3f4f6"}
            stroke={marks[pIdx] ? "#dc2626" : "#d1d5db"}
            strokeWidth={2}
            className="cursor-pointer"
            whileHover={{ scale: 1.2 }}
            onClick={(e) => {
              e.stopPropagation();
              const newMarks = [...marks];
              newMarks[pIdx] = !newMarks[pIdx];
              onMarkTooth(number, newMarks);
            }}
          />
        ))}

        {/* Número del diente */}
        <text
          x={toothX + (toothWidth / 2)}
          y={isUpper ? crownY - 8 : crownY + 28}
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill={isAdditional ? "#f59e0b" : "#374151"}
          className="pointer-events-none"
        >
          {number}
        </text>
      </g>
    );
  };

  // El ancho del gráfico debe considerar los dientes permanentes, ya que son la fila más ancha (16 * 28 = 448).
  const CHART_WIDTH = 460;
  const CENTER_OFFSET_X = 10;

  return (
    <motion.div
      className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 w-full overflow-x-auto"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      <h3 className="text-lg font-bold mb-4 text-center text-sm sm:text-base">
        Mapa Dental (64 Dientes) - Toca/clic para marcar
      </h3>

      <div
        className="w-full mx-auto"
        style={{ minWidth: CHART_WIDTH + 200 + "px" }} // Aumentamos el ancho mínimo
      >
        <svg
          width="100%"
          height="220" // Aumentamos la altura para acomodar las dos filas
          viewBox={`0 0 ${CHART_WIDTH + 200} 220`}
          className="block mx-auto"
        >
          {/* Arco superior permanente (Fila 1) */}
          <g transform={`translate(${CENTER_OFFSET_X}, 34)`}>
            {/* <path
              d={`M 10 0 Q ${CHART_WIDTH / 2} -20 ${CHART_WIDTH - 20} 0`}
              stroke="#e5e7eb"
              fill="none"
              strokeWidth="2"
              className="pointer-events-none"
            /> */}
            {upperPermanent.map((num, i) => (
              <Tooth
                key={`upper-perm-${num}`}
                number={num}
                index={i}
                isUpper={true}
                isAdditional={false}
              />
            ))}
          </g>

          {/* Arco superior adicional (Fila 2 - ABAJO) */}
          <g transform={`translate(${CENTER_OFFSET_X}, 46)`}>
            {upperAdditional.map((num, i) => (
              <Tooth
                key={`upper-add-${num}`}
                number={num}
                index={i}
                isUpper={true}
                isAdditional={true}
              />
            ))}
          </g>

          {/* Arco inferior permanente (Fila 3) */}
          <g transform={`translate(${CENTER_OFFSET_X}, 140)`}>
            {" "}
            {/* Ajuste Y para espacio */}
            {/* <path
              d={`M 10 0 Q ${CHART_WIDTH / 2} 20 ${CHART_WIDTH - 20} 0`}
              stroke="#e5e7eb"
              fill="none"
              strokeWidth="2"
              className="pointer-events-none"
            /> */}
            {lowerPermanent.map((num, i) => (
              <Tooth
                key={`lower-perm-${num}`}
                number={num}
                index={i}
                isUpper={false}
                isAdditional={false}
              />
            ))}
          </g>

          {/* Arco inferior adicional (Fila 4 - ARRIBA) */}
          <g transform={`translate(${CENTER_OFFSET_X}, 130)`}>
            {lowerAdditional.map((num, i) => (
              <Tooth
                key={`lower-add-${num}`}
                number={num}
                index={i}
                isUpper={false}
                isAdditional={true}
              />
            ))}
          </g>
        </svg>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center">
        Puntos: Distal-Oclusal, Mesial-Oclusal, Distal-Gingival,
        Mesial-Gingival, Oclusal Central.
      </p>
    </motion.div>
  );
};

export default DentalChart;
