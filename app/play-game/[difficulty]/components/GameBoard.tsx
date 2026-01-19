"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import GameCreationAlgorithm from "@/app/algorithm/GameCreationAlgorithm";
import { useWords } from "./WordsContext";

export default function GameBoard() {

  const { gridSize, words, foundPaths, addFoundWords } = useWords();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardData, setBoardData] = useState<string[][]>([]);
  const [mounted, setMounted] = useState(false);

  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState<{ r: number; c: number } | null>(null);
  const [endPos, setEndPos] = useState<{ r: number; c: number } | null>(null);

  const getGridCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const cellSize = rect.width / gridSize;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

    if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
      return { r, c };
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const coords = getGridCoords(e);
    if (coords) {
      setIsSelecting(true);
      setStartPos(coords);
      setEndPos(coords);
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting || !startPos) return;

    const coords = getGridCoords(e);
    if (!coords) return;

    const rowDiff = coords.r - startPos.r;
    const colDiff = coords.c - startPos.c;

    const absRowDiff = Math.abs(rowDiff);
    const absColDiff = Math.abs(colDiff);

    let snappedEnd = { r: startPos.r, c: startPos.c };

    if (rowDiff === 0 || colDiff === 0 || absRowDiff === absColDiff) {
      snappedEnd = coords;
    } else {
      if (absRowDiff > absColDiff) {
        snappedEnd = { r: coords.r, c: startPos.c };
      } else {
        snappedEnd = { r: startPos.r, c: coords.c };
      }
    }

    setEndPos(snappedEnd);
  };

  const handleMouseUp = useCallback(() => {
    if (isSelecting && startPos && endPos) {
      const selectedWord = getSelectedWord(startPos, endPos);
      const reversedWord = selectedWord.split("").reverse().join("");
      
      const selectedWordLower = selectedWord.toLowerCase();
      const reversedWordLower = reversedWord.toLowerCase();

      if (words.includes(selectedWordLower)) {
        console.log("Found word:", selectedWordLower)
        addFoundWords(selectedWordLower, startPos, endPos);
      } else if (words.includes(reversedWordLower)) {
        console.log("Found word (reversed):", reversedWordLower)
        addFoundWords(reversedWordLower, startPos, endPos);
      }
    }

    setIsSelecting(false);
    setStartPos(null);
    setEndPos(null);
  }, [isSelecting, startPos, endPos, words, boardData]);

  const getSelectedWord = (start: { r: number, c: number }, end: { r: number, c: number }) => {
    let word = "";
    const dr = end.r - start.r;
    const dc = end.c - start.c;

    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);
    const steps = Math.max(Math.abs(dr), Math.abs(dc));

    for (let i = 0; i <= steps; i++) {
      const r = start.r + i * stepR;
      const c = start.c + i * stepC;
      word += boardData[r][c];
    }
    return word;
  };

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

    ctx.clearRect(0, 0, size, size);

    const cellSize = size / gridSize;
    const fontSize = cellSize * 0.5;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, 8);
    ctx.fill();

    foundPaths.forEach((path) => {
      ctx.beginPath();
      ctx.lineWidth = cellSize * 0.7;
      ctx.lineCap = "round";
      ctx.strokeStyle = path.color;
      ctx.moveTo(path.start.c * cellSize + cellSize / 2, path.start.r * cellSize + cellSize / 2);
      ctx.lineTo(path.end.c * cellSize + cellSize / 2, path.end.r * cellSize + cellSize / 2);
      ctx.stroke();
    });

    if (isSelecting && startPos && endPos) {
      ctx.beginPath();
      ctx.lineWidth = cellSize * 0.7;
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.moveTo(startPos.c * cellSize + cellSize / 2, startPos.r * cellSize + cellSize / 2);
      ctx.lineTo(endPos.c * cellSize + cellSize / 2, endPos.r * cellSize + cellSize / 2);
      ctx.stroke();
    }


    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
    ctx.fillStyle = "#0f172a";

    boardData.forEach((row, rowIndex) => {
      row.forEach((char, colIndex) => {
        const x = colIndex * cellSize + cellSize / 2;
        const y = rowIndex * cellSize + cellSize / 2;
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
  }, [boardData, gridSize, isSelecting, startPos, endPos, foundPaths]);

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
  }, [mounted, boardData, drawBoard, foundPaths]);

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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="cursor-pointer touch-none rounded-md max-w-full max-h-full"
        />

      </div>
    </motion.div>
  );
}
