# Word Search

### A game in which users have to find words, which are hidden within a word matrix.

Challenge your vocabulary and sharpen your focus with a modern, interactive puzzle experience. Whether you're playing a classic grid or building your own custom challenges, this app offers seamless gameplay with a clean, responsive interface.

***Visit website: [Word Search](https://word-search-by-tuttu.vercel.app/)***

### Tech Stack
- **Framework:** Next.js (v16)
- **Styling:** TailwindCSS (v4)
- **Icons:** lucide-react
- **Animation:** framer-motion

### Folder Structure
```
- app
    - algorithm
        - GameCreationAlgorithm.ts
    - components
        - Header.tsx
        - ConditionalHeader.tsx
        - HomeMenu.tsx
    - custom-game
        - [difficulty]
            - components
                - AddNewWords.tsx
            -page.tsx
        - page.tsx
    - play-game
        - [difficulty]
            - components
                - GameBoard.tsx
                - WordContainer.tsx
                - GenerateWords.ts
                - WordsContext.tsx
            - page.tsx
        - page.tsx
    - favicon.ico
    - global.css
    - layoout.tsx
    - page.tsx
- [ Other Configurations ]
```