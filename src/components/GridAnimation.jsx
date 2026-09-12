import { useEffect, useRef } from "react";
import p5 from "p5";

export default function GridAnimation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      const CELL_SIZE = 40;
      const COLOR_R = 32;
      const COLOR_G = 178;
      const COLOR_B = 166;

      const STARTING_ALPHA = 100;
      const PROB_OF_NEIGHBOR = 0.2;
      const AMT_FADE_PER_FRAME = 5;
      const STROKE_WEIGHT = 1;

      let colorWithAlpha;
      let numRows;
      let numCols;
      let currentRow = -1;
      let currentCol = -1;
      let allNeighbors = [];

      p.setup = () => {
        const cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.parent(containerRef.current);

        cnv.style("position", "fixed");
        cnv.style("inset", "0");
        cnv.style("z-index", "1");
        cnv.style("pointer-events", "none");

        colorWithAlpha = p.color(COLOR_R, COLOR_G, COLOR_B);
        p.noFill();
        p.stroke(colorWithAlpha);
        p.strokeWeight(STROKE_WEIGHT);

        numRows = Math.ceil(p.windowHeight / CELL_SIZE);
        numCols = Math.ceil(p.windowWidth / CELL_SIZE);
      };

      p.draw = () => {
        p.clear();

        const row = p.floor(p.mouseY / CELL_SIZE);
        const col = p.floor(p.mouseX / CELL_SIZE);

        const centerX = p.width / 2;

        // size of safe zone (adjust this)
        const safeWidth = p.width * 0.4;


        // Only restrict width (vertical safe zone)
        const isInCenterZone =
          p.mouseX > centerX - safeWidth / 2 &&
          p.mouseX < centerX + safeWidth / 2;

        if (!isInCenterZone && (row !== currentRow || col !== currentCol)) {
          currentRow = row;
          currentCol = col;

          allNeighbors.push({
            row: row,
            col: col,
            opacity: STARTING_ALPHA,
          });

          allNeighbors.push(...getRandomNeighbors(row, col));
        }
        for (const neighbor of allNeighbors) {
          const neighborX = neighbor.col * CELL_SIZE;
          const neighborY = neighbor.row * CELL_SIZE;

          neighbor.opacity = p.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
          p.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
          p.rect(neighborX, neighborY, CELL_SIZE, CELL_SIZE);
        }

        allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
      };

      function getRandomNeighbors(row, col) {
        const neighbors = [];

        for (let dRow = -1; dRow <= 1; dRow++) {
          for (let dCol = -1; dCol <= 1; dCol++) {
            const neighborRow = row + dRow;
            const neighborCol = col + dCol;

            const isCurrentCell = dRow === 0 && dCol === 0;
            const isInBounds =
              neighborRow >= 0 &&
              neighborRow < numRows &&
              neighborCol >= 0 &&
              neighborCol < numCols;

            if (
              !isCurrentCell &&
              isInBounds &&
              Math.random() < PROB_OF_NEIGHBOR
            ) {
              neighbors.push({
                row: neighborRow,
                col: neighborCol,
                opacity: STARTING_ALPHA,
              });
            }
          }
        }

        return neighbors;
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        numRows = Math.ceil(p.windowHeight / CELL_SIZE);
        numCols = Math.ceil(p.windowWidth / CELL_SIZE);
      };
    };

    const instance = new p5(sketch);

    return () => {
      instance.remove();
    };
  }, []);

  return <div ref={containerRef} />;
}