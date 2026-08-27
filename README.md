# Word Search (Next.js)

A browser-based word search game where players find hidden words in a letter matrix. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Live Demo

You can play the game directly in your browser here:
[Play Word Search](https://word-search-by-tuttu.vercel.app/)

## Features

* **Multiple Difficulties:** Choose from different difficulty levels for a puzzle that matches your skill.
* **Custom Games:** Create your own word search puzzles by adding a personal list of words.
* **Interactive Board:** Select hidden words directly on the responsive letter matrix.
* **Word Tracking:** Keep track of the words you have found as you solve the puzzle.
* **Responsive UI:** Play comfortably on desktop and mobile screens.

## Tech Stack

* **Framework:** Next.js 16
* **Language:** TypeScript
* **Styling:** Tailwind CSS 4
* **Icons:** lucide-react
* **Animation:** Framer Motion

## How to Run Locally

1. Clone this repository:

    ```bash
    git clone https://github.com/AP-Abhishek/Word-Search-Nextjs.git
    ```

2. Move into the project directory:

    ```bash
    cd Word-Search-Nextjs
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
word-search
├─ app
│  ├─ algorithm
│  │  └─ GameCreationAlgorithm.ts
│  ├─ components
│  │  ├─ ConditionalHeader.tsx
│  │  ├─ Header.tsx
│  │  └─ HomeMenu.tsx
│  ├─ custom-game
│  │  ├─ page.tsx
│  │  └─ [difficulty]
│  │     ├─ components
│  │     │  └─ AddNewWords.tsx
│  │     └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ play-game
│     ├─ page.tsx
│     └─ [difficulty]
│        ├─ components
│        │  ├─ GameBoard.tsx
│        │  ├─ GenerateWords.ts
│        │  ├─ WordsContainer.tsx
│        │  └─ WordsContext.tsx
│        └─ page.tsx
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json
```
