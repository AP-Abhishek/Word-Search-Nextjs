"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface Position {
  r: number;
  c: number;
}

interface FoundPath {
  word: string;
  start: Position;
  end: Position;
  color: string;
}

interface WordsContextType {
  gridSize: number;
  words: string[];
  foundWords: string[];
  foundPaths: FoundPath[];
  addFoundWords: (word: string, start: Position, end: Position) => void;
}

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export function WordsProvider({
  children,
  initialWords,
  initialGridSize
}: {
  children: ReactNode,
  initialWords: string[],
  initialGridSize: number
}) {
  const [foundPaths, setFoundPaths] = useState<FoundPath[]>([]);

  const addFoundWords = (word: string, start: Position, end: Position) => {
    const isAlreadyFound = foundPaths.some(p => p.word === word);

    if (!isAlreadyFound) {
      const hue = Math.floor(Math.random() * 360);
      const color = `hsla(${hue}, 80%, 80%, 0.7)`;

      setFoundPaths((prev) => [...prev, { word, start, end, color }]);
    }
  };

  const foundWords = foundPaths.map(p => p.word);

  return (
    <WordsContext.Provider value={{
      gridSize: initialGridSize,
      words: initialWords,
      foundWords: foundWords,
      foundPaths: foundPaths,
      addFoundWords: addFoundWords
    }}>
      {children}
    </WordsContext.Provider>
  );
}

export const useWords = () => {
  const context = useContext(WordsContext);
  if (!context) throw new Error("useWords must be used within WordsProvider");
  return context;
}