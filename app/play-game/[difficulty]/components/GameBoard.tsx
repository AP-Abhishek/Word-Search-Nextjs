"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import GameCreationAlgorithm from "@/app/algorithm/GameCreationAlgorithm";

interface GameBoardProps {
  gridSize: number;
  words: string[];
}

export default function GameBoard({ gridSize, words }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardData, setBoardData] = useState<string[][]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const data = GameCreationAlgorithm({ gridSize, words });
      setBoardData(data);
    }
  }, [gridSize, words]);

  const drawBoard = useCallback(async () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || boardData.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    await document.fonts.load("900 16px Inter");

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    const isMobile = window.innerWidth < 768;
    const padding = isMobile ? -8 : 48;
    const size = Math.min(rect.width, rect.height) - padding;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cellSize = size / gridSize;
    const fontSize = cellSize * 0.5;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, 8);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;

    boardData.forEach((row, rowIndex) => {
      row.forEach((char, colIndex) => {
        const x = colIndex * cellSize + cellSize / 2;
        const y = rowIndex * cellSize + cellSize / 2;
        ctx.fillStyle = "#0f172a";
        ctx.fillText(char, x, y);
      });
    });

    ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridSize; i++) {
      const pos = i * cellSize;
      ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(size, pos); ctx.stroke();
    }
  }, [boardData, gridSize]);

  useEffect(() => {
    if (!mounted || boardData.length === 0) return;
    
    drawBoard();

    const resizeObserver = new ResizeObserver(() => {
      drawBoard();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [mounted, boardData, drawBoard]);

  if (!mounted) return <div className="h-full w-full bg-slate-100 animate-pulse" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={containerRef}
      className="w-full h-full min-h-[50vh] flex items-center justify-center p-0 sm:p-1 md:p-4"
    >
      <div className="p-2 md:p-2 flex items-center justify-center h-full max-w-full bg-white/70 rounded-md shadow-md shadow-black/15">
        <canvas
          ref={canvasRef}
          className="cursor-crosshair touch-none rounded-md max-w-full max-h-full"
        />
      </div>
    </motion.div>
  );
}
